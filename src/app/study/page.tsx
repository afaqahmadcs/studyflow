"use client";

import React, { useState, useEffect } from "react";
import {
  StudySessionRecord,
  StudyStats,
  SubjectStudyStat,
  TimerSettings,
  TimerMode,
} from "@/types/study";
import {
  INITIAL_STUDY_SESSIONS,
  INITIAL_SUBJECT_STUDY_STATS,
  INITIAL_STUDY_STATS,
  DEFAULT_TIMER_SETTINGS,
  AVAILABLE_SUBJECTS,
} from "@/data/study-data";
import { StudyCockpitHeader } from "@/components/study/study-cockpit-header";
import { StudyTimerDial } from "@/components/study/study-timer-dial";
import { StudyTelemetryGrid } from "@/components/study/study-telemetry-grid";
import { StudySessionHistory } from "@/components/study/study-session-history";
import { SessionConfigModal } from "@/components/study/session-config-modal";
import { useToast } from "@/components/ui/toast";
import { Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudyPage() {
  const { toast } = useToast();

  // 1. Sessions State
  const [sessions, setSessions] = useState<StudySessionRecord[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_study_sessions");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_STUDY_SESSIONS;
  });

  // 2. Telemetry Stats State
  const [stats, setStats] = useState<StudyStats>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_study_stats");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_STUDY_STATS;
  });

  // 3. Subject-wise Stats State
  const [subjectStats, setSubjectStats] = useState<SubjectStudyStat[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_subject_study_stats");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_SUBJECT_STUDY_STATS;
  });

  // 4. Timer Configuration State
  const [timerSettings, setTimerSettings] = useState<TimerSettings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_timer_settings");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return DEFAULT_TIMER_SETTINGS;
  });

  // Selected subject & objective
  const [selectedSubject, setSelectedSubject] = useState<{
    code: string;
    name: string;
  }>({
    code: AVAILABLE_SUBJECTS[0].code,
    name: AVAILABLE_SUBJECTS[0].name,
  });

  const [objective, setObjective] = useState("Raft Consensus Log Trace");
  const [isZenMode, setIsZenMode] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("command_center_study_sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("command_center_study_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("command_center_subject_study_stats", JSON.stringify(subjectStats));
  }, [subjectStats]);

  useEffect(() => {
    localStorage.setItem("command_center_timer_settings", JSON.stringify(timerSettings));
  }, [timerSettings]);

  // Session Completion Handler
  const handleFinishSession = ({
    durationMinutes,
    mode,
    subjectCode,
    subjectName,
    objective: sessionObjective,
    startTime,
    endTime,
    date,
  }: {
    durationMinutes: number;
    mode: TimerMode;
    subjectCode: string;
    subjectName: string;
    objective: string;
    startTime?: string;
    endTime?: string;
    date?: string;
  }) => {
    const nowTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const sTime = startTime || nowTime;
    const eTime = endTime || nowTime;
    const sessionDate = date || "Today";
    const xpEarned = Math.max(25, Math.round(durationMinutes * 1.5));

    // Create session record
    const newSession: StudySessionRecord = {
      id: `sess-${Date.now()}`,
      subjectCode,
      subjectName,
      objective: sessionObjective || "Focused Study Block",
      durationMinutes,
      mode,
      date: sessionDate,
      startTime: sTime,
      endTime: eTime,
      timestamp: `${sessionDate}, ${sTime} - ${eTime}`,
      xpEarned,
      tasksVerified: Math.max(1, Math.floor(durationMinutes / 20)),
      tags: [`#${subjectCode}`, `#${mode.replace("_", "")}`],
      notes: `Completed focused revision session on ${sessionObjective || subjectName}.`,
    };

    setSessions((prev) => [newSession, ...prev]);

    // Update global telemetry statistics
    setStats((prev) => {
      const newToday = prev.todayMinutes + durationMinutes;
      const newWeekly = prev.weeklyMinutes + durationMinutes;
      return {
        ...prev,
        todayMinutes: newToday,
        weeklyMinutes: newWeekly,
        totalSessions: prev.totalSessions + 1,
      };
    });

    // Update subject-wise distribution
    setSubjectStats((prev) => {
      const hoursAdded = durationMinutes / 60;
      const updated = prev.map((s) => {
        if (s.code === subjectCode) {
          return { ...s, hours: Number((s.hours + hoursAdded).toFixed(1)) };
        }
        return s;
      });

      const totalHours = updated.reduce((acc, s) => acc + s.hours, 0);
      return updated.map((s) => ({
        ...s,
        percentage: totalHours > 0 ? Math.round((s.hours / totalHours) * 100) : 0,
      }));
    });

    toast({
      title: "Focus Session Recorded!",
      description: `+${xpEarned} Focus XP allocated to ${subjectName} (${durationMinutes}m).`,
      type: "success",
    });
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast({
      title: "Session Removed",
      description: "Historical telemetry record deleted.",
      type: "info",
    });
  };

  return (
    <div className="flex flex-col w-full space-y-space-lg p-space-lg max-w-7xl mx-auto">
      {/* Zen Mode Exit Overlay Bar */}
      {isZenMode && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in">
          <button
            onClick={() => setIsZenMode(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-highest/90 backdrop-blur-md border border-white/[0.1] text-on-surface shadow-2xl hover:bg-surface-bright transition-all font-label-md text-[13px]"
          >
            <Minimize2 className="w-4 h-4 text-primary" />
            <span>Exit Zen Mode</span>
          </button>
        </div>
      )}

      {/* 1. Header & Controls */}
      {!isZenMode && (
        <StudyCockpitHeader
          streakDays={stats.currentStreakDays}
          currentSubject={selectedSubject.name}
          isZenMode={isZenMode}
          onToggleZenMode={() => setIsZenMode(true)}
          onOpenSettings={() => setIsConfigModalOpen(true)}
        />
      )}

      {/* 2. Main Dual Cockpit Bento */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        {/* Left Hero Dial Module */}
        <div
          className={cn(
            "transition-all duration-300",
            isZenMode
              ? "xl:col-span-12 max-w-2xl mx-auto w-full py-8"
              : "xl:col-span-7"
          )}
        >
          <StudyTimerDial
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
            objective={objective}
            onChangeObjective={setObjective}
            onFinishSession={handleFinishSession}
          />
        </div>

        {/* Right Telemetry & Metrics Module */}
        {!isZenMode && (
          <div className="xl:col-span-5 flex flex-col space-y-space-md">
            <StudyTelemetryGrid stats={stats} subjectStats={subjectStats} />
          </div>
        )}
      </div>

      {/* 3. Session History & Telemetry Feed */}
      {!isZenMode && (
        <StudySessionHistory
          sessions={sessions}
          onDeleteSession={handleDeleteSession}
        />
      )}

      {/* 4. Configuration Modal */}
      <SessionConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        settings={timerSettings}
        onSaveSettings={(newSettings) => {
          setTimerSettings(newSettings);
          toast({
            title: "Settings Saved",
            description: "Study session parameters updated.",
            type: "success",
          });
        }}
      />
    </div>
  );
}
