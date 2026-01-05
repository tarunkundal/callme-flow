import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";


export const metadata: Metadata = {
  title: "Call Me",
  description: "An app to make phone calls directly from your browser.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      >
        <ReactQueryProvider>
          <TooltipProvider>
            <Toaster />
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html >
  );
}
