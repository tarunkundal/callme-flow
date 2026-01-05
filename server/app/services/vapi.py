import os
import requests

VAPI_API_KEY = os.getenv("VAPI_API_KEY")
VAPI_ASSISTANT_ID = os.getenv("VAPI_ASSISTANT_ID")
VAPI_PHONE_NUMBER_ID = os.getenv("VAPI_PHONE_NUMBER_ID")

VAPI_CALL_URL = "https://api.vapi.ai/call"

def trigger_call(to_phone_number: str, message: str):
    if not all([VAPI_API_KEY, VAPI_ASSISTANT_ID, VAPI_PHONE_NUMBER_ID]):
        raise Exception("Missing Vapi env vars")

    payload = {
        "assistantId": VAPI_ASSISTANT_ID,
        "phoneNumberId": VAPI_PHONE_NUMBER_ID,
        "customer": {
            "number": to_phone_number
        },
        "assistantOverrides": {
            "firstMessage": message
        }
    }

    print("📞 Triggering Vapi call")
    print("📦 Payload:", payload)

    res = requests.post(
        VAPI_CALL_URL,
        headers={
            "Authorization": f"Bearer {VAPI_API_KEY}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=15,
    )

    print("📡 Status:", res.status_code)
    print("📡 Response:", res.text)

    if not res.ok:
        raise Exception(res.text)
