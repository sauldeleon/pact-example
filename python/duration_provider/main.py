from fastapi import FastAPI

app = FastAPI()


@app.get("/duration/{media_id}")
async def duration(media_id: int):
    return {"id": media_id, "duration_min": 192}
