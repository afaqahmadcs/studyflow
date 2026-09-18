"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  Calendar as CalendarIcon,
  CheckCheck,
  PlusCircle,
  Brain,
  Play,
  Filter,
} from "lucide-react";
import { ExamItem, ExamTopic, StudySession } from "@/types/exam";
import { INITIAL_EXAMS, COMPLETED_EXAMS } from "@/data/exams-data";
import { ExamsTelemetry } from "@/components/exams/exams-telemetry";
import { ExamCard } from "@/components/exams/exam-card";
import { ExamTimelineMatrix } from "@/components/exams/exam-timeline-matrix";
import { ExamDeepDive } from "@/components/exams/exam-deep-dive";
import { ExamModal } from "@/components/exams/exam-modal";
import { LogSessionModal } from "@/components/exams/log-session-modal";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "timeline" | "completed";

export default function ExamsPage() {
  const { toast } = useToast();

  const [exams, setExams] = useState<ExamItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_exams");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_EXAMS;
  });

  const [selectedExamId, setSelectedExamId] = useState<string>(
    INITIAL_EXAMS[0]?.id || "exam-cs401"
  );
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [disciplineFilter, setDisciplineFilter] = useState<string>("ALL");

  // Modals state
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamItem | null>(null);
  const [isLogSessionModalOpen, setIsLogSessionModalOpen] = useState(false);
  const [sessionExamTarget, setSessionExamTarget] = useState<ExamItem | null>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("command_center_exams", JSON.stringify(exams));
  }, [exams]);

  // Global hotkey 'E' to open register exam
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "e" || e.key === "E") &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement)?.tagName
        ) &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        e.preventDefault();
        setEditingExam(null);
        setIsExamModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered exams by discipline
  const filteredExams = exams.filter((e) => {
    if (disciplineFilter === "ALL") return true;
    return e.discipline === disciplineFilter;
  });

  const activeSelectedExam =
    exams.find((e) => e.id === selectedExamId) || exams[0] || INITIAL_EXAMS[0];

  // Average readiness
  const avgReadiness =
    exams.length > 0
      ? exams.reduce((acc, e) => acc + e.preparationPercentage, 0) / exams.length
      : 76.5;

  // Handlers
  const handleSaveExam = (data: Partial<ExamItem>) => {
    if (editingExam) {
      setExams((prev) =>
        prev.map((e) => (e.id === editingExam.id ? ({ ...e, ...data } as ExamItem) : e))
      );
      toast({
        title: "Exam Updated",
        description: `Modifications to ${data.code || editingExam.code} saved successfully.`,
        type: "success",
      });
    } else {
      const newExam: ExamItem = {
        id: `exam-${Date.now()}`,
        code: data.code || "EXAM",
        subjectName: data.subjectName || "Subject",
        title: data.title || `${data.code} Evaluation`,
        examDate: data.examDate || new Date().toISOString().split("T")[0],
        startTime: data.startTime || "10:00",
        endTime: data.endTime || "12:00",
        durationMinutes: data.durationMinutes || 120,
        room: data.room || "Auditorium 1",
        weightPercentage: data.weightPercentage || 25,
        preparationPercentage: data.preparationPercentage || 50,
        status: data.status || "scheduled",
        discipline: data.discipline || "CS",
        rulesNote: data.rulesNote || "Standard institutional rules apply",
        topics: [
          {
            id: `t-${Date.now()}-1`,
            name: `${data.code} Core Principles & Architecture`,
            description: "Fundamental theorems and operational paradigms",
            mastered: false,
            tag: "Scheduled",
          },
          {
            id: `t-${Date.now()}-2`,
            name: `${data.code} Problem Set & Analytical Proofs`,
            description: "Practice problems, edge cases, and runtime derivations",
            mastered: false,
            tag: "Queued",
          },
        ],
        studySessions: [],
        cheatsheetNotes: [
          {
            title: "Core Verification Invariant",
            formula: "Proof invariant for evaluation scope",
            explanation: "Review key derivations in course textbook prior to exam.",
          },
        ],
      };

      setExams((prev) => [newExam, ...prev]);
      setSelectedExamId(newExam.id);
      toast({
        title: "Exam Registered",
        description: `${newExam.code} evaluation appended to academic schedule.`,
        type: "success",
      });
    }
  };

  const handleDeleteExam = (id: string) => {
    const target = exams.find((e) => e.id === id);
    setExams((prev) => prev.filter((e) => e.id !== id));
    if (selectedExamId === id) {
      const remaining = exams.filter((e) => e.id !== id);
      if (remaining.length > 0) {
        setSelectedExamId(remaining[0].id);
      }
    }
    toast({
      title: "Exam Removed",
      description: `${target?.code || "Evaluation"} removed from schedule.`,
      type: "info",
    });
  };

  const handleUpdateTopics = (examId: string, updatedTopics: ExamTopic[]) => {
    setExams((prev) =>
      prev.map((e) => {
        if (e.id === examId) {
          const masteredCount = updatedTopics.filter((t) => t.mastered).length;
          const newPrep = Math.round((masteredCount / updatedTopics.length) * 100);
          return {
            ...e,
            topics: updatedTopics,
            preparationPercentage: newPrep,
          };
        }
        return e;
      })
    );
  };

  const handleSaveStudySession = (examId: string, session: StudySession) => {
    setExams((prev) =>
      prev.map((e) => {
        if (e.id === examId) {
          return {
            ...e,
            studySessions: [session, ...e.studySessions],
          };
        }
        return e;
      })
    );
    toast({
      title: "Study Session Logged",
      description: `Logged ${session.durationMinutes} mins towards ${session.title}.`,
      type: "success",
    });
  };

  return (
    <div className="flex flex-col w-full gap-space-lg p-space-lg max-w-7xl mx-auto">
      {/* 1. Header & Action Strip */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-xs">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-mono-code text-mono-code uppercase font-semibold text-[11px]">
              Evaluation Registry
            </span>
            <span className="text-on-surface-variant font-mono-code text-body-sm">•</span>
            <span className="text-on-surface-variant font-body-sm text-[13px]">
              Spring Term 2025
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Exams & Academic Evaluations
          </h1>
          <p className="text-on-surface-variant font-body-md text-[13px]">
            {exams.length} evaluations scheduled • Current term average target 92% • Next
            exam in 4 days
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          {/* View Switcher Tabs */}
          <div className="flex items-center bg-surface-container-lowest p-1 rounded-lg border border-white/[0.04]">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-3 py-1.5 rounded-md font-label-md text-label-md transition-all flex items-center gap-1.5 text-[12px]",
                viewMode === "grid"
                  ? "bg-surface-container-high text-on-surface shadow-sm font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <LayoutGrid className="w-4 h-4 text-primary" />
              <span>Grid Overview</span>
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={cn(
                "px-3 py-1.5 rounded-md font-label-md text-label-md transition-all flex items-center gap-1.5 text-[12px]",
                viewMode === "timeline"
                  ? "bg-surface-container-high text-on-surface shadow-sm font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Timeline Calendar</span>
            </button>
            <button
              onClick={() => setViewMode("completed")}
              className={cn(
                "px-3 py-1.5 rounded-md font-label-md text-label-md transition-all flex items-center gap-1.5 text-[12px]",
                viewMode === "completed"
                  ? "bg-surface-container-high text-on-surface shadow-sm font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <CheckCheck className="w-4 h-4" />
              <span>Completed ({COMPLETED_EXAMS.length})</span>
            </button>
          </div>

          {/* Discipline Filter */}
          <div className="relative">
            <select
              value={disciplineFilter}
              onChange={(e) => setDisciplineFilter(e.target.value)}
              className="appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md pl-3 pr-8 py-2 rounded-lg cursor-pointer hover:bg-surface-container transition-colors focus:outline-none border border-white/[0.04] text-[12px]"
            >
              <option value="ALL">All Disciplines ({exams.length})</option>
              <option value="CS">Computer Science (CS)</option>
              <option value="MATH">Mathematics (MATH)</option>
              <option value="ENG">Engineering (ENG)</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-outline absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Register Exam Button */}
          <button
            onClick={() => {
              setEditingExam(null);
              setIsExamModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-95 transition-opacity shadow-[0_0_18px_rgba(192,193,255,0.35)] text-[13px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Exam</span>
            <kbd className="hidden sm:inline-block ml-1 px-1 py-0.2 rounded bg-black/20 text-[10px] font-mono-code font-normal">
              E
            </kbd>
          </button>
        </div>
      </section>

      {/* 2. Telemetry KPI Cards with live countdown */}
      <ExamsTelemetry exams={exams} averageReadiness={avgReadiness} />

      {/* 3. Main Views */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Left Column: Scheduled Evaluations Cards */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <CheckCheck className="text-primary w-5 h-5" />
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Scheduled Evaluations
                </h2>
              </div>
              <span className="text-body-sm text-on-surface-variant font-mono-code text-[12px]">
                Sorted by Temporal Urgency
              </span>
            </div>

            {filteredExams.length === 0 ? (
              <div className="p-8 rounded-xl bg-surface-container-low border border-white/[0.04] text-center text-on-surface-variant">
                No examinations found for this discipline filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {filteredExams.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    isSelected={selectedExamId === exam.id}
                    onSelect={(e) => setSelectedExamId(e.id)}
                    onEdit={(e) => {
                      setEditingExam(e);
                      setIsExamModalOpen(true);
                    }}
                    onDelete={handleDeleteExam}
                  />
                ))}
              </div>
            )}

            {/* Smart Adaptive Revision Forecast Banner */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md w-full md:w-auto">
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary flex-shrink-0">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Smart Adaptive Revision Forecast
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                    Based on your {activeSelectedExam?.code} mastery curve, log 4.2 more hours
                    before Thursday to cross 85% readiness target.
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  toast({
                    title: "Timed Drill Started",
                    description: `Launched 25m adaptive revision block for ${activeSelectedExam?.code}.`,
                    type: "info",
                  })
                }
                className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md flex-shrink-0 transition-colors flex items-center gap-2 border border-white/[0.04] text-[12px]"
              >
                <span>Start Timed Drill</span>
                <Play className="w-3.5 h-3.5 text-primary fill-primary" />
              </button>
            </div>
          </div>

          {/* Right Column: Timeline Matrix Calendar & Course Weight Risk Matrix */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <ExamTimelineMatrix
              exams={exams}
              onSelectExam={(e) => setSelectedExamId(e.id)}
            />
          </div>
        </div>
      )}

      {viewMode === "timeline" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <div className="lg:col-span-5">
            <ExamTimelineMatrix
              exams={exams}
              onSelectExam={(e) => setSelectedExamId(e.id)}
            />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Chronological Evaluation Schedule
            </h2>
            <div className="flex flex-col gap-3">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => setSelectedExamId(exam.id)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                    selectedExamId === exam.id
                      ? "bg-surface-container border-primary/40 ring-1 ring-primary/30"
                      : "bg-surface-container-low border-white/[0.04] hover:bg-surface-container"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center font-bold font-mono-code text-[12px]">
                      {exam.code}
                    </div>
                    <div>
                      <h4 className="font-headline-sm font-semibold text-on-surface">
                        {exam.subjectName}
                      </h4>
                      <p className="text-[12px] text-on-surface-variant">
                        {exam.examDate} • {exam.startTime} – {exam.endTime} • {exam.room}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="font-mono-code text-[12px] text-primary block font-semibold">
                        {exam.weightPercentage}% Grade Weight
                      </span>
                      <span className="text-[11px] text-tertiary">
                        {exam.preparationPercentage}% Prepared
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === "completed" && (
        <div className="p-space-lg rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm flex flex-col gap-space-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Concluded Academic Evaluations
            </h2>
            <p className="text-on-surface-variant text-[13px]">
              Verified grades and recorded institutional evaluations for Spring Term 2025.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="text-outline font-label-sm text-label-sm uppercase tracking-wider bg-surface-container-lowest/50">
                  <th className="py-3 px-4 rounded-l-lg">Course Code</th>
                  <th className="py-3 px-4">Subject Title</th>
                  <th className="py-3 px-4">Concluded Date</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4 rounded-r-lg">Official Grade</th>
                </tr>
              </thead>
              <tbody>
                {COMPLETED_EXAMS.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-surface-container transition-colors border-b border-white/[0.02]"
                  >
                    <td className="py-3.5 px-4 font-mono-code text-primary font-bold">
                      {c.code}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-on-surface">
                      {c.subjectName}
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant font-mono-code text-[12px]">
                      {c.examDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono-code font-semibold text-tertiary">
                      {c.score}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-tertiary/15 text-tertiary font-mono-code font-bold text-[11px]">
                        {c.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Active Exam Deep Dive Section */}
      {activeSelectedExam && (
        <ExamDeepDive
          exam={activeSelectedExam}
          onUpdateTopics={handleUpdateTopics}
          onOpenLogSession={(exam) => {
            setSessionExamTarget(exam);
            setIsLogSessionModalOpen(true);
          }}
        />
      )}

      {/* 5. Modals */}
      <ExamModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        onSave={handleSaveExam}
        initialData={editingExam}
      />

      <LogSessionModal
        isOpen={isLogSessionModalOpen}
        onClose={() => setIsLogSessionModalOpen(false)}
        exam={sessionExamTarget}
        onSaveSession={handleSaveStudySession}
      />
    </div>
  );
}
