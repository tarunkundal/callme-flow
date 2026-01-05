from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.reminders import router as reminder_router
from app.db.database import Base, engine
from app.core.scheduler import start_scheduler
from dotenv import load_dotenv
import os

load_dotenv() 

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Call Me Reminder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reminder_router, prefix="/api")

@app.on_event("startup")
async def startup():
    start_scheduler()
