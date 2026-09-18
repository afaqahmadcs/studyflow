"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchPaletteModal } from "@/components/modals/search-palette-modal";
import { NotificationsPopover } from "@/components/modals/notifications-popover";
import { QuickActionModal, QuickActionType } from "@/components/modals/quick-action-modal";
import { useToast } from "@/components/ui/toast";

import { AnalyticsHeader } from "@/components/analytics/analytics-header";
import { AnalyticsHeroBento } from "@/components/analytics/analytics-hero-bento";
import { WeeklyStudyChart } from "@/components/analytics/weekly-study-chart";
import { FocusVelocityCard } from "@/components/analytics/focus-velocity-card";
import { CourseReadinessMatrix } from "@/components/analytics/course-readiness-matrix";
import { GradeDistributionCard } from "@/components/analytics/grade-distribution-card";
import { ConcentrationHeatmap } from "@/components/analytics/concentration-heatmap";
import { AiAdvisoryCard } from "@/components/analytics/ai-advisory-card";
import { ExamGoalsDetailSection } from "@/components/analytics/exam-goals-detail-section";

import { computeAnalyticsPayload, generateAnalyticsCsv } from "@/lib/analytics-engine";
import { AnalyticsScope, AnalyticsPayload } from "@/types/analytics";

// Initial datasets for fallback
import {
  INITIAL_STUDY_SESSIONS,
  INITIAL_STUDY_STATS,
  INITIAL_SUBJECT_STUDY_STATS,
} from "@/data/study-data";
import { INITIAL_ASSIGNMENTS } from "@/data/assignments-data";
import {
  INITIAL_SUBJECT_ATTENDANCE,
  INITIAL_ATTENDANCE_LOGS,
} from "@/data/attendance-data";
import { INITIAL_EXAMS } from "@/data/exams-data";
import { INITIAL_GOALS } from "@/data/goals-data";

import { StudySessionRecord, StudyStats, SubjectStudyStat } from "@/types/study";
import { AssignmentItem } from "@/types/assignment";
import { SubjectAttendance, AttendanceLogRecord } from "@/types/attendance";
import { ExamItem } from "@/types/exam";
import { Goal } from "@/types/goals";

