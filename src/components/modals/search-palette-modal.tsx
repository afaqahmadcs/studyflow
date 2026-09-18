"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, BookOpen, CheckSquare, Calendar, FileText, ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { useNav, NavItemKey } from "@/context/nav-context";
import { useToast } from "@/components/ui/toast";

import { useRouter } from "next/navigation";

interface SearchPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionType: "assignment" | "exam" | "study" | "attendance" | "note") => void;
}

interface SearchItem {
  id: string;
  category: "Navigation" | "Courses" | "Actions" | "Deliverables";
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function SearchPaletteModal({
  isOpen,
  onClose,
  onSelectAction,
}: SearchPaletteModalProps) {
  const [query, setQuery] = useState("");
  const { setActiveNav } = useNav();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const items: SearchItem[] = useMemo(
    () => [
      {
        id: "nav-overview",
        category: "Navigation",
        title: "Overview Dashboard",
        subtitle: "Momentum, KPIs, schedule & deliverables",
        icon: Calendar,
        action: () => {
          setActiveNav("overview");
          router.push("/");
          onClose();
        },
      },
      {
        id: "nav-timetable",
        category: "Navigation",
        title: "Timetable & Classes",
        subtitle: "Weekly schedule and syllabus timeline",
        icon: Calendar,
        action: () => {
          setActiveNav("timetable");
          router.push("/timetable");
          onClose();
        },
      },
      {
        id: "nav-assignments",
        category: "Navigation",
        title: "Assignments Queue",
        subtitle: "Active deliverables and submissions",
        icon: CheckSquare,
        action: () => {
          setActiveNav("assignments");
          router.push("/assignments");
          onClose();
        },
      },
      {
        id: "nav-exams",
        category: "Navigation",
        title: "Exams & Academic Evaluations",
        subtitle: "Upcoming exams, live countdowns & syllabus mastery",
        icon: Calendar,
        action: () => {
          setActiveNav("exams");
          router.push("/exams");
          onClose();
        },
      },
      {
        id: "nav-attendance",
        category: "Navigation",
        title: "Attendance & Compliance Telemetry",
        subtitle: "Course check-ins, safe miss buffer & audit trail",
        icon: CheckSquare,
        action: () => {
          setActiveNav("attendance");
          router.push("/attendance");
          onClose();
        },
      },
      {
        id: "action-new-assignment",
        category: "Actions",
        title: "Create New Assignment",
        subtitle: "Add deliverable to course queue [Hotkey: A]",
        icon: CheckSquare,
        action: () => {
          onClose();
          onSelectAction("assignment");
        },
      },
      {
        id: "action-add-exam",
        category: "Actions",
        title: "Schedule Target Exam",
        subtitle: "Lock exam countdown and revision pacing [Hotkey: E]",
        icon: Calendar,
        action: () => {
          onClose();
          onSelectAction("exam");
        },
      },
      {
        id: "action-deep-study",
        category: "Actions",
        title: "Start Deep Study Sprint",
        subtitle: "Initiate timed focus session with telemetry",
        icon: BookOpen,
        action: () => {
          onClose();
          onSelectAction("study");
        },
      },
      {
        id: "course-cs401",
        category: "Courses",
        title: "CS401: Distributed Systems Architecture",
        subtitle: "Grade A (94%) • Prof. Martinez • Midterm Friday",
        icon: BookOpen,
        action: () => {
          toast({
            title: "CS401: Distributed Systems",
            description: "Opening course dossier, lecture recordings, and syllabus.",
            type: "info",
          });
          onClose();
        },
      },
      {
        id: "course-cs450",
        category: "Courses",
        title: "CS450: Operating Systems & Kernel Architecture",
        subtitle: "Grade A- (91%) • Prof. Vance • Allocator due today",
        icon: BookOpen,
        action: () => {
          toast({
            title: "CS450: Operating Systems",
            description: "Opening kernel laboratory notes and assignment briefing.",
            type: "info",
          });
          onClose();
        },
      },
      {
        id: "deliv-kernel",
        category: "Deliverables",
        title: "Kernel Memory Allocator (Malloc) Implementation",
        subtitle: "CS450 • Due Today, 11:59 PM • 85% ready",
        icon: FileText,
        action: () => {
          toast({
            title: "Kernel Allocator",
            description: "Opening C99 source code and Valgrind test outputs.",
            type: "info",
          });
          onClose();
        },
      },
    ],
    [setActiveNav, onClose, onSelectAction, toast]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.subtitle.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower)
    );
  }, [items, query]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          <span>Quick Command &amp; Search</span>
        </div>
      }
      description="Navigate modules, quick triggers, courses, and syllabus files"
      maxWidth="lg"
    >
      <div className="space-y-4">
        <div className="relative flex items-center">
          <Search className="w-[18px] h-[18px] text-outline absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to filter courses, tasks, actions, or notes..."
            className="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-9 pr-4 py-2.5 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            autoFocus
          />
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1.5 pr-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center font-body-sm text-on-surface-variant">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full p-2.5 rounded-lg bg-surface-container/60 hover:bg-surface-container text-left transition-colors flex items-center justify-between group border border-white/[0.04]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-md bg-surface-container-high text-primary group-hover:text-on-primary group-hover:bg-primary transition-colors flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-on-surface font-semibold truncate">
                          {item.title}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono-code bg-surface-container-highest text-on-surface-variant">
                          {item.category}
                        </span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-outline opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono-code text-on-surface-variant pt-2 border-t border-white/[0.06]">
          <span>Tip: Press ESC to exit</span>
          <span>Global Shortcut: ⌘K / Ctrl+K</span>
        </div>
      </div>
    </Modal>
  );
}
