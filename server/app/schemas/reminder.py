from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# ---------- INPUT ----------
class ReminderCreate(BaseModel):
    title: str
    message: str
    phoneNumber: str = Field(..., alias="phoneNumber")
    scheduledAt: datetime = Field(..., alias="scheduledAt")
    timezone: Optional[str] = None

    class Config:
        allow_population_by_field_name = True


# ---------- OUTPUT ----------
class ReminderOut(BaseModel):
    id: str
    title: str
    message: str
    phoneNumber: str
    scheduledAt: datetime
    timezone: Optional[str]
    status: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        orm_mode = True
