import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReminderStatus } from "@/types/reminder";

type FilterOption = "all" | ReminderStatus;

interface FilterConfig {
    value: FilterOption;
    label: string;
    count?: number;
}

interface ReminderFiltersProps {
    activeFilter: FilterOption;
    onFilterChange: (filter: FilterOption) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    counts: {
        all: number;
        scheduled: number;
        completed: number;
        failed: number;
    };
    className?: string;
}

export function ReminderFilters({
    activeFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
    counts,
    className,
}: ReminderFiltersProps) {
    const filters: FilterConfig[] = [
        { value: "all", label: "All", count: counts.all },
        { value: "scheduled", label: "Scheduled", count: counts.scheduled },
        { value: "completed", label: "Completed", count: counts.completed },
        { value: "failed", label: "Failed", count: counts.failed },
    ];

    return (
        <div className={cn("space-y-4", className)}>
            {/* Search bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search reminders..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 bg-card border-border"
                />
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                    <Button
                        key={filter.value}
                        variant={activeFilter === filter.value ? "default" : "ghost"}
                        size="sm"
                        onClick={() => onFilterChange(filter.value)}
                        className={cn(
                            "rounded-full transition-all duration-200",
                            activeFilter === filter.value
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                    >
                        {filter.label}
                        {filter.count !== undefined && filter.count > 0 && (
                            <span
                                className={cn(
                                    "ml-1.5 rounded-full px-1.5 py-0.5 text-xs font-medium",
                                    activeFilter === filter.value
                                        ? "bg-primary-foreground/20 text-primary-foreground"
                                        : "bg-muted-foreground/10 text-muted-foreground"
                                )}
                            >
                                {filter.count}
                            </span>
                        )}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export type { FilterOption };
