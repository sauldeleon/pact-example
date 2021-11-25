from typing import Dict, Any, Optional
from fastapi import FastAPI
from pydantic import BaseModel
import requests

JSON_RESULT = {
    "name": "The Silence of the Lambs",
    "genre": "Terror",
    "director": "Jonathan Demme",
    "year": 1991,
}

DURATION_PROVIDER_ENDPOINT = 'http://localhost:9000/duration'

class Movie(BaseModel):
    name: str
    genre: str
    director: str
    year: Optional[int] = None

app = FastAPI()

def get_duration(movie_id):
    response = requests.get(f"{DURATION_PROVIDER_ENDPOINT}/{movie_id}")
    return response.json()


@app.get("/movies/{movie_id}")
async def movie(movie_id: int):
    response = get_duration(movie_id)
    duration_min = response['duration_min']

    JSON_RESULT['duration_min'] = duration_min

    return JSON_RESULT

@app.post("/movies", status_code=201)
async def create_movie(movie: Movie):
    return movie

@app.post('/_pact/provider_states')
def provider_states(item: Dict[Any, Any] = None):
    return {'result': item['state']}
