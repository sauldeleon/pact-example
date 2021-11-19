from fastapi import FastAPI
import requests

JSON_RESULT = {
    "name": "The Silence of the Lambs",
    "genre": "Terror",
    "director": "Jonathan Demme",
    "year": 1991,
}

DURATION_PROVIDER_ENDPOINT = 'http://localhost:9000/duration'

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
