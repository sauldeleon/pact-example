from typing import Dict, Any
import random
from pydantic import BaseModel
import uvicorn

from fastapi import FastAPI
from fastapi.responses import JSONResponse

PORT = 9000
HOST = "127.0.0.1"
HEADERS = {"Content-Type": "application/json"}

class Duration(BaseModel):
    duration_min: int

app = FastAPI()

@app.get("/duration/{media_id}")
async def duration(media_id: int):
    return {"id": media_id, "duration_min": 192}

@app.post("/duration")
async def create_duration(duration: Duration):
    content = dict(duration)
    content['id'] = random.randint(1, 100)
    return JSONResponse(content=content, status_code=201)


@app.post('/_pact/provider_states')
def provider_states(item: Dict[Any, Any] = None):
    return {'result': item['state']}


if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
