
export function convertToUTC(date: Date, time: string, timezone: string): Date {
    const [hours, minutes] = time.split(":").map(Number);

    // Create date-time string
    const dateTimeString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

    // Create a formatter for the selected timezone
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    // Convert to parts
    const parts = formatter.formatToParts(new Date(dateTimeString));
    const map: Record<string, string> = {};
    parts.forEach(p => {
        if (p.type !== "literal") map[p.type] = p.value;
    });

    // Build UTC date
    return new Date(
        Date.UTC(
            Number(map.year),
            Number(map.month) - 1,
            Number(map.day),
            Number(map.hour),
            Number(map.minute),
            Number(map.second)
        )
    );
}

// Common timezones
export const TIMEZONES = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Phoenix", label: "Arizona (AZ)" },
    { value: "America/Anchorage", label: "Alaska (AK)" },
    { value: "Pacific/Honolulu", label: "Hawaii (HI)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Paris", label: "Paris (CET)" },
    { value: "Europe/Berlin", label: "Berlin (CET)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Asia/Shanghai", label: "Shanghai (CST)" },
    { value: "Asia/Dubai", label: "Dubai (GST)" },
    { value: "Australia/Sydney", label: "Sydney (AEST)" },
    { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
];

export const today = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};
