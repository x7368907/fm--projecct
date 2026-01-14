from fastapi import FastAPI
from app.routers import commission

app = FastAPI()

app.include_router(commission.router)
@app.get("/")

def root():
    return {"message": "Hello, World!"}