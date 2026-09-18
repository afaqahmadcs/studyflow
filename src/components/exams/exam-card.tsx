"use client";

import React from "react";
import {
  Calendar,
  MapPin,
  Clock,
  PieChart,
  CheckCircle2,
  ChevronRight,
  Edit2,
  Trash2,
} from "lucide-react";
import { ExamItem } from "@/types/exam";
import { cn } from "@/lib/utils";

interface ExamCardProps {
  exam: ExamItem;
  isSelected: boolean;
  onSelect: (exam: ExamItem) => void;
  onEdit: (exam: ExamItem) => void;
  onDelete: (id: string) => void;
}

export function ExamCard({
  exam,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: ExamCardProps) {
  // Determine border and color strip
  const stripColor =
    exam.status === "critical"
      ? "bg-error"
      : exam.status === "upcoming"
      ? "bg-secondary"
      : exam.status === "scheduled"
      ? "bg-primary"
      : "bg-tertiary";

  const badgeColor =
    exam.status === "critical"
      ? "text-error bg-error/10"
      : exam.status === "upcoming"
      ? "text-secondary bg-secondary/10"
      : exam.status === "scheduled"
      ? "text-primary bg-primary/10"
      : "text-tertiary bg-tertiary/10";

  const chipColor =
    exam.status === "critical"
      ? "bg-error/15 text-error"
      : exam.status === "upcoming"
      ? "bg-secondary/15 text-secondary"
      : "bg-surface-container-highest text-on-surface-variant";

  // Compute remaining days relative to examDate
  const examDateTime = new Date(`${exam.examDate}T${exam.startTime}:00`).getTime();
  const diffDays = Math.ceil((examDateTime - new Date().getTime()) / (1000 * 3600 * 24));
  const daysText =
    diffDays <= 0
      ? "Today"
      : diffDays === 1
      ? "Tomorrow"
      : `In ${diffDays} Days`;

  const masteredCount = exam.topics.filter((t) => t.mastered).length;
  const totalTopics = exam.topics.length;

  return (
    <div
      onClick={() => onSelect(exam)}
      className={cn(
        "cursor-pointer p-space-md rounded-xl transition-all shadow-sm flex flex-col justify-between gap-space-md relative overflow-hidden group border",
        isSelected
          ? "bg-surface-container shadow-md border-primary/40 ring-1 ring-primary/30"
          : "bg-surface-container-low hover:bg-surface-container border-white/[0.04]"
      )}
    >
      {/* Left Color Strip */}
      <div className={cn("absolute top-0 left-0 bottom-0 w-1.5", stripColor)} />

      <div>
        <div className="flex items-start justify-between gap-2 pl-2">
          <div>
            <span
              className={cn(
                "font-mono-code text-mono-code font-bold px-1.5 py-0.5 rounded uppercase text-[11px]",
                badgeColor
              )}
            >
              {exam.code} {exam.status === "critical" ? "Midterm" : "Exam"}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors mt-1 font-semibold">
              {exam.subjectName}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 text-[11px]",
                chipColor
              )}
            >
              {exam.status === "critical" && (
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
              )}
              {daysText}
            </span>

            {/* Quick Action Menu */}
            <div
              className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onEdit(exam)}
                title="Edit Exam"
                className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(exam.id)}
                title="Delete Exam"
                className="p-1 rounded text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="mt-space-md grid grid-cols-2 gap-2 text-body-sm text-on-surface-variant bg-surface-container-lowest/60 p-space-sm rounded-lg ml-2">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-4 h-4 text-outline flex-shrink-0" />
            <span className="truncate">
              {exam.examDate}, {exam.startTime}
            </span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-4 h-4 text-outline flex-shrink-0" />
            <span className="truncate">{exam.room}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-4 h-4 text-outline flex-shrink-0" />
            <span>{exam.durationMinutes} mins</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <PieChart className="w-4 h-4 text-outline flex-shrink-0" />
            <span>{exam.weightPercentage}% Weight</span>
          </div>
        </div>
      </div>

      {/* Readiness Telemetry */}
      <div className="flex flex-col gap-1.5 pl-2">
        <div className="flex items-center justify-between text-label-sm text-on-surface-variant">
          <span>Readiness Telemetry</span>
          <span className="font-mono-code text-on-surface font-semibold">
            {exam.preparationPercentage}%
          </span>
        </div>
        <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              exam.status === "critical"
                ? "bg-primary"
                : exam.status === "upcoming"
                ? "bg-secondary"
                : "bg-surface-variant"
            )}
            style={{ width: `${exam.preparationPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-body-sm pt-1">
          <span className="text-tertiary flex items-center gap-1 font-label-sm text-[12px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {masteredCount}/{totalTopics} Topics Mastered
          </span>
          <span className="font-label-sm text-primary group-hover:translate-x-0.5 transition-transform flex items-center text-[12px] font-medium">
            Inspect <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
