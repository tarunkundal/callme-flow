from datetime import datetime
from sqlalchemy.orm import Session
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.db.database import SessionLocal
from app.db.models import Reminder
from app.services.vapi import trigger_call

scheduler = AsyncIOScheduler(timezone="UTC")


def check_and_call():
    print("⏱ Scheduler tick fired")

    db: Session = SessionLocal()
    now = datetime.utcnow()

    reminders = db.query(Reminder).filter(
        Reminder.status == "scheduled",
        Reminder.scheduled_at <= now,
        Reminder.is_called == False
    ).all()

    print(f"📦 Found {len(reminders)} due reminders")

    for reminder in reminders:
        try:
            print(f"📞 Calling reminder {reminder.id}")

            trigger_call(
                reminder.phone_number,
                reminder.message
            )

            reminder.status = "completed"
            reminder.is_called = True

        except Exception as e:
            print("❌ Call failed:", e)
            reminder.status = "failed"

    db.commit()
    db.close()


def start_scheduler():
    if not scheduler.running:
        scheduler.add_job(
            check_and_call,
            trigger="interval",
            seconds=30,
            id="reminder-job",
            replace_existing=True,
        )
        scheduler.start()
        print("✅ Scheduler started")
