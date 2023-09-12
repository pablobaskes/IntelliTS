import os
import requests
import openai
from qdrant_client import QdrantClient
from qdrant_client.http import models
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

model = SentenceTransformer('all-mpnet-base-v2')
client = QdrantClient("http://localhost:6333")
TMBD_TOKEN = os.getenv("TMBD_TOKEN")
movies_collection = "TMDB_Collection"

def model_embedder(movie):
    print("creating embedding for: " + movie['title'])
    text = movie['title'] + " " + movie['overview'] + " " + movie['original_language'] + " " + str(movie['vote_average']) + " " + str(movie['vote_count'])
    embedding = model.encode(text) 
    return embedding.tolist()


url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US"
headers = {
    "accept": "application/json",
    "Authorization": "Bearer {TMBD_TOKEN}"
}

response = requests.get(url, headers=headers)
movies = response.json()['results']

def create_embedding(movie):
    print("creating embedding for: " + movie['title'])
    text = movie['title'] + " " + movie['overview'] + " " + movie['original_language'] + " " + str(movie['vote_average']) + " " + str(movie['vote_count'])
    response = openai.Embedding.create(
        input=text,
        model = "text-embedding-ada-002"
    )
    embeddings = response['data'][0]['embedding']
    return embeddings


for movie in movies:
    embedding = create_embedding(movie)
    print("\n")
    client.upsert(
        collection_name=movies_collection,
        points=models.Batch(
            ids=[movie['id']],
            vectors=[embedding],
            payloads=[{
                "id": movie['id'],
                "title": movie['title'],
                "overview": movie['overview'],
                "poster_path": movie['poster_path']
            }]
        )
    )

recomendations = client.recommend(
    collection_name=movies_collection,
    positive=[502356, 976573],
    negative=[455476],
    limit=1
)

print('RECOMENDATIONS--------------------------\n')

for recomend in recomendations:
    print(f"Movie ID: {recomend.id}")
    print(f"Score: {recomend.score}")
    print(f"Title: {recomend.payload['title']}")
    print(f"Overview: {recomend.payload['overview']}")
    print("\n")
    