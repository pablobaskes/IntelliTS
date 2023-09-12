from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
#from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()
#openai.api_key = os.getenv('OPENAI_API_KEY')

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
