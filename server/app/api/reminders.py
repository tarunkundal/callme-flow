from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db import crud
from app.schemas.reminder import ReminderCreate, ReminderOut
from typing import Optional

router = APIRouter(prefix="/reminders", tags=["Reminders"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def to_out(reminder):
    return ReminderOut(
        id=str(reminder.id),
        title=reminder.title,
        message=reminder.message,
        phoneNumber=reminder.phone_number,
        scheduledAt=reminder.scheduled_at,
        timezone=reminder.timezone,
        status=reminder.status,
        createdAt=reminder.created_at,
        updatedAt=reminder.updated_at,
    )


@router.get("", response_model=list[ReminderOut])
def list_reminders(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    reminders = crud.get_all_reminders(db, status)
    return [to_out(r) for r in reminders]


@router.post("", response_model=ReminderOut)
def create_reminder(data: ReminderCreate, db: Session = Depends(get_db)):
    reminder = crud.create_reminder(db, data)
    return to_out(reminder)


@router.put("/{id}", response_model=ReminderOut)
def update_reminder(id: int, data: ReminderCreate, db: Session = Depends(get_db)):
    reminder = crud.update_reminder(db, id, data)
    if not reminder:
        raise HTTPException(status_code=404, detail="Reminder not found")
    return to_out(reminder)


@router.delete("/{id}")
def delete_reminder(id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_reminder(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Reminder not found")
    return {"success": True}
