"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Calendar,
  ClipboardList,
  CalendarCheck,
  CheckSquare,
  Timer,
  Flag,
  FileEdit,
  TrendingUp,
  Settings,
  Moon,
  Sun,
  Award,
} from "lucide-react";
import { useNav, NavItemKey } from "@/context/nav-context";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

interface NavItemConfig {
  key: NavItemKey;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
  badgeVariant?: "secondary" | "error";
}

const NAV_ITEMS: NavItemConfig[] = [
  { key: "overview", label: "Overview", href: "/", icon: LayoutGrid },
  { key: "timetable", label: "Timetable", href: "/timetable", icon: Calendar },
  {
    key: "assignments",
    label: "Assignments",
    href: "/assignments",
    icon: ClipboardList,
    badgeCount: 4,
    badgeVariant: "secondary",
  },
  {
    key: "exams",
    label: "Exams",
    href: "/exams",
    icon: CalendarCheck,
    badgeCount: 2,
    badgeVariant: "error",
  },
  { key: "attendance", label: "Attendance", href: "/attendance", icon: CheckSquare },
  { key: "study", label: "Study", href: "/study", icon: Timer },
  { key: "goals", label: "Goals", href: "/goals", icon: Flag },
  { key: "notes", label: "Notes", href: "/notes", icon: FileEdit },
  { key: "analytics", label: "Analytics", href: "/#analytics", icon: TrendingUp },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { activeNav, setActiveNav } = useNav();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={cn(
        "h-screen w-[260px] bg-surface-container-lowest flex flex-col justify-between z-40 border-r border-white/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand & Version Header */}
        <div className="h-[68px] px-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest/80 backdrop-blur-md border-b border-white/[0.04]">
          <Link href="/" className="flex items-center gap-space-sm min-w-0">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Student Command Center Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                priority
              />
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight truncate">
              Command Center
            </span>
          </Link>
          <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-mono-code text-[10px] uppercase font-medium flex-shrink-0 border border-white/[0.08]">
            v2.4
          </span>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-space-sm py-space-sm space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isRouteActive =
              (item.href === "/" && pathname === "/") ||
              (item.href !== "/" && pathname === item.href) ||
              (item.href === "/#exams" && activeNav === "exams" && pathname === "/") ||
              (item.href === "/#attendance" && activeNav === "attendance" && pathname === "/") ||
              (item.href === "/#study" && activeNav === "study" && pathname === "/") ||
              (item.href === "/#goals" && activeNav === "goals" && pathname === "/") ||
              (item.href === "/#notes" && activeNav === "notes" && pathname === "/") ||
              (item.href === "/#analytics" && activeNav === "analytics" && pathname === "/");

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setActiveNav(item.key)}
                className={cn(
                  "w-full group flex items-center justify-between px-space-sm py-2 rounded-lg transition-all duration-150 font-body-md text-body-md text-left",
                  isRouteActive
                    ? "bg-primary-container text-on-primary font-semibold shadow-[0_0_16px_rgba(128,131,255,0.35)]"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                )}
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <Icon
                    className={cn(
                      "w-[20px] h-[20px] flex-shrink-0 transition-colors",
                      isRouteActive
                        ? "text-on-primary"
                        : "text-on-surface-variant group-hover:text-on-surface"
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badgeCount !== undefined && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full font-mono-code text-[11px] font-medium flex-shrink-0",
                      isRouteActive
                        ? "bg-on-primary/20 text-on-primary"
                        : item.badgeVariant === "error"
                        ? "bg-error-container/40 text-error"
                        : "bg-secondary/15 text-secondary"
                    )}
                  >
                    {item.badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Academic Telemetry & Settings */}
      <div className="p-space-sm space-y-space-xs bg-surface-container-lowest border-t border-white/[0.06]">
        <div className="px-space-sm py-space-xs flex items-center justify-between rounded bg-surface-container-low border border-white/[0.04]">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Spring Term 2025
          </span>
          <span className="font-mono-code text-mono-code text-primary font-medium">
            Week 8
          </span>
        </div>

        <div className="px-space-sm py-space-xs flex items-center justify-between rounded bg-tertiary-container/20 text-tertiary border border-tertiary/20">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-label-sm text-label-sm font-semibold">
              GPA 3.86
            </span>
          </div>
          <span className="font-label-sm text-label-sm">Top 5%</span>
        </div>

        <div className="pt-space-xs flex items-center justify-between">
          <Link
            href="/#settings"
            onClick={() => setActiveNav("settings")}
            className={cn(
              "flex items-center gap-space-xs px-2 py-1.5 rounded transition-all font-label-md text-label-md",
              activeNav === "settings" && pathname === "/"
                ? "bg-primary-container text-on-primary font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            )}
          >
            <Settings className="w-[18px] h-[18px]" />
            <span>Settings</span>
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-[18px] h-[18px]" />
            ) : (
              <Moon className="w-[18px] h-[18px]" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
