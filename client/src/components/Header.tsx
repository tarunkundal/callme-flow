"use client";

import { Button } from "@/components/ui/button";
import { BellRing, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
    onCreateNew?: () => void;
}

export function Header({ onCreateNew }: HeaderProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        document.documentElement.classList.toggle("dark", newIsDark);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl mb-4">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <BellRing className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight">Call Me</h1>
                        <p className="hidden text-xs text-muted-foreground sm:block">
                            Voice Reminders
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full"
                    >
                        {isDark ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {onCreateNew && (
                        <Button onClick={onCreateNew} className="rounded-full shadow-md">
                            <span className="hidden sm:inline">New Reminder</span>
                            <span className="sm:hidden">New</span>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
