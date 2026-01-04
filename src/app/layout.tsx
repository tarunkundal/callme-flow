import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { ThemeProvider } from "./providers/ThemeProvider";


export const metadata: Metadata = {
  title: "Call Me",
  description: "An app to make phone calls directly from your browser.",
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
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
