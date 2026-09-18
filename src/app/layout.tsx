import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { NavProvider } from "@/context/nav-context";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Student Command Center | Obsidian Orbit",
  description:
    "Production-quality academic cockpit with real-time telemetry, syllabus tracking, timetable, and assignments management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background font-body-md text-on-surface antialiased min-h-screen">
        <ThemeProvider>
          <NavProvider>
            <ToastProvider>{children}</ToastProvider>
          </NavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
