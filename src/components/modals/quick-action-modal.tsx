"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import {
  ClipboardPlus,
  CalendarPlus,
  Timer,
  CheckCircle2,
  FileEdit,
  Sliders,
  Play,
} from "lucide-react";

export type QuickActionType =
  | "assignment"
  | "exam"
  | "study"
  | "attendance"
  | "note"
  | "syllabus"
  | null;

interface QuickActionModalProps {
  type: QuickActionType;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickActionModal({
  type,
  isOpen,
  onClose,
}: QuickActionModalProps) {
  const { toast } = useToast();

  // Form states
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [courseCode, setCourseCode] = useState("CS450");
  const [studyMinutes, setStudyMinutes] = useState(50);
  const [noteContent, setNoteContent] = useState("");

  if (!type) return null;

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitle.trim()) return;

    toast({
      title: "Deliverable Created",
      description: `"${assignmentTitle}" added to ${courseCode} queue.`,
      type: "success",
    });
    setAssignmentTitle("");
    onClose();
  };

  const handleStartStudy = () => {
    toast({
      title: "Deep Study Sprint Started",
      description: `${studyMinutes}m focus sprint activated for ${courseCode}. Do not disturb enabled.`,
      type: "success",
    });
    onClose();
  };

  const handleSaveNote = () => {
    toast({
      title: "Quick Note Saved",
      description: "Note synchronized to offline study vault.",
      type: "success",
    });
    setNoteContent("");
    onClose();
  };

  const titles: Record<NonNullable<QuickActionType>, string> = {
    assignment: "Create New Assignment",
    exam: "Schedule Target Exam",
    study: "Start Deep Study Sprint",
    attendance: "Quick Attendance Verification",
    note: "Quick Scratchpad Note",
    syllabus: "Syllabus & Module Roadmap",
  };

  const icons: Record<NonNullable<QuickActionType>, React.ReactNode> = {
    assignment: <ClipboardPlus className="w-5 h-5 text-primary" />,
    exam: <CalendarPlus className="w-5 h-5 text-error" />,
    study: <Timer className="w-5 h-5 text-secondary" />,
    attendance: <CheckCircle2 className="w-5 h-5 text-tertiary" />,
    note: <FileEdit className="w-5 h-5 text-primary" />,
    syllabus: <Sliders className="w-5 h-5 text-outline" />,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          {icons[type]}
          <span>{titles[type]}</span>
        </div>
      }
      description="Command Center Quick Action Terminal"
      maxWidth="md"
    >
      {type === "assignment" && (
        <form onSubmit={handleCreateAssignment} className="space-y-4">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Assignment Title
            </label>
            <Input
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              placeholder="e.g. Distributed Key-Value Store Part 2"
              autoFocus
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Course
              </label>
              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary"
              >
                <option value="CS450">CS450: Operating Systems</option>
                <option value="CS401">CS401: Distributed Systems</option>
                <option value="CS320">CS320: Database Engineering</option>
                <option value="MATH310">MATH310: Applied Linear Algebra</option>
              </select>
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Priority Channel
              </label>
              <select className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary">
                <option value="critical">Critical (&lt; 24 Hours)</option>
                <option value="high">High Priority</option>
                <option value="standard">Standard Term Pace</option>
                <option value="low">Backlog Queue</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Assignment
            </Button>
          </div>
        </form>
      )}

      {type === "exam" && (
        <div className="space-y-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Set up an examination anchor to trigger automated syllabus pacing, study session recommendations, and countdown telemetry.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                Target Exam Name
              </label>
              <Input placeholder="e.g. CS450 Final Exam (Comprehensive)" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Exam Date
                </label>
                <Input type="date" defaultValue="2025-11-20" />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Weight (% of Grade)
                </label>
                <Input type="number" defaultValue="35" min="1" max="100" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                toast({
                  title: "Exam Milestone Locked",
                  description: "Calendar synchronized and study schedule calibrated.",
                  type: "success",
                });
                onClose();
              }}
            >
              Lock Milestone
            </Button>
          </div>
        </div>
      )}

      {type === "study" && (
        <div className="space-y-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Engage uninterrupted focus protocol with synchronized telemetry tracking.
          </p>

          <div className="space-y-2">
            <label className="block font-label-sm text-label-sm text-on-surface-variant">
              Select Sprint Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[25, 50, 90].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setStudyMinutes(mins)}
                  className={`py-2.5 px-3 rounded-lg border text-center transition-all ${
                    studyMinutes === mins
                      ? "bg-secondary-container text-on-secondary-container border-secondary font-bold"
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface border-white/[0.06]"
                  }`}
                >
                  <span className="font-mono-timer text-lg block">{mins}m</span>
                  <span className="font-label-sm text-[11px] opacity-80">
                    {mins === 25 ? "Pomodoro" : mins === 50 ? "Deep Focus" : "Ultra Sprint"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="accent-cyan"
              icon={<Play className="w-4 h-4 fill-current" />}
              onClick={handleStartStudy}
            >
              Begin Focus Sprint
            </Button>
          </div>
        </div>
      )}

      {type === "attendance" && (
        <div className="space-y-3">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Verify lecture presence for today&apos;s active timetable slots:
          </p>

          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between border border-white/[0.06]">
              <div>
                <span className="font-mono-code text-xs text-primary">CS401</span>
                <p className="font-label-md text-on-surface">Distributed Systems</p>
                <span className="font-body-sm text-xs text-on-surface-variant">09:00 AM - 10:30 AM</span>
              </div>
              <span className="px-2 py-1 rounded bg-tertiary-container/20 text-tertiary font-label-sm flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between border border-white/[0.06]">
              <div>
                <span className="font-mono-code text-xs text-secondary">CS320</span>
                <p className="font-label-md text-on-surface">Database Engineering</p>
                <span className="font-body-sm text-xs text-on-surface-variant">11:00 AM - 12:30 PM (Active)</span>
              </div>
              <Button
                size="sm"
                variant="accent-emerald"
                onClick={() => {
                  toast({
                    title: "Attendance Recorded",
                    description: "CS320 presence stamped with GPS verification.",
                    type: "success",
                  });
                  onClose();
                }}
              >
                Mark Present
              </Button>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="ghost" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      )}

      {type === "note" && (
        <div className="space-y-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Rapid Scratchpad Note
            </label>
            <textarea
              rows={4}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Paste algorithm snippets, kernel panic notes, or syllabus queries..."
              className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm p-3 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary resize-none"
              autoFocus
            />
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="font-mono-code text-[11px] text-on-surface-variant">
              Auto-saves to local cache
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>
                Discard
              </Button>
              <Button variant="primary" onClick={handleSaveNote}>
                Save to Vault
              </Button>
            </div>
          </div>
        </div>
      )}

      {type === "syllabus" && (
        <div className="space-y-3">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Spring 2025 Course Syllabi &amp; Grade Thresholds:
          </p>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            <div className="p-2.5 rounded-lg bg-surface-container border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-xs text-primary font-bold">CS401</span>
                <span className="font-label-sm text-xs text-tertiary">94% Target met</span>
              </div>
              <p className="font-label-md text-on-surface text-sm">Distributed Systems Architecture</p>
              <p className="font-body-sm text-xs text-on-surface-variant">Next: Raft Consensus Proofs (Week 9)</p>
            </div>

            <div className="p-2.5 rounded-lg bg-surface-container border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-xs text-primary font-bold">CS450</span>
                <span className="font-label-sm text-xs text-primary">91% Target met</span>
              </div>
              <p className="font-label-md text-on-surface text-sm">Operating Systems &amp; Kernel Architecture</p>
              <p className="font-body-sm text-xs text-on-surface-variant">Next: Virtual Memory Allocator (Due Today)</p>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