export default function AnalyticsPage() {
  const { toast } = useToast();

  // Filters state
  const [currentScope, setCurrentScope] = useState<AnalyticsScope>("semester");
  const [selectedCourse, setSelectedCourse] = useState<string>("ALL");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // App shell modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState<QuickActionType>(null);

  // Raw Application Datasets State
  const [studySessions, setStudySessions] = useState<StudySessionRecord[]>(INITIAL_STUDY_SESSIONS);
  const [studyStats, setStudyStats] = useState<StudyStats>(INITIAL_STUDY_STATS);
  const [subjectStudyStats, setSubjectStudyStats] = useState<SubjectStudyStat[]>(INITIAL_SUBJECT_STUDY_STATS);
  const [assignments, setAssignments] = useState<AssignmentItem[]>(INITIAL_ASSIGNMENTS);
  const [subjectsAttendance, setSubjectsAttendance] = useState<SubjectAttendance[]>(INITIAL_SUBJECT_ATTENDANCE);
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLogRecord[]>(INITIAL_ATTENDANCE_LOGS);
  const [exams, setExams] = useState<ExamItem[]>(INITIAL_EXAMS);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

  // Load from localStorage function
  const loadDataFromStorage = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const savedSessions = localStorage.getItem("command_center_study_sessions");
      if (savedSessions) setStudySessions(JSON.parse(savedSessions));

      const savedStudyStats = localStorage.getItem("command_center_study_stats");
      if (savedStudyStats) setStudyStats(JSON.parse(savedStudyStats));

      const savedSubjStats = localStorage.getItem("command_center_subject_study_stats");
      if (savedSubjStats) setSubjectStudyStats(JSON.parse(savedSubjStats));

      const savedAsg = localStorage.getItem("command_center_assignments");
      if (savedAsg) setAssignments(JSON.parse(savedAsg));

      const savedAtt = localStorage.getItem("command_center_subjects_attendance");
      if (savedAtt) setSubjectsAttendance(JSON.parse(savedAtt));

      const savedLogs = localStorage.getItem("command_center_attendance_logs");
      if (savedLogs) setAttendanceLogs(JSON.parse(savedLogs));

      const savedExams = localStorage.getItem("command_center_exams");
      if (savedExams) setExams(JSON.parse(savedExams));

      const savedGoals = localStorage.getItem("command_center_goals");
      if (savedGoals) setGoals(JSON.parse(savedGoals));
    } catch {
      // In case of corrupt storage, gracefully fall back to existing state
    }
  }, []);

  // Initial mount load and multi-tab storage event synchronization
  useEffect(() => {
    loadDataFromStorage();

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key?.startsWith("command_center_")
      ) {
        loadDataFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadDataFromStorage]);

  // Global hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute analytics dynamically from active application datasets
  const analyticsPayload: AnalyticsPayload = useMemo(() => {
    return computeAnalyticsPayload({
      studySessions,
      studyStats,
      subjectStudyStats,
      assignments,
      subjectsAttendance,
      attendanceLogs,
      exams,
      goals,
      scope: currentScope,
      courseFilter: selectedCourse,
    });
  }, [
    studySessions,
    studyStats,
    subjectStudyStats,
    assignments,
    subjectsAttendance,
    attendanceLogs,
    exams,
    goals,
    currentScope,
    selectedCourse,
  ]);

  // Manual Refresh Handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    loadDataFromStorage();
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Telemetry Recalculated",
        description: "Analytics synced with live sessions, coursework, and evaluations.",
        type: "info",
      });
    }, 450);
  };

  // Real CSV Export Handler
  const handleExportCsv = () => {
    try {
      const csvData = generateAnalyticsCsv(analyticsPayload);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const dateStr = new Date().toISOString().split("T")[0];
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `student_command_center_analytics_report_${dateStr}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Analytics CSV Exported",
        description: "Saved full academic telemetry report to your device.",
        type: "success",
      });
    } catch {
      toast({
        title: "Export Failed",
        description: "An error occurred while generating the CSV report.",
        type: "error",
      });
    }
  };

  // PDF / Print Handler
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="flex h-screen bg-background text-on-surface overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Drawer */}
      <MobileNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onOpenQuickAction={() => setQuickActionType("assignment")}
          onToggleNotifications={() => setNotificationsOpen(true)}
          unreadCount={3}
        />

        <main className="flex-1 overflow-y-auto p-space-lg pt-4 space-y-space-xl pb-24">
          {/* Header with Title, Scope Pills, Course Filter, and Export Triggers */}
          <AnalyticsHeader
            currentScope={currentScope}
            onScopeChange={setCurrentScope}
            selectedCourse={selectedCourse}
            onCourseChange={setSelectedCourse}
            onExportCsv={handleExportCsv}
            onPrintReport={handlePrintReport}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />

          {/* Key Metric Hero Cards (4-Column Bento) */}
          <AnalyticsHeroBento payload={analyticsPayload} />

          {/* Primary Analytical Grid (12 Columns) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
            {/* Chart 1: 7-Day Study Volume vs Target (7 Columns) */}
            <WeeklyStudyChart
              dailyVolume={analyticsPayload.study.dailyStudyVolume}
              targetDailyHours={analyticsPayload.study.targetDailyHours}
              daysMeetingTarget={analyticsPayload.study.daysMeetingTargetCount}
              totalWeeklyHours={analyticsPayload.study.weeklyHours}
            />

            {/* Chart 2: Cognitive Focus Velocity Multi-Week Sparkline (5 Columns) */}
            <FocusVelocityCard
              peakEfficiency={analyticsPayload.study.peakFocusEfficiency}
              medianSessionHours={Number((analyticsPayload.study.medianSessionMinutes / 60 * 4.5).toFixed(1))}
              weeksData={analyticsPayload.study.focusTrendWeeks}
            />
          </section>

          {/* Secondary Split Panel: Course Performance Matrix & Grade Distribution */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
            {/* Chart 3: Course Performance & Readiness Matrix (8 Columns) */}
            <CourseReadinessMatrix courses={analyticsPayload.exams.courseReadiness} />

            {/* Chart 4: Scored Grade Tier Distribution (4 Columns) */}
            <GradeDistributionCard
              totalScoredCount={analyticsPayload.assignments.total}
              medianScore={analyticsPayload.assignments.medianScore}
              gradeTiers={analyticsPayload.assignments.gradeTiers}
            />
          </section>

          {/* Tertiary Split Panel: Concentration Heatmap & AI Optimization Matrix */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
            {/* Chart 5: Study Habit Heatmap (7 Columns) */}
            <ConcentrationHeatmap />

            {/* Chart 6: AI Cognitive Advisory Directives (5 Columns) */}
            <AiAdvisoryCard
              directives={analyticsPayload.advisoryDirectives}
              lastUpdated={analyticsPayload.lastUpdated}
            />
          </section>

          {/* Fourth Section: Dedicated Exam Preparation & Goal Progression Breakdown */}
          <ExamGoalsDetailSection
            exams={analyticsPayload.exams}
            goals={analyticsPayload.goals}
          />
        </main>
      </div>

      {/* Global Modals */}
      <SearchPaletteModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectAction={(actionType) => {
          setSearchOpen(false);
          setQuickActionType(actionType);
        }}
      />

      <NotificationsPopover
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <QuickActionModal
        isOpen={quickActionType !== null}
        type={quickActionType}
        onClose={() => setQuickActionType(null)}
      />
    </div>
  );
}
