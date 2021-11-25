from typing import Dict, Any

from fastapi import FastAPI

app = FastAPI()


@app.get("/duration/{media_id}")
async def duration(media_id: int):
    return {"id": media_id, "duration_min": 192}


@app.post('/_pact/provider_states')
def provider_states(item: Dict[Any, Any] = None):
    return {'result': item['state']}
