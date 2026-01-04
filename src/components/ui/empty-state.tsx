import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: React.ReactNode;
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-up",
                className
            )}
        >
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse-ring" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
                </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
            {action}
        </div>
    );
}
