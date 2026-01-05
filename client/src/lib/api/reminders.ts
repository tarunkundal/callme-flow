import type { Reminder, CreateReminderInput } from "@/types/reminder";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchReminders(): Promise<Reminder[]> {
    const res = await fetch(`${API_URL}/api/reminders`);
    if (!res.ok) throw new Error("Failed to fetch reminders");
    return res.json();
}

export async function createReminder(data: CreateReminderInput) {
    const res = await fetch(`${API_URL}/api/reminders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create reminder");
    return res.json();
}

export async function deleteReminder(id: string) {
    const res = await fetch(`${API_URL}/api/reminders/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete reminder");
}
export async function updateReminder(id: string, data: CreateReminderInput) {
    const res = await fetch(`${API_URL}/api/reminders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update reminder");
    return res.json();
}