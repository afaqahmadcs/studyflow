"use client";

import React from "react";
import Image from "next/image";
import { Search, Bell, Plus, ChevronDown, Menu } from "lucide-react";
import { useNav } from "@/context/nav-context";
import { STUDENT_PROFILE } from "@/data/student-data";

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenQuickAction: () => void;
  onToggleNotifications: () => void;
  unreadCount?: number;
}

export function Header({
  onOpenSearch,
  onOpenQuickAction,
  onToggleNotifications,
  unreadCount = 3,
}: HeaderProps) {
  const { toggleMobileMenu } = useNav();

  return (
    <header className="sticky top-0 right-0 h-[68px] bg-surface-container-lowest/85 backdrop-blur-xl z-30 px-space-md md:px-space-lg flex items-center justify-between border-b border-white/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Left: Mobile hamburger & Greeting */}
      <div className="flex items-center gap-space-sm md:gap-space-md min-w-0">
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-sm text-headline-sm font-semibold text-on-surface tracking-tight truncate">
              Good evening, {STUDENT_PROFILE.name}
            </span>
            <span className="text-body-md select-none">👋</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
            Monday, Oct 27 • 3 classes remaining today
          </span>
        </div>
      </div>

      {/* Right: Search, Notifications, Quick Action, Profile */}
      <div className="flex items-center gap-space-sm md:gap-space-md">
        {/* Search Bar - triggers Search Modal */}
        <div
          onClick={onOpenSearch}
          className="relative hidden sm:flex items-center cursor-pointer group"
        >
          <Search className="w-[18px] h-[18px] text-outline absolute left-3 pointer-events-none group-hover:text-primary transition-colors" />
          <div className="w-48 md:w-72 bg-surface-container-low text-outline group-hover:text-on-surface-variant font-body-sm text-body-sm pl-9 pr-14 py-2 rounded-full border border-white/[0.08] transition-all group-hover:border-primary/40 group-hover:bg-surface-container-high">
            Search courses, tasks, notes...
          </div>
          <div className="absolute right-2.5 flex items-center pointer-events-none">
            <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-code text-[10px] border border-white/[0.08]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Mobile Search Icon Button */}
        <button
          onClick={onOpenSearch}
          aria-label="Search"
          className="sm:hidden p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Button */}
        <button
          onClick={onToggleNotifications}
          aria-label="Notifications"
          className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
        >
          <Bell className="w-[20px] h-[20px]" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface-container-lowest animate-pulse" />
          )}
        </button>

        {/* Quick Action Button */}
        <button
          onClick={onOpenQuickAction}
          className="flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md border border-white/[0.08] transition-all active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4 text-primary" />
          <span className="hidden xs:inline">Quick Action</span>
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-1 pl-1 cursor-pointer group">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src={STUDENT_PROFILE.avatar}
              alt="Student Profile"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border border-white/[0.1]"
              priority
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary border-2 border-surface-container-lowest" />
          </div>
          <ChevronDown className="w-4 h-4 text-on-surface-variant group-hover:text-on-surface transition-colors hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
