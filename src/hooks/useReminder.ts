import { useState, useMemo, useCallback } from "react";
import { CreateReminderInput, Reminder } from "@/types/reminder";
import { FilterOption } from "@/components/reminders/ReminderFilters";
import { delay, mockReminders } from "@/data/mockReminders";

export function useReminders() {
    const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<FilterOption>("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Filtered and sorted reminders
    const filteredReminders = useMemo(() => {
        let result = [...reminders];

        // Apply status filter
        if (filter !== "all") {
            result = result.filter((r) => r.status === filter);
        }

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (r) =>
                    r.title.toLowerCase().includes(query) ||
                    r.message.toLowerCase().includes(query)
            );
        }

        // Sort by scheduled date (upcoming first)
        result.sort((a, b) => {
            // Scheduled items first, then by date
            if (a.status === "scheduled" && b.status !== "scheduled") return -1;
            if (a.status !== "scheduled" && b.status === "scheduled") return 1;
            return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
        });

        return result;
    }, [reminders, filter, searchQuery]);

    // Counts for filter badges
    const counts = useMemo(() => ({
        all: reminders.length,
        scheduled: reminders.filter((r) => r.status === "scheduled").length,
        completed: reminders.filter((r) => r.status === "completed").length,
        failed: reminders.filter((r) => r.status === "failed").length,
    }), [reminders]);

    // Create reminder
    const createReminder = useCallback(async (input: CreateReminderInput) => {
        setIsLoading(true);
        await delay(800); // Simulate API call

        const newReminder: Reminder = {
            id: crypto.randomUUID(),
            ...input,
            status: "scheduled",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setReminders((prev) => [...prev, newReminder]);
        setIsLoading(false);
        return newReminder;
    }, []);

    // Update reminder
    const updateReminder = useCallback(async (id: string, input: CreateReminderInput) => {
        setIsLoading(true);
        await delay(800);

        setReminders((prev) =>
            prev.map((r) =>
                r.id === id
                    ? { ...r, ...input, updatedAt: new Date() }
                    : r
            )
        );
        setIsLoading(false);
    }, []);

    // Delete reminder
    const deleteReminder = useCallback(async (id: string) => {
        setIsLoading(true);
        await delay(500);

        setReminders((prev) => prev.filter((r) => r.id !== id));
        setIsLoading(false);
    }, []);

    return {
        reminders: filteredReminders,
        allReminders: reminders,
        isLoading,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        counts,
        createReminder,
        updateReminder,
        deleteReminder,
    };
}
