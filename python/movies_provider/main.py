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


@app.get("/movies/{movie_id}")
async def movie(movie_id: int):
    response = requests.get(f"{DURATION_PROVIDER_ENDPOINT}/{movie_id}")
    r_json = response.json()

    duration_min = r_json['duration_min']

    JSON_RESULT['duration_min'] = duration_min

    return JSON_RESULT
