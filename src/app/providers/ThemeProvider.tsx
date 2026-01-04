'use client';

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';

/**
 * Client-side Theme Provider using next-themes
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"       // Apply theme as a CSS class (e.g., <html class="dark">)
            defaultTheme="dark"    // Default theme if none is set (or use "system")
            enableSystem           // Enable detection of OS theme preference
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}