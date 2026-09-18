export type TimerMode = "pomodoro" | "short_break" | "long_break" | "deep_flow";
export type TimerState = "idle" | "running" | "paused";

export interface StudySessionRecord {
  id: string;
  subjectCode: string;       // e.g. "CS401"
  subjectName: string;       // e.g. "Distributed Systems"
  objective: string;         // e.g. "Vector Clocks & Causality proofs"
  durationMinutes: number;   // e.g. 50
  mode: TimerMode;
  date: string;              // "Today" or "2025-10-27"
  timestamp: string;         // "Today, 10:15 AM"
  xpEarned: number;          // 80
  tags?: string[];
  tasksVerified?: number;
  notes?: string;
}

export interface SubjectStudyStat {
  code: string;
  name: string;
  hours: number;
  percentage: number;
  color: string;
  subtitle?: string;
}

export interface StudyStats {
  todayMinutes: number;
  weeklyMinutes: number;
  totalSessions: number;
  currentStreakDays: number;
  personalBestStreakDays: number;
  cognitivePeakWindow: string;
  attentionIndex: number;    // e.g. 94.2
}

export interface TimerSettings {
  pomodoroMinutes: number;   // 25
  shortBreakMinutes: number; // 5
  longBreakMinutes: number;  // 15
  deepFlowMinutes: number;   // 50
  autoResume: boolean;
  soundAlerts: boolean;
}
