import os
import requests
import datetime
from qdrant_client import QdrantClient
from qdrant_client.http import models
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()
TMDB_TOKEN = os.getenv("TMDB_TOKEN")
model = SentenceTransformer('all-mpnet-base-v2')
client = QdrantClient("http://qdrant:6333")

MOVIES_COLLECTION = "IntelliTS_movies"


def create_qdrant_client():
    print('creating collection')
    client.recreate_collection(
    collection_name=MOVIES_COLLECTION,
    vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE),
)

def model_embedder(movie):
    print("creating embedding for: " + movie['title'])
    text = movie['title'] + " " + movie['overview'] + " " + movie['original_language'] + " " + str(movie['vote_average']) + " " + str(movie['vote_count'])
    embedding = model.encode(text) 
    return embedding.tolist()

def get_movie_by_id(movie_id):
    base_url = f"https://api.themoviedb.org/3/movie/{movie_id}?language=en-US"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {TMDB_TOKEN}"
    }
    
    response = requests.get(base_url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch movie with ID: {movie_id}. Status code: {response.status_code}")
        return None

def get_movies_by_ids():
    base_url = "https://api.themoviedb.org/3/movie/{id}?language=en-US"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {TMDB_TOKEN}"
    }

    movies = []

    for movie_id in range(1, 1000):
        url = base_url.format(id=movie_id)
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            movie = response.json()
            movies.append(movie)
        else:
            print(f"Failed to fetch movie with ID: {movie_id}. Status code: {response.status_code}")

    return movies

def insert_movie_into_qdrant(movie_id):
    movie = get_movie_by_id(movie_id)
    if movie:
        if client.retrieve(
            collection_name=MOVIES_COLLECTION,
            ids=[movie['id']],
            ): 
            print('alrdy exists into qdrant db')
        else:
            embedding = model_embedder(movie)
            client.upsert(
                collection_name=MOVIES_COLLECTION,
                points=models.Batch(
                    ids=[movie['id']],
                    vectors=[embedding],
                    payloads=[movie]
                )
            )

def insert_movies_into_qdrant():
    movies = get_movies_by_ids()
    for movie in movies:
        if client.retrieve(
            collection_name=MOVIES_COLLECTION,
            ids=[movie['id']],
            ):
            continue
        embedding = model_embedder(movie)
        client.upsert(
            collection_name=MOVIES_COLLECTION,
            points=models.Batch(
                ids=[movie['id']],
                vectors=[embedding],
                payloads=[movie] 
            )
        )

def get_recommendations(positive_ids, limit=8):
    recommendations = client.recommend(
        collection_name=MOVIES_COLLECTION,
        positive=positive_ids,
        limit=limit
    )
    return recommendations


if os.path.exists("/app/data/data_initialized.txt"):
    print("Data already initialized. Skipping.")
else:
    create_qdrant_client()
    insert_movies_into_qdrant()
    
    with open("/app/data/data_initialized.txt", "w") as file:
        file.write("Data initialized on " + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
