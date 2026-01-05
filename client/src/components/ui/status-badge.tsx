import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReminderStatus } from "@/types/reminder";

const statusBadgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
    {
        variants: {
            status: {
                scheduled: "bg-status-scheduled-bg text-status-scheduled",
                completed: "bg-status-completed-bg text-status-completed",
                failed: "bg-status-failed-bg text-status-failed",
            },
        },
        defaultVariants: {
            status: "scheduled",
        },
    }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
    status: ReminderStatus;
    className?: string;
    showIcon?: boolean;
}

const statusIcons = {
    scheduled: Clock,
    completed: CheckCircle2,
    failed: XCircle,
};

const statusLabels = {
    scheduled: "Scheduled",
    completed: "Completed",
    failed: "Failed",
};

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
    const Icon = statusIcons[status];

    return (
        <span className={cn(statusBadgeVariants({ status }), className)}>
            {showIcon && <Icon className="h-3 w-3" />}
            {statusLabels[status]}
        </span>
    );
}
