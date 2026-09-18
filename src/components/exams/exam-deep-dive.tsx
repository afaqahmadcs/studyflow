"use client";

import React, { useState } from "react";
import {
  Download,
  Users,
  PlayCircle,
  CheckCircle,
  FileText,
  Edit3,
  ExternalLink,
  HelpCircle,
  Plus,
  Verified,
} from "lucide-react";
import { ExamItem, ExamTopic } from "@/types/exam";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface ExamDeepDiveProps {
  exam: ExamItem;
  onUpdateTopics: (examId: string, updatedTopics: ExamTopic[]) => void;
  onOpenLogSession: (exam: ExamItem) => void;
}

export function ExamDeepDive({
  exam,
  onUpdateTopics,
  onOpenLogSession,
}: ExamDeepDiveProps) {
  const { toast } = useToast();
  const [drillActive, setDrillActive] = useState(false);

  // Compute live mastery from topics
  const totalTopics = exam.topics.length;
  const masteredTopics = exam.topics.filter((t) => t.mastered).length;
  const remainingTopics = totalTopics - masteredTopics;
  const masteryPercentage =
    totalTopics > 0 ? Math.round((masteredTopics / totalTopics) * 100) : 0;

  // Calculate circular SVG dashoffset (circumference = 2 * PI * 40 = 251.2)
  const circumference = 251.2;
  const strokeDashoffset =
    circumference - (masteryPercentage / 100) * circumference;

  // Total study time logged in minutes
  const totalStudyMinutes = exam.studySessions.reduce(
    (acc, s) => acc + s.durationMinutes,
    0
  );
  const totalHours = Math.floor(totalStudyMinutes / 60);
  const totalRemMins = totalStudyMinutes % 60;

  const handleToggleTopic = (topicId: string) => {
    const updated = exam.topics.map((t) => {
      if (t.id === topicId) {
        const nextMastered = !t.mastered;
        return {
          ...t,
          mastered: nextMastered,
          tag: nextMastered ? "Mastered" : "In Progress 50%",
        };
      }
      return t;
    });

    onUpdateTopics(exam.id, updated);
    toast({
      title: "Syllabus Checklist Updated",
      description: `Readiness recalculated across ${updated.length} syllabus modules.`,
      type: "info",
    });
  };

  const handleStartDrill = () => {
    setDrillActive(!drillActive);
    toast({
      title: drillActive ? "Drill Paused" : "25m Pomodoro Drill Started",
      description: `Focus timer locked on ${exam.subjectName} high-yield topics.`,
      type: "success",
    });
  };

  const handleGenerateQuiz = () => {
    toast({
      title: "Practice Drill Generated",
      description: `Synthesized 10 mock evaluation problems for ${exam.code}.`,
      type: "info",
    });
  };

  return (
    <section className="p-space-lg rounded-2xl bg-surface-container border border-white/[0.06] shadow-md flex flex-col gap-space-lg">
      {/* Deep Dive Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md border-b border-white/[0.06]">
        <div className="flex items-start gap-space-md">
          <div className="w-14 h-14 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-xl font-bold flex-shrink-0 shadow-md">
            {exam.code.slice(0, 2)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono-code text-mono-code font-bold text-primary px-2 py-0.5 rounded bg-primary/10 uppercase text-[11px]">
                {exam.code} EVALUATION
              </span>
              <span className="px-2 py-0.5 rounded bg-error/15 text-error font-label-sm text-label-sm font-semibold flex items-center gap-1 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-error" />
                {exam.status === "critical"
                  ? "Midterm Assessment"
                  : "Scheduled Exam"}
              </span>
              {exam.rulesNote && (
                <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-medium text-[11px]">
                  {exam.rulesNote}
                </span>
              )}
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              {exam.title || `${exam.subjectName} Evaluation Deep Dive`}
            </h2>
            <p className="text-on-surface-variant font-body-md mt-0.5 text-[13px]">
              {exam.examDate} • {exam.startTime} – {exam.endTime} (
              {exam.durationMinutes} Mins) • Venue: {exam.room}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            onClick={() =>
              toast({
                title: "Syllabus Downloaded",
                description: `Official PDF curriculum specs for ${exam.code}.`,
              })
            }
            className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors border border-white/[0.04]"
          >
            <Download className="w-4 h-4 text-outline" />
            <span>Syllabus PDF</span>
          </button>
          <button
            onClick={() =>
              toast({
                title: "Study Group Active",
                description: "4 peers reviewing live in Discord channel #cs-drill.",
              })
            }
            className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors border border-white/[0.04]"
          >
            <Users className="w-4 h-4 text-secondary" />
            <span>Study Group (4)</span>
          </button>
          <button
            onClick={handleStartDrill}
            className={cn(
              "px-space-md py-2 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_16px_rgba(192,193,255,0.3)]",
              drillActive
                ? "bg-tertiary text-on-tertiary"
                : "bg-primary text-on-primary hover:opacity-90"
            )}
          >
            <PlayCircle className="w-4 h-4" />
            <span>{drillActive ? "Drill In Progress..." : "Start Pomodoro Drill"}</span>
          </button>
        </div>
      </div>

      {/* Deep Dive 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Mastery Gauge + Logged Study Sessions */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {/* Circular Mastery Index */}
          <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm flex flex-col items-center text-center">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold mb-space-sm">
              Mastery Index Telemetry
            </span>

            <div className="relative w-44 h-44 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="text-surface-container-highest"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-primary transition-all duration-700"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display-lg text-display-lg text-on-surface font-bold leading-none">
                  {masteryPercentage}%
                </span>
                <span className="font-label-sm text-label-sm text-tertiary font-semibold mt-1">
                  {masteryPercentage >= 75
                    ? "Ready for Exam"
                    : masteryPercentage >= 50
                    ? "Moderate Prep"
                    : "Needs Drill"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full mt-2 text-left">
              <div className="p-2 rounded bg-surface-container-lowest">
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  Mastered
                </div>
                <div className="font-headline-sm text-headline-sm text-tertiary font-bold">
                  {masteredTopics} Modules
                </div>
              </div>
              <div className="p-2 rounded bg-surface-container-lowest">
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  Remaining
                </div>
                <div className="font-headline-sm text-headline-sm text-error font-bold">
                  {remainingTopics} Modules
                </div>
              </div>
            </div>

            <p className="text-body-sm text-on-surface-variant mt-space-sm text-left w-full text-[12px] leading-relaxed">
              Simulation models show 91% expected score if remaining modules are
              revised prior to evaluation day.
            </p>
          </div>

          {/* Logged Study Sessions */}
          <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                Logged Study Sessions
              </h4>
              <span className="font-mono-code text-primary text-[12px]">
                {totalHours}h {totalRemMins.toString().padStart(2, "0")}m Total
              </span>
            </div>

            <div className="flex flex-col gap-space-xs mt-1">
              {exam.studySessions.length === 0 ? (
                <div className="p-3 rounded-lg bg-surface-container-lowest text-center text-on-surface-variant text-body-sm">
                  No sessions logged yet. Log your first focus session below!
                </div>
              ) : (
                exam.studySessions.map((s) => {
                  const hrs = Math.floor(s.durationMinutes / 60);
                  const mins = s.durationMinutes % 60;
                  return (
                    <div
                      key={s.id}
                      className="p-2.5 rounded-lg bg-surface-container-lowest flex items-start justify-between gap-2"
                    >
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold text-[13px]">
                          {s.title}
                        </span>
                        <span className="text-body-sm text-on-surface-variant text-[11px]">
                          {s.date} • {s.type}
                        </span>
                      </div>
                      <span className="font-mono-code text-secondary font-medium px-2 py-0.5 rounded bg-secondary/10 whitespace-nowrap text-[11px]">
                        {hrs}h {mins > 0 ? `${mins}m` : "00m"}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            <button
              onClick={() => onOpenLogSession(exam)}
              className="w-full py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-colors text-center mt-1 flex items-center justify-center gap-1.5 border border-white/[0.04]"
            >
              <Plus className="w-4 h-4 text-primary" />
              <span>+ Log Quick Session</span>
            </button>
          </div>
        </div>

        {/* Right Column: Syllabus Mastery Checklist + Cheatsheet Notes */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          {/* Syllabus Mastery Checklist */}
          <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Curriculum Syllabus Mastery Checklist
                </h3>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {masteredTopics} of {totalTopics} Completed ({masteryPercentage}%)
              </span>
            </div>

            <div className="flex flex-col gap-space-xs" id="syllabus-list">
              {exam.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-3 rounded-lg bg-surface-container-lowest flex items-center justify-between gap-space-sm transition-colors hover:bg-surface-container-high/30"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={topic.mastered}
                      onChange={() => handleToggleTopic(topic.id)}
                      className="w-4 h-4 rounded bg-surface-container-high text-primary focus:ring-0 cursor-pointer accent-primary"
                    />
                    <div>
                      <div
                        className={cn(
                          "font-body-md text-body-md text-on-surface transition-all",
                          topic.mastered
                            ? "line-through text-outline font-medium"
                            : "font-semibold text-on-surface"
                        )}
                      >
                        {topic.name}
                      </div>
                      <div className="text-body-sm text-outline text-[12px]">
                        {topic.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {topic.progress && (
                      <div className="w-16 bg-surface-container-highest h-1.5 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="bg-secondary h-full rounded-full"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    )}
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded font-mono-code text-mono-code font-medium whitespace-nowrap text-[11px]",
                        topic.mastered
                          ? "bg-tertiary/15 text-tertiary"
                          : topic.tag?.includes("Progress")
                          ? "bg-secondary/15 text-secondary"
                          : "bg-error/15 text-error"
                      )}
                    >
                      {topic.tag || (topic.mastered ? "Mastered" : "Pending")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formula Cheatsheet & Quick Derivations */}
          <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Formula Cheatsheet & Quick Derivations
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    toast({
                      title: "Cheatsheet Editor",
                      description: "Editable LaTeX & Markdown notes pane unlocked.",
                    })
                  }
                  className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 border border-white/[0.04]"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Quick Edit
                </button>
                <button
                  onClick={() =>
                    toast({
                      title: "Full Cheatsheet",
                      description: "Opened high-resolution formula compilation sheet.",
                    })
                  }
                  className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-variant text-primary font-label-sm text-label-sm transition-colors flex items-center gap-1 border border-white/[0.04]"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Full View
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              {exam.cheatsheetNotes.map((c, idx) => (
                <div
                  key={idx}
                  className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between text-label-sm font-label-sm">
                    <span className="text-on-surface font-semibold">
                      {c.title}
                    </span>
                    <span className="font-mono-code text-primary text-[11px]">
                      Verified Formula
                    </span>
                  </div>
                  <div className="font-mono-code text-mono-code bg-surface-container-high p-2 rounded text-on-surface text-[12px] leading-relaxed border border-white/[0.04]">
                    {c.formula}
                  </div>
                  <div className="text-body-sm text-on-surface-variant text-[11px] leading-normal">
                    {c.explanation}
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Footer & Practice Quiz */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm pt-2 bg-surface-container-lowest/40 p-space-sm rounded-lg border border-white/[0.02]">
              <div className="flex items-center gap-2 text-body-sm text-on-surface-variant text-[12px]">
                <Verified className="w-4 h-4 text-tertiary flex-shrink-0" />
                <span>
                  {exam.verifiedNote ||
                    "Approved by Course Coordinator for examination hall reference."}
                </span>
              </div>
              <button
                onClick={handleGenerateQuiz}
                className="px-space-md py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-label-md text-label-md font-semibold transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Generate Practice Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
