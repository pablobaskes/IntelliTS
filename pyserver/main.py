from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from Qdrant_IntelliTs import get_recommendations, insert_movie_into_qdrant

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nlp = pipeline('sentiment-analysis')

class Item(BaseModel):
    text: str
class RecommendationInput(BaseModel):
    favorite_movie_ids: List[int]

@app.post("/analyze_sentiment")
async def analyze_sentiment(item: Item):
    text = item.text
    if not text:
        return JSONResponse(content={'error': 'No text provided'}, status_code=400)
    
    result = nlp(text)[0]
    label = result['label']
    score = result['score']

    if label == "POSITIVE" and score >= 0.999:
        rating = 5
    elif label == "NEGATIVE" and score >= 0.999:
        rating = 1
    elif label == "POSITIVE" and 0.9 <= score < 0.999:
        rating = 4
    elif label == "NEGATIVE" and score >= 0.9:
        rating = 2
    else:
        rating = 3

    return {"rating": rating, "label": label, "score": score}



@app.post("/get_recommendations")
async def generate_recommendations(data: RecommendationInput):
    for movie_id in data.favorite_movie_ids:
        insert_movie_into_qdrant(movie_id)

    recommendations = get_recommendations(data.favorite_movie_ids)

    output = [rec.payload for rec in recommendations]

    return output

