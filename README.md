📞 Call Me Reminder

Next.js + FastAPI + SQLite + Vapi + Twilio

Call Me Reminder is a product-quality reminder application where users can schedule reminders and automatically receive a phone call when the reminder time is reached. The call speaks the reminder message using Vapi and Twilio.

This project was built as a take-home assignment with strong emphasis on frontend UI/UX polish, clean component architecture, and end-to-end integration.

✨ Features
Core Functionality

Create reminders with:

Title

Message (spoken during the call)

Phone number (E.164 format)

Date & time (local)

Dashboard showing upcoming reminders

Automatic outbound call when reminder time is reached

Reminder status tracking:

Scheduled

Completed

Failed

Frontend UX Highlights

Built with Next.js App Router + TypeScript

Clean, consistent design system (spacing, typography, components)

Inline form validation

Skeleton loaders and polished empty states

Status badges and countdown timers

Fully responsive layout

🧱 Tech Stack
Frontend

Next.js (App Router)

TypeScript

Tailwind CSS + shadcn/ui

React Query

Modular, reusable component architecture

Backend

FastAPI (Python)

SQLite (SQLAlchemy)

APScheduler for background jobs

Vapi for AI voice calls

Twilio as phone call provider

⚙️ Environment Variables

Create a .env file inside the server directory:

VAPI_API_KEY=your_vapi_api_key
VAPI_ASSISTANT_ID=your_vapi_assistant_id
VAPI_PHONE_NUMBER_ID=your_vapi_phone_number_id

DATABASE_URL=sqlite:///./reminders.db

The Vapi phone number must be connected to your Twilio account.

🚀 Running Locally
Backend (FastAPI)

Navigate to backend folder
cd server

Create and activate virtual environment
python -m venv venv
source venv/bin/activate

Install dependencies
pip install -r requirements.txt

Start the server
uvicorn app.main:app --reload

Backend runs at:
http://localhost:8000

Frontend (Next.js)

Navigate to frontend folder
cd client

Install dependencies
npm install

Start development server
npm run dev

Frontend runs at:
http://localhost:3000

🔁 How Scheduling Works

A background scheduler runs every 30 seconds using APScheduler

It checks reminders where:

status is scheduled

scheduled time is less than or equal to current UTC time

When a reminder is due:

A Vapi outbound call is triggered

The reminder message is spoken

Reminder status is updated to Completed or Failed

The scheduler starts automatically when the FastAPI application starts.

📞 How Calls Are Triggered

Outbound calls are created using Vapi

Vapi uses Twilio as the phone provider

The reminder message is passed using:

assistantOverrides.firstMessage

🧪 Quick Call Test (No Scheduler)

You can test the call flow instantly without waiting for a reminder:

Navigate to backend
cd server

Run test script
python -m app.test_call

This verifies:

Vapi credentials

Twilio configuration

End-to-end call flow

🧪 Suggested Reviewer Test Flow

Start backend and frontend

Create a reminder for 2–3 minutes in the future

Watch the countdown update on the dashboard

Receive a phone call

Hear the reminder message

Confirm reminder status updates correctly