import type { Reminder } from "@/types/reminder";

// Mock data for UI demonstration
export const mockReminders: Reminder[] = [
    {
        id: "1",
        title: "Doctor's Appointment",
        message: "Hi! This is a reminder about your doctor's appointment today at 3 PM. Please remember to bring your insurance card and arrive 15 minutes early.",
        phoneNumber: "+14155552671",
        scheduledAt: new Date(Date.now() + 1000 * 60 * 45), // 45 minutes from now
        timezone: "America/New_York",
        status: "scheduled",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
        id: "2",
        title: "Team Meeting",
        message: "Don't forget about the team standup meeting in 30 minutes. Please prepare your status updates and any blockers you're facing.",
        phoneNumber: "+14155553842",
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
        timezone: "America/Los_Angeles",
        status: "scheduled",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
        id: "3",
        title: "Mom's Birthday Call",
        message: "Happy Birthday Mom! Wishing you an amazing day filled with joy and happiness. I love you so much!",
        phoneNumber: "+14155559012",
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
        timezone: "America/Chicago",
        status: "scheduled",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    },
    {
        id: "4",
        title: "Prescription Pickup",
        message: "Your prescription is ready for pickup at Walgreens on Main Street. The pharmacy closes at 9 PM.",
        phoneNumber: "+14155554567",
        scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        timezone: "America/New_York",
        status: "completed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
        id: "5",
        title: "Flight Check-in",
        message: "Your flight UA123 departs in 24 hours. Please complete online check-in and download your boarding pass.",
        phoneNumber: "+14155558901",
        scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        timezone: "America/Denver",
        status: "completed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
        id: "6",
        title: "Client Follow-up",
        message: "Following up on our meeting last week. Let me know if you have any questions about the proposal.",
        phoneNumber: "+14155551234",
        scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
        timezone: "America/New_York",
        status: "failed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
];

// Simulate API delay
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
