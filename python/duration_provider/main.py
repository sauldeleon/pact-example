import uvicorn
from typing import Dict, Any

from fastapi import FastAPI

PORT = 9000

app = FastAPI()


@app.get("/duration/{media_id}")
async def duration(media_id: int):
    return {"id": media_id, "duration_min": 192}


@app.post('/_pact/provider_states')
def provider_states(item: Dict[Any, Any] = None):
    return {'result': item['state']}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)