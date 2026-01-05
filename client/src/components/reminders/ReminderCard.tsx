import { format } from "date-fns";
import { Calendar, Edit2, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { cn } from "@/lib/utils";
import { Reminder } from "@/types/reminder";

interface ReminderCardProps {
    reminder: Reminder;
    onEdit?: (reminder: Reminder) => void;
    onDelete?: (reminder: Reminder) => void;
    className?: string;
}

function maskPhoneNumber(phone: string): string {
    if (phone.length <= 4) return phone;
    const visibleEnd = phone.slice(-4);
    const masked = phone.slice(0, -4).replace(/\d/g, "•");
    return masked + visibleEnd;
}

export function ReminderCard({ reminder, onEdit, onDelete, className }: ReminderCardProps) {
    const isUpcoming = reminder.status === "scheduled" && new Date(reminder.scheduledAt) > new Date();

    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300",
                "hover:border-primary/20 hover:shadow-lg",
                reminder.status === "completed" && "opacity-75",
                reminder.status === "failed" && "border-destructive/20",
                className
            )}
        >
            {/* Gradient accent line */}
            <div
                className={cn(
                    "absolute left-0 top-0 h-full w-1 transition-all duration-300",
                    reminder.status === "scheduled" && "bg-status-scheduled",
                    reminder.status === "completed" && "bg-status-completed",
                    reminder.status === "failed" && "bg-status-failed"
                )}
            />

            <div className="flex items-start justify-between gap-4 pl-4">
                <div className="flex-1 min-w-0">
                    {/* Header: Status + Countdown */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <StatusBadge status={reminder.status} />
                        {isUpcoming && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="text-xs">in</span>
                                <CountdownTimer
                                    targetDate={new Date(reminder.scheduledAt)}
                                    className="text-primary font-medium"
                                />
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
                        {reminder.title}
                    </h3>

                    {/* Message preview */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        &quot;{reminder.message}&quot;
                    </p>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Phone className="h-4 w-4" />
                            <span className="font-mono">{maskPhoneNumber(reminder.phoneNumber)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(reminder.scheduledAt), "MMM d, yyyy 'at' h:mm a")}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {onEdit && reminder.status === "scheduled" && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(reminder)}
                            className="h-9 w-9 text-muted-foreground hover:text-foreground"
                        >
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Edit reminder</span>
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(reminder)}
                            className="h-9 w-9 text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete reminder</span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
