"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MomentumCard } from "@/components/dashboard/momentum-card";
import { QuickActionsHub } from "@/components/dashboard/quick-actions-hub";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { ScheduleTimeline } from "@/components/dashboard/schedule-timeline";
import { DeliverablesList } from "@/components/dashboard/deliverables-list";
import { ExamCountdown } from "@/components/dashboard/exam-countdown";
import { StudyVelocity } from "@/components/dashboard/study-velocity";
import { AcademicProgress } from "@/components/dashboard/academic-progress";
import {
  QuickActionModal,
  QuickActionType,
} from "@/components/modals/quick-action-modal";
import { SearchPaletteModal } from "@/components/modals/search-palette-modal";
import { NotificationsPopover } from "@/components/modals/notifications-popover";
import { useNav } from "@/context/nav-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function StudentCommandCenterDashboard() {
  const { activeNav, setActiveNav } = useNav();

  // Modal states
  const [quickActionType, setQuickActionType] = useState<QuickActionType>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Global Keyboard Hotkey Listeners (⌘K, A, E, N)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // ⌘K or Ctrl+K for search command palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
        return;
      }

      // Single-key hotkeys
      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() === "a") {
          e.preventDefault();
          setQuickActionType("assignment");
        } else if (e.key.toLowerCase() === "e") {
          e.preventDefault();
          setQuickActionType("exam");
        } else if (e.key.toLowerCase() === "n") {
          e.preventDefault();
          setQuickActionType("note");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-on-surface flex">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen z-40">
        <Sidebar />
      </div>

      {/* Mobile Slide-Over Navigation */}
      <MobileNav />

      {/* Main Workspace Area */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-w-0 min-h-screen">
        {/* Sticky Header */}
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onOpenQuickAction={() => setQuickActionType("assignment")}
          onToggleNotifications={() => setNotificationsOpen(true)}
          unreadCount={3}
        />

        {/* Main Content Area */}
        <main className="relative flex-1 p-space-sm sm:p-space-md lg:p-space-lg min-w-0 overflow-x-hidden">
          {/* Atmospheric Ambient Glows matching Stitch Design */}
          <div className="absolute -top-10 left-1/4 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-28 right-12 w-80 h-80 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none -z-10" />

          {/* If another nav item is active, show contextual top banner */}
          {activeNav !== "overview" && (
            <div className="mb-space-md p-space-sm rounded-xl bg-surface-container-high/90 border border-primary/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-mono-code text-xs uppercase font-semibold">
                  {activeNav} view
                </span>
                <p className="font-body-sm text-on-surface">
                  Displaying synchronized view for{" "}
                  <strong className="capitalize">{activeNav}</strong> module.
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                icon={<ArrowLeft className="w-4 h-4" />}
                onClick={() => setActiveNav("overview")}
              >
                Return to Overview
              </Button>
            </div>
          )}

          {/* Main 8-Section Dashboard Layout */}
          <div className="flex flex-col w-full space-y-space-lg relative">
            {/* SECTION 1: Top Action Strip & Daily Goal Telemetry Banner */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-stretch">
              <div className="xl:col-span-7">
                <MomentumCard />
              </div>
              <div className="xl:col-span-5">
                <QuickActionsHub
                  onActionClick={(type) => setQuickActionType(type)}
                />
              </div>
            </div>

            {/* SECTION 2: Key Operational Metrics Grid (4 KPI cards) */}
            <MetricsGrid />

            {/* SECTION 3: Main Two-Column Asymmetric Grid (7 Col Left / 5 Col Right) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
              {/* Left Column: Primary Operations (Timetable & Deliverables) */}
              <div className="xl:col-span-7 space-y-space-lg">
                <ScheduleTimeline
                  onOpenScratchpad={() => setQuickActionType("note")}
                  onOpenNotes={() => setQuickActionType("syllabus")}
                />
                <DeliverablesList />
              </div>

              {/* Right Column: Analytics, Focus Tracker & Exam Readiness */}
              <div className="xl:col-span-5 space-y-space-lg">
                <ExamCountdown
                  onOpenRevisionNotes={() => setQuickActionType("syllabus")}
                />
                <StudyVelocity />
                <AcademicProgress />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals & Dialogs */}
      <QuickActionModal
        type={quickActionType}
        isOpen={quickActionType !== null}
        onClose={() => setQuickActionType(null)}
      />

      <SearchPaletteModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectAction={(action) => setQuickActionType(action)}
      />

      <NotificationsPopover
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
