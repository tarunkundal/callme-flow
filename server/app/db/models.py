from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.db.database import Base
from datetime import datetime

class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)

    # Stored in UTC
    scheduled_at = Column(DateTime, nullable=False)
    timezone = Column(String, nullable=True)

    # scheduled | completed | failed
    status = Column(String, nullable=False, default="scheduled")

    # Optional but OK to keep
    is_called = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
