import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function ReminderCardSkeleton({
    className,
    style
}: {
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-xl border border-border bg-card p-5",
                className
            )}
            style={style}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full max-w-md" />
                    <div className="flex items-center gap-4 pt-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-36" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
        </div>
    );
}

export function ReminderListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <ReminderCardSkeleton
                    key={i}
                    className="animate-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                />
            ))}
        </div>
    );
}
