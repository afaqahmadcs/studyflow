"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Flag,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
} from "lucide-react";
import { ExamAnalyticsSummary, GoalAnalyticsSummary } from "@/types/analytics";

interface ExamGoalsDetailSectionProps {
  exams: ExamAnalyticsSummary;
  goals: GoalAnalyticsSummary;
}

export function ExamGoalsDetailSection({ exams, goals }: ExamGoalsDetailSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
      {/* Exam Preparation Breakdown (6 Columns) */}
      <div className="lg:col-span-6 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-error/15 text-error border border-error/20">
                <CalendarCheck className="w-4 h-4" />
              </span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                Exam Preparation Telemetry
              </h2>
            </div>
            <Link
              href="/exams"
              className="text-[12px] font-mono-code text-primary hover:text-primary-fixed flex items-center gap-1 transition-colors"
            >
              <span>Exams Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
            Real-time syllabus mastery countdown and revision readiness
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 my-space-md">
            <div className="p-space-sm rounded-lg bg-surface-container border border-white/[0.02]">
              <span className="text-[11px] text-outline font-mono-code block">Upcoming</span>
              <span className="font-headline-sm text-lg font-bold text-on-surface font-mono-code">
                {exams.upcomingCount} Exams
              </span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container border border-white/[0.02]">
              <span className="text-[11px] text-outline font-mono-code block">Avg Prep</span>
              <span className="font-headline-sm text-lg font-bold text-tertiary font-mono-code">
                {exams.averagePreparation}%
              </span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container border border-white/[0.02]">
              <span className="text-[11px] text-outline font-mono-code block">Next In</span>
              <span className="font-headline-sm text-lg font-bold text-secondary font-mono-code">
                {exams.nearestExamDaysRemaining} Days
              </span>
            </div>
          </div>

          {/* Upcoming Exam Rows */}
          {exams.upcomingExams.length === 0 ? (
            <div className="py-8 text-center text-outline text-body-sm">
              No upcoming exams registered.
            </div>
          ) : (
            <div className="space-y-2.5">
              {exams.upcomingExams.slice(0, 3).map((exam) => (
                <div
                  key={exam.id}
                  className="p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/[0.02]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-mono-code text-[11px] font-semibold">
                        {exam.code}
                      </span>
                      <span className="font-label-md text-sm font-semibold text-on-surface truncate">
                        {exam.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant font-mono-code mt-0.5">
                      <Clock className="w-3 h-3 text-outline" />
                      <span>{exam.examDate}</span>
                      <span>•</span>
                      <span>{exam.durationMinutes} mins</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <div className="w-24">
                      <div className="flex justify-between text-[10px] font-mono-code text-outline mb-0.5">
                        <span>Prep</span>
                        <span className="text-on-surface font-semibold">
                          {exam.preparationPercentage}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-surface-container-lowest overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${exam.preparationPercentage}%` }}
                        />
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-mono-code font-semibold whitespace-nowrap ${
                        exam.daysRemaining <= 4
                          ? "bg-error/15 text-error border border-error/20"
                          : "bg-surface-container-high text-secondary"
                      }`}
                    >
                      {exam.daysRemaining === 0 ? "Today" : `In ${exam.daysRemaining}d`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Goal Progress Breakdown (6 Columns) */}
      <div className="lg:col-span-6 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-tertiary/15 text-tertiary border border-tertiary/20">
                <Flag className="w-4 h-4" />
              </span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                Goal Progression &amp; Milestones
              </h2>
            </div>
            <Link
              href="/goals"
              className="text-[12px] font-mono-code text-primary hover:text-primary-fixed flex items-center gap-1 transition-colors"
            >
              <span>Goals Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
            Execution velocity across daily micro-targets and semester strategies
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 my-space-md">
            <div className="p-space-sm rounded-lg bg-surface-container border border-white/[0.02]">
              <span className="text-[11px] text-outline font-mono-code block">Completed</span>
              <span className="font-headline-sm text-lg font-bold text-tertiary font-mono-code">
                {goals.completedGoals} / {goals.totalGoals}
              </span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container border border-white/[0.02]">
              <span className="text-[11px] text-outline font-mono-code block">Active</span>
              <span className="font-headline-sm text-lg font-bold text-secondary font-mono-code">
                {goals.activeGoals} Goals
              </span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container border border-white/[0.02]">
              <span className="text-[11px] text-outline font-mono-code block">Success Rate</span>
              <span className="font-headline-sm text-lg font-bold text-primary font-mono-code">
                {goals.completionPercentage}%
              </span>
            </div>
          </div>

          {/* Categorical Progress Tracks */}
          <div className="space-y-3">
            {/* Daily */}
            <div className="p-3 rounded-lg bg-surface-container border border-white/[0.02]">
              <div className="flex items-center justify-between text-body-sm text-xs font-medium mb-1.5">
                <span className="text-on-surface flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Daily Micro-Targets
                </span>
                <span className="font-mono-code text-primary">
                  {goals.dailyCompleted} of {goals.dailyTotal} ({goals.dailyCompletionPercentage}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${goals.dailyCompletionPercentage}%` }}
                />
              </div>
            </div>

            {/* Weekly */}
            <div className="p-3 rounded-lg bg-surface-container border border-white/[0.02]">
              <div className="flex items-center justify-between text-body-sm text-xs font-medium mb-1.5">
                <span className="text-on-surface flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-secondary" /> Weekly Sprint Velocity
                </span>
                <span className="font-mono-code text-secondary">
                  {goals.weeklyVelocityPercentage}% Pace
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                  style={{ width: `${goals.weeklyVelocityPercentage}%` }}
                />
              </div>
            </div>

            {/* Academic Strategic */}
            <div className="p-3 rounded-lg bg-surface-container border border-white/[0.02]">
              <div className="flex items-center justify-between text-body-sm text-xs font-medium mb-1.5">
                <span className="text-on-surface flex items-center gap-1.5">
                  <Flag className="w-3.5 h-3.5 text-tertiary" /> Semester Strategic Milestones
                </span>
                <span className="font-mono-code text-tertiary">
                  {goals.strategicMilestonePercentage}% Mastery
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                <div
                  className="h-full rounded-full bg-tertiary transition-all"
                  style={{ width: `${goals.strategicMilestonePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
