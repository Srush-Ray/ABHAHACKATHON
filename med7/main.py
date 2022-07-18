from routers import inference
from routers import training
from fastapi import FastAPI
import uvicorn
import asyncio

app = FastAPI()
app.include_router(inference.router)
app.include_router(training.router)



@app.get("/", status_code=200)
def hello():
    return {"message": "Main app working"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info")
