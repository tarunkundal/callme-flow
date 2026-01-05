from sqlalchemy.orm import Session
from app.db.models import Reminder
from app.schemas.reminder import ReminderCreate
from datetime import datetime
from typing import Optional

def get_all_reminders(db: Session, status: Optional[str] = None):
    query = db.query(Reminder)
    if status:
        query = query.filter(Reminder.status == status)
    return query.order_by(Reminder.scheduled_at.asc()).all()


def create_reminder(db: Session, data: ReminderCreate):
    reminder = Reminder(
        title=data.title,
        message=data.message,
        phone_number=data.phoneNumber,
        scheduled_at=data.scheduledAt,
        timezone=data.timezone,
        status="scheduled",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(reminder)
    db.commit()
    db.refresh(reminder)
    return reminder


def update_reminder(db: Session, reminder_id: int, data: ReminderCreate):
    reminder = db.query(Reminder).filter(Reminder.id == reminder_id).first()
    if not reminder:
        return None

    reminder.title = data.title
    reminder.message = data.message
    reminder.phone_number = data.phoneNumber
    reminder.scheduled_at = data.scheduledAt
    reminder.timezone = data.timezone
    reminder.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(reminder)
    return reminder


def delete_reminder(db: Session, reminder_id: int):
    reminder = db.query(Reminder).filter(Reminder.id == reminder_id).first()
    if not reminder:
        return False

    db.delete(reminder)
    db.commit()
    return True
