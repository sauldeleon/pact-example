from typing import Dict, Any, Optional
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import requests
import random
import uvicorn

PORT = 9001
HOST = "127.0.0.1"
JSON_RESULT = {
    "id": 42,
    "name": "The Silence of the Lambs",
    "genre": "Terror",
    "director": "Jonathan Demme",
    "year": 1991,
    "duration_min": 192
}

DURATION_PROVIDER_ENDPOINT = 'http://localhost:9000/duration'
HEADERS = {"Content-Type": "application/json; charset=utf-8"}

class Movie(BaseModel):
    name: str
    genre: str
    director: str
    year: Optional[int] = None
    duration_min: Optional[int] = None
    # duration_min: int

app = FastAPI()

def get_duration(movie_id):
    response = requests.get(f"{DURATION_PROVIDER_ENDPOINT}/{movie_id}")
    return response.json()

def post_duration(duration_min):
    response = requests.post(f"{DURATION_PROVIDER_ENDPOINT}", json={'duration_min': duration_min})
    return response.json()

@app.get("/movies/{movie_id}")
async def movie(movie_id: int):
    response = get_duration(movie_id)
    duration_min = response.get('duration_min')

    JSON_RESULT['duration_min'] = duration_min

    return JSONResponse(content=JSON_RESULT, headers=HEADERS)

@app.post("/movies")
async def create_movie(movie: Movie):
    post_duration(movie.duration_min)
    content = dict(movie)
    content['id'] = random.randint(1, 100)
    return JSONResponse(content=content, headers=HEADERS, status_code=201)

@app.post('/_pact/provider_states')
def provider_states(item: Dict[Any, Any] = None):
    return {'result': item['state']}


if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)