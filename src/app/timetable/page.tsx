"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TimetableHeader, TimetableViewMode } from "@/components/timetable/timetable-header";
import { LiveSessionStrip } from "@/components/timetable/live-session-strip";
import { WeeklyGrid } from "@/components/timetable/weekly-grid";
import { DayView } from "@/components/timetable/day-view";
import { ClassModal } from "@/components/timetable/class-modal";
import { INITIAL_CLASSES } from "@/data/timetable-data";
import { ClassItem, DayOfWeek } from "@/types/timetable";
import { useToast } from "@/components/ui/toast";
import { SearchPaletteModal } from "@/components/modals/search-palette-modal";
import { NotificationsPopover } from "@/components/modals/notifications-popover";
import { QuickActionModal, QuickActionType } from "@/components/modals/quick-action-modal";

const DAYS_LIST: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function TimetablePage() {
  const [classes, setClasses] = useState<ClassItem[]>(INITIAL_CLASSES);
  const [viewMode, setViewMode] = useState<TimetableViewMode>("week");
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // 0 = Monday
  const [selectedSubject, setSelectedSubject] = useState("ALL");
  const [onlyLabs, setOnlyLabs] = useState(false);

  // Modal states
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState<QuickActionType>(null);

  const { toast } = useToast();

  const currentDay = DAYS_LIST[currentDayIndex];

  // Hotkey listener for 'C' to Add Class
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        setEditingClass(null);
        setClassModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // CRUD Handlers
  const handleSaveClass = (classData: Omit<ClassItem, "id" | "status">, editingId?: string) => {
    if (editingId) {
      setClasses((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, ...classData }
            : c
        )
      );
      toast({
        title: "Class Updated",
        description: `${classData.subjectCode} updated on ${classData.day} schedule.`,
        type: "success",
      });
    } else {
      const newClass: ClassItem = {
        ...classData,
        id: `cls-${Date.now()}`,
        status: "upcoming",
      };
      setClasses((prev) => [...prev, newClass]);
      toast({
        title: "Class Added to Timetable",
        description: `${classData.subjectCode} scheduled on ${classData.day} (${classData.startTime} - ${classData.endTime}).`,
        type: "success",
      });
    }
  };

  const handleDeleteClass = (id: string) => {
    const target = classes.find((c) => c.id === id);
    setClasses((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: "Class Removed",
      description: `${target?.subjectCode || "Class"} removed from schedule.`,
      type: "info",
    });
  };

  const handleOpenEdit = (item: ClassItem) => {
    setEditingClass(item);
    setClassModalOpen(true);
  };

  const handleNextDate = () => {
    setCurrentDayIndex((prev) => (prev < DAYS_LIST.length - 1 ? prev + 1 : 0));
  };

  const handlePrevDate = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : DAYS_LIST.length - 1));
  };

  const handleToday = () => {
    setCurrentDayIndex(0); // Monday is today in the prototype
    setViewMode("day");
  };

  return (
    <div className="relative min-h-screen bg-background text-on-surface flex">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen z-40">
        <Sidebar />
      </div>

      {/* Mobile Slide-Over Navigation */}
      <MobileNav />

      {/* Main Content Workspace */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-w-0 min-h-screen">
        {/* Sticky Header */}
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onOpenQuickAction={() => setQuickActionType("assignment")}
          onToggleNotifications={() => setNotificationsOpen(true)}
        />

        <main className="relative flex-1 p-space-sm sm:p-space-md lg:p-space-lg min-w-0 overflow-x-hidden">
          {/* Atmospheric Ambient Glows */}
          <div className="absolute -top-10 left-1/4 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-28 right-12 w-80 h-80 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none -z-10" />

          {/* Timetable Header with switchers, date navigation & subject filters */}
          <TimetableHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
            onlyLabs={onlyLabs}
            onToggleOnlyLabs={() => setOnlyLabs((prev) => !prev)}
            onOpenAddModal={() => {
              setEditingClass(null);
              setClassModalOpen(true);
            }}
            onSyncCalendar={() =>
              toast({
                title: "Calendar Synchronized",
                description: "Exported 18 Credit Units schedule to iCal / Google Calendar feed.",
                type: "success",
              })
            }
            currentDateText={
              viewMode === "week" ? "Week 8 (Oct 27 – Nov 02)" : `${currentDay} (${currentDay === "Monday" ? "Today" : "Oct"})`
            }
            onPrevDate={handlePrevDate}
            onNextDate={handleNextDate}
            onToday={handleToday}
          />

          {/* Live Session Strip */}
          <LiveSessionStrip
            onOpenNotes={() => setQuickActionType("note")}
            onOpenBench={() =>
              toast({
                title: "Workstation #14 Bench",
                description: "Postgres index tuning environment launched.",
                type: "success",
              })
            }
          />

          {/* Timetable View */}
          {viewMode === "week" ? (
            <WeeklyGrid
              classes={classes}
              onSelectClass={handleOpenEdit}
              selectedSubject={selectedSubject}
              onlyLabs={onlyLabs}
            />
          ) : (
            <DayView
              day={currentDay}
              classes={classes}
              onSelectClass={handleOpenEdit}
              selectedSubject={selectedSubject}
              onlyLabs={onlyLabs}
            />
          )}
        </main>
      </div>

      {/* Class Form Modal (Add / Edit / Delete) */}
      <ClassModal
        isOpen={classModalOpen}
        onClose={() => setClassModalOpen(false)}
        onSave={handleSaveClass}
        onDelete={handleDeleteClass}
        initialData={editingClass}
      />

      {/* Search Command Palette */}
      <SearchPaletteModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectAction={(action) => setQuickActionType(action)}
      />

      {/* Notifications Popover */}
      <NotificationsPopover
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* Quick Action Modal */}
      <QuickActionModal
        type={quickActionType}
        isOpen={quickActionType !== null}
        onClose={() => setQuickActionType(null)}
      />
    </div>
  );
}
