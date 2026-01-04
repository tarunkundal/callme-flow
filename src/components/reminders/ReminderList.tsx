import { BellRing } from "lucide-react";
import { ReminderCard } from "./ReminderCard";
import { EmptyState } from "@/components/ui/empty-state";
import { ReminderListSkeleton } from "@/components/ui/loading-skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reminder } from "@/types/reminder";

interface ReminderListProps {
    reminders: Reminder[];
    isLoading?: boolean;
    onEdit?: (reminder: Reminder) => void;
    onDelete?: (reminder: Reminder) => void;
    onCreateNew?: () => void;
    emptyMessage?: string;
    className?: string;
}

export function ReminderList({
    reminders,
    isLoading,
    onEdit,
    onDelete,
    onCreateNew,
    emptyMessage = "No reminders found",
    className,
}: ReminderListProps) {
    if (isLoading) {
        return <ReminderListSkeleton count={3} />;
    }

    if (reminders.length === 0) {
        return (
            <EmptyState
                icon={BellRing}
                title="No reminders yet"
                description={emptyMessage}
                action={
                    onCreateNew ? (
                        <Button onClick={onCreateNew} className="rounded-full">
                            Create your first reminder
                        </Button>
                    ) : undefined
                }
            />
        );
    }

    return (
        <div className={cn("space-y-4", className)}>
            {reminders.map((reminder, index) => (
                <div
                    key={reminder.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <ReminderCard
                        reminder={reminder}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            ))}
        </div>
    );
}
