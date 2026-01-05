import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
    targetDate: Date;
    className?: string;
    onExpire?: () => void;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
    };
}

export function CountdownTimer({ targetDate, className, onExpire }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(targetDate);
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.isExpired && onExpire) {
                onExpire();
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onExpire]);

    if (timeLeft.isExpired) {
        return (
            <span className={cn("text-sm text-muted-foreground", className)}>
                Time&apos;s up!
            </span>
        );
    }

    const segments = [];

    if (timeLeft.days > 0) {
        segments.push({ value: timeLeft.days, label: "d" });
    }
    if (timeLeft.hours > 0 || timeLeft.days > 0) {
        segments.push({ value: timeLeft.hours, label: "h" });
    }
    segments.push({ value: timeLeft.minutes, label: "m" });
    segments.push({ value: timeLeft.seconds, label: "s" });

    return (
        <div className={cn("inline-flex items-center gap-1 font-mono text-sm", className)}>
            {segments.map((segment, index) => (
                <span key={segment.label} className="inline-flex items-center">
                    <span className="tabular-nums font-medium text-foreground">
                        {segment.value.toString().padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground text-xs ml-0.5">{segment.label}</span>
                    {index < segments.length - 1 && (
                        <span className="text-muted-foreground mx-1">:</span>
                    )}
                </span>
            ))}
        </div>
    );
}
