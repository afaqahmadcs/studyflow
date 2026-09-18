"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AssignmentsTelemetry } from "@/components/assignments/assignments-telemetry";
import {
  AssignmentsControlBar,
  StatusTabKey,
  SortOption,
} from "@/components/assignments/assignments-control-bar";
import { AssignmentRow } from "@/components/assignments/assignment-row";
import { AssignmentModal } from "@/components/assignments/assignment-modal";
import { INITIAL_ASSIGNMENTS } from "@/data/assignments-data";
import { AssignmentItem } from "@/types/assignment";
import { useToast } from "@/components/ui/toast";
import { RefreshCw, Plus, CheckCircle2, FileQuestion } from "lucide-react";
import { SearchPaletteModal } from "@/components/modals/search-palette-modal";
import { NotificationsPopover } from "@/components/modals/notifications-popover";
import { QuickActionModal, QuickActionType } from "@/components/modals/quick-action-modal";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_assignments");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_ASSIGNMENTS;
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("command_center_assignments", JSON.stringify(assignments));
  }, [assignments]);

  const [currentTab, setCurrentTab] = useState<StatusTabKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [selectedPriority, setSelectedPriority] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("dueDate");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AssignmentItem | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState<QuickActionType>(null);

  const { toast } = useToast();

  // Hotkey listener for 'A' to create assignment
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        setEditingItem(null);
        setModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Completion Toggle
  const handleToggleComplete = (id: string) => {
    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          toast({
            title: nextCompleted ? "Deliverable Completed" : "Deliverable Reopened",
            description: `${item.title} marked as ${nextCompleted ? "completed (100%)" : "in progress"}.`,
            type: nextCompleted ? "success" : "info",
          });
          return {
            ...item,
            completed: nextCompleted,
            status: nextCompleted ? "completed" : "in_progress",
            progress: nextCompleted ? 100 : item.progress === 100 ? 60 : item.progress,
          };
        }
        return item;
      })
    );
  };

  // CRUD Handlers
  const handleSave = (
    data: Omit<AssignmentItem, "id" | "completed">,
    editingId?: string
  ) => {
    if (editingId) {
      setAssignments((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...data,
                completed: data.status === "completed" || data.progress === 100,
              }
            : item
        )
      );
      toast({
        title: "Assignment Updated",
        description: `"${data.title}" updated successfully.`,
        type: "success",
      });
    } else {
      const newItem: AssignmentItem = {
        ...data,
        id: `asg-${Date.now()}`,
        completed: data.status === "completed" || data.progress === 100,
      };
      setAssignments((prev) => [newItem, ...prev]);
      toast({
        title: "Deliverable Created",
        description: `"${data.title}" added to ${data.subjectCode} backlog.`,
        type: "success",
      });
    }
  };

  const handleDelete = (id: string) => {
    const target = assignments.find((a) => a.id === id);
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    toast({
      title: "Deliverable Removed",
      description: `"${target?.title || "Item"}" deleted from queue.`,
      type: "info",
    });
  };

  const handleEdit = (item: AssignmentItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  // Counts for each tab
  const counts = useMemo<Record<StatusTabKey, number>>(() => {
    return {
      all: assignments.length,
      pending: assignments.filter((a) => a.status === "pending" || (!a.completed && a.progress === 0)).length,
      in_progress: assignments.filter((a) => a.status === "in_progress" && !a.completed).length,
      completed: assignments.filter((a) => a.status === "completed" || a.completed).length,
      overdue: assignments.filter((a) => a.status === "overdue").length,
    };
  }, [assignments]);

  // Filtering & Sorting
  const filteredAndSorted = useMemo(() => {
    let result = assignments.filter((item) => {
      // Status tab filter
      if (currentTab === "pending") {
        if (item.completed || (item.status !== "pending" && item.progress > 0)) return false;
      } else if (currentTab === "in_progress") {
        if (item.completed || item.status !== "in_progress") return false;
      } else if (currentTab === "completed") {
        if (!item.completed && item.status !== "completed") return false;
      } else if (currentTab === "overdue") {
        if (item.status !== "overdue") return false;
      }

      // Course filter
      if (selectedCourse !== "ALL" && item.subjectCode !== selectedCourse) return false;

      // Priority filter
      if (selectedPriority !== "ALL" && item.priority !== selectedPriority) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchCourse = item.subjectCode.toLowerCase().includes(q) || item.subjectName.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchCourse && !matchDesc && !matchTags) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "dueDate") {
        return a.dueDate.localeCompare(b.dueDate);
      } else if (sortBy === "priority") {
        const order = { critical: 0, high: 1, medium: 2, low: 3 };
        return order[a.priority] - order[b.priority];
      } else if (sortBy === "progress") {
        return b.progress - a.progress;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [assignments, currentTab, selectedCourse, selectedPriority, searchQuery, sortBy]);

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
          onOpenQuickAction={() => {
            setEditingItem(null);
            setModalOpen(true);
          }}
          onToggleNotifications={() => setNotificationsOpen(true)}
        />

        <main className="relative flex-1 p-space-sm sm:p-space-md lg:p-space-lg min-w-0 overflow-x-hidden">
          {/* Atmospheric Ambient Glows */}
          <div className="absolute -top-24 left-1/4 w-96 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute -top-28 right-10 w-80 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Title + Primary Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
                  Assignments &amp; Deliverables
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-error-container/30 text-error font-mono-code text-label-sm font-semibold flex items-center gap-1.5 border border-error/20 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-error" />
                  1 Due Tonight
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Spring Term 2025 • <span className="text-on-surface font-medium">{assignments.length} Active Deliverables</span> • Academic sprint focus window
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={() =>
                  toast({
                    title: "Canvas LMS Synced",
                    description: "Updated grades, rubrics, and submission endpoints.",
                    type: "success",
                  })
                }
                className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-all flex items-center gap-2 border border-white/[0.06] shadow-sm"
              >
                <RefreshCw className="w-4 h-4 text-secondary" />
                <span>Canvas Sync</span>
              </button>

              <button
                onClick={() => {
                  setEditingItem(null);
                  setModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-primary-container hover:brightness-110 text-on-primary font-label-md text-label-md font-semibold transition-all shadow-[0_0_20px_rgba(128,131,255,0.35)] flex items-center gap-2 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Assignment</span>
                <kbd className="px-1.5 py-0.5 rounded bg-on-primary/20 text-on-primary font-mono-code text-[10px] uppercase hidden sm:inline">
                  A
                </kbd>
              </button>
            </div>
          </div>

          {/* Telemetry Strip (5 KPI Workload Cards) */}
          <AssignmentsTelemetry assignments={assignments} />

          {/* Search, Filter, Sort & Control Deck */}
          <AssignmentsControlBar
            currentTab={currentTab}
            onTabChange={setCurrentTab}
            counts={counts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCourse={selectedCourse}
            onCourseChange={setSelectedCourse}
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Deliverables List Stack */}
          {filteredAndSorted.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-surface-container-low border border-white/[0.06] p-8">
              <FileQuestion className="w-10 h-10 text-outline mx-auto mb-3" />
              <h3 className="font-headline-sm text-on-surface font-bold">
                No deliverables found
              </h3>
              <p className="font-body-sm text-on-surface-variant max-w-sm mx-auto mt-1">
                {currentTab === "overdue"
                  ? "Flawless record! You have zero overdue assignments this term."
                  : "No assignments match your active search filters."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredAndSorted.map((item) => (
                <AssignmentRow
                  key={item.id}
                  item={item}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Assignment Modal */}
      <AssignmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        initialData={editingItem}
      />

      {/* Search Palette Command Palette */}
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
