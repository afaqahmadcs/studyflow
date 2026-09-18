import { AssignmentItem } from "@/types/assignment";
import { SubjectAttendance, AttendanceLogRecord, CheckInSlot } from "@/types/attendance";
import { ExamItem } from "@/types/exam";
import { Goal } from "@/types/goals";
import { Note } from "@/types/notes";
import { StudySessionRecord, StudyStats, SubjectStudyStat, TimerSettings } from "@/types/study";
import { ClassItem } from "@/types/timetable";
import {
  AppSettings,
  ApplicationBackup,
  StorageQuotaInfo,
  UserProfileSettings,
} from "@/types/settings";

// Initial datasets for factory fallback
import { INITIAL_ASSIGNMENTS } from "@/data/assignments-data";
import {
  INITIAL_SUBJECT_ATTENDANCE,
  INITIAL_ATTENDANCE_LOGS,
  INITIAL_CHECKIN_SLOTS,
} from "@/data/attendance-data";
import { INITIAL_EXAMS } from "@/data/exams-data";
import { INITIAL_CLASSES } from "@/data/timetable-data";
import {
  INITIAL_STUDY_SESSIONS,
  INITIAL_STUDY_STATS,
  INITIAL_SUBJECT_STUDY_STATS,
  DEFAULT_TIMER_SETTINGS,
} from "@/data/study-data";
import { INITIAL_GOALS } from "@/data/goals-data";
import { INITIAL_NOTES } from "@/data/notes-data";
import { STUDENT_PROFILE } from "@/data/student-data";

export const STORAGE_KEYS = {
  ASSIGNMENTS: "command_center_assignments",
  EXAMS: "command_center_exams",
  ATTENDANCE_SUBJECTS: "command_center_subjects_attendance",
  ATTENDANCE_LOGS: "command_center_attendance_logs",
  ATTENDANCE_SLOTS: "command_center_checkin_slots",
  TIMETABLE: "command_center_timetable",
  STUDY_SESSIONS: "command_center_study_sessions",
  STUDY_STATS: "command_center_study_stats",
  STUDY_SUBJECT_STATS: "command_center_subject_study_stats",
  TIMER_SETTINGS: "command_center_timer_settings",
  GOALS: "command_center_goals",
  NOTES: "command_center_notes",
  SETTINGS: "command_center_settings",
  PROFILE: "command_center_profile",
  THEME: "scc-theme",
} as const;

export const DEFAULT_USER_PROFILE: UserProfileSettings = {
  name: STUDENT_PROFILE.name || "Afaq Ahmad",
  studentId: "2022-CS-409",
  email: "afaq.ahmad@university.edu",
  major: "Computer Science & Engineering",
  academicYear: "Junior • Spring Term 2025",
  targetGpa: 3.9,
  currentGpa: STUDENT_PROFILE.gpa || 3.86,
  avatarUrl: STUDENT_PROFILE.avatar || "/avatar.png",
  department: "School of Computing & Data Sciences",
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  profile: DEFAULT_USER_PROFILE,
  appearance: {
    theme: "dark",
    accentColor: "indigo",
    density: "standard",
    baseTextScale: 2, // 14px default
  },
  notifications: {
    classStartReminders: true,
    assignmentDeadlineAlerts: true,
    attendanceThresholdWarnings: true,
    dailyMorningBriefing: false,
    examCountdownNudges: true,
    goalPaceReminders: true,
    soundAlerts: true,
  },
  academic: {
    mandatoryAttendanceCutoff: 80.0,
    defaultStudyDurationMinutes: 50,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    weeklyStudyTargetHours: 30.0,
    weekStartsOn: "monday",
    registeredCourses: [
      { code: "CS401", name: "Distributed Systems", instructor: "Prof. S. Vance", credits: 4, color: "bg-primary" },
      { code: "CS450", name: "Operating Systems", instructor: "Prof. D. Keller", credits: 4, color: "bg-secondary" },
      { code: "CS320", name: "Database Internals", instructor: "Prof. M. Ray", credits: 3, color: "bg-primary-container" },
      { code: "MATH310", name: "Linear Algebra", instructor: "Prof. A. Thorne", credits: 4, color: "bg-tertiary" },
    ],
  },
  lastUpdated: new Date().toISOString(),
};

/**
 * Primitives for SSR-safe and JSON-safe localStorage access
 */
export function safeGet<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[Storage] Failed to parse key "${key}", using default`, err);
    return defaultValue;
  }
}

export function safeSet<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
    return true;
  } catch (err) {
    console.error(`[Storage] Failed to write key "${key}"`, err);
    return false;
  }
}

export function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error(`[Storage] Failed to remove key "${key}"`, err);
  }
}

// ============================================================================
// Strongly-Typed Module Accessors
// ============================================================================

// Assignments
export const getAssignments = (): AssignmentItem[] =>
  safeGet<AssignmentItem[]>(STORAGE_KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS);

export const saveAssignments = (items: AssignmentItem[]): boolean =>
  safeSet(STORAGE_KEYS.ASSIGNMENTS, items);

// Exams
export const getExams = (): ExamItem[] =>
  safeGet<ExamItem[]>(STORAGE_KEYS.EXAMS, INITIAL_EXAMS);

export const saveExams = (items: ExamItem[]): boolean =>
  safeSet(STORAGE_KEYS.EXAMS, items);

// Attendance
export const getAttendanceSubjects = (): SubjectAttendance[] =>
  safeGet<SubjectAttendance[]>(STORAGE_KEYS.ATTENDANCE_SUBJECTS, INITIAL_SUBJECT_ATTENDANCE);

export const saveAttendanceSubjects = (items: SubjectAttendance[]): boolean =>
  safeSet(STORAGE_KEYS.ATTENDANCE_SUBJECTS, items);

export const getAttendanceLogs = (): AttendanceLogRecord[] =>
  safeGet<AttendanceLogRecord[]>(STORAGE_KEYS.ATTENDANCE_LOGS, INITIAL_ATTENDANCE_LOGS);

export const saveAttendanceLogs = (items: AttendanceLogRecord[]): boolean =>
  safeSet(STORAGE_KEYS.ATTENDANCE_LOGS, items);

export const getAttendanceSlots = (): CheckInSlot[] =>
  safeGet<CheckInSlot[]>(STORAGE_KEYS.ATTENDANCE_SLOTS, INITIAL_CHECKIN_SLOTS);

export const saveAttendanceSlots = (items: CheckInSlot[]): boolean =>
  safeSet(STORAGE_KEYS.ATTENDANCE_SLOTS, items);

// Timetable
export const getTimetable = (): ClassItem[] =>
  safeGet<ClassItem[]>(STORAGE_KEYS.TIMETABLE, INITIAL_CLASSES);

export const saveTimetable = (items: ClassItem[]): boolean =>
  safeSet(STORAGE_KEYS.TIMETABLE, items);

// Study Sessions & Stats
export const getStudySessions = (): StudySessionRecord[] =>
  safeGet<StudySessionRecord[]>(STORAGE_KEYS.STUDY_SESSIONS, INITIAL_STUDY_SESSIONS);

export const saveStudySessions = (items: StudySessionRecord[]): boolean =>
  safeSet(STORAGE_KEYS.STUDY_SESSIONS, items);

export const getStudyStats = (): StudyStats =>
  safeGet<StudyStats>(STORAGE_KEYS.STUDY_STATS, INITIAL_STUDY_STATS);

export const saveStudyStats = (stats: StudyStats): boolean =>
  safeSet(STORAGE_KEYS.STUDY_STATS, stats);

export const getSubjectStudyStats = (): SubjectStudyStat[] =>
  safeGet<SubjectStudyStat[]>(STORAGE_KEYS.STUDY_SUBJECT_STATS, INITIAL_SUBJECT_STUDY_STATS);

export const saveSubjectStudyStats = (stats: SubjectStudyStat[]): boolean =>
  safeSet(STORAGE_KEYS.STUDY_SUBJECT_STATS, stats);

export const getTimerSettings = (): TimerSettings =>
  safeGet<TimerSettings>(STORAGE_KEYS.TIMER_SETTINGS, DEFAULT_TIMER_SETTINGS);

export const saveTimerSettings = (settings: TimerSettings): boolean =>
  safeSet(STORAGE_KEYS.TIMER_SETTINGS, settings);

// Goals
export const getGoals = (): Goal[] =>
  safeGet<Goal[]>(STORAGE_KEYS.GOALS, INITIAL_GOALS);

export const saveGoals = (items: Goal[]): boolean =>
  safeSet(STORAGE_KEYS.GOALS, items);

// Notes
export const getNotes = (): Note[] =>
  safeGet<Note[]>(STORAGE_KEYS.NOTES, INITIAL_NOTES);

export const saveNotes = (items: Note[]): boolean =>
  safeSet(STORAGE_KEYS.NOTES, items);

// Settings
export const getAppSettings = (): AppSettings =>
  safeGet<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_APP_SETTINGS);

export const saveAppSettings = (settings: AppSettings): boolean =>
  safeSet(STORAGE_KEYS.SETTINGS, settings);

// User Profile
export const getUserProfile = (): UserProfileSettings => {
  const stored = safeGet<UserProfileSettings | null>(STORAGE_KEYS.PROFILE, null);
  if (stored) return stored;
  const appSettings = getAppSettings();
  return appSettings.profile || DEFAULT_USER_PROFILE;
};

export const saveUserProfile = (profile: UserProfileSettings): boolean => {
  const ok = safeSet(STORAGE_KEYS.PROFILE, profile);
  // Also synchronize nested settings profile
  const currentSettings = getAppSettings();
  saveAppSettings({
    ...currentSettings,
    profile,
    lastUpdated: new Date().toISOString(),
  });
  return ok;
};

// ============================================================================
// Backup, Export, Restore, & Reset
// ============================================================================

export function exportAllApplicationData(): ApplicationBackup {
  return {
    schemaVersion: "2.4.0",
    exportedAt: new Date().toISOString(),
    settings: getAppSettings(),
    assignments: getAssignments(),
    exams: getExams(),
    attendanceSubjects: getAttendanceSubjects(),
    attendanceLogs: getAttendanceLogs(),
    attendanceSlots: getAttendanceSlots(),
    timetableClasses: getTimetable(),
    studySessions: getStudySessions(),
    studyStats: getStudyStats(),
    subjectStudyStats: getSubjectStudyStats(),
    timerSettings: getTimerSettings(),
    goals: getGoals(),
    notes: getNotes(),
  };
}

export function importAllApplicationData(backupData: ApplicationBackup): boolean {
  try {
    if (!backupData || backupData.schemaVersion !== "2.4.0") {
      throw new Error("Invalid or incompatible backup schema version.");
    }

    if (backupData.settings) saveAppSettings(backupData.settings);
    if (backupData.assignments) saveAssignments(backupData.assignments);
    if (backupData.exams) saveExams(backupData.exams);
    if (backupData.attendanceSubjects) saveAttendanceSubjects(backupData.attendanceSubjects);
    if (backupData.attendanceLogs) saveAttendanceLogs(backupData.attendanceLogs);
    if (backupData.attendanceSlots) saveAttendanceSlots(backupData.attendanceSlots);
    if (backupData.timetableClasses) saveTimetable(backupData.timetableClasses);
    if (backupData.studySessions) saveStudySessions(backupData.studySessions);
    if (backupData.studyStats) saveStudyStats(backupData.studyStats);
    if (backupData.subjectStudyStats) saveSubjectStudyStats(backupData.subjectStudyStats);
    if (backupData.timerSettings) saveTimerSettings(backupData.timerSettings);
    if (backupData.goals) saveGoals(backupData.goals);
    if (backupData.notes) saveNotes(backupData.notes);

    window.dispatchEvent(new Event("storage"));
    return true;
  } catch (err) {
    console.error("[Storage] Failed to import application data", err);
    return false;
  }
}

export function resetToSampleData(): void {
  saveAssignments(INITIAL_ASSIGNMENTS);
  saveExams(INITIAL_EXAMS);
  saveAttendanceSubjects(INITIAL_SUBJECT_ATTENDANCE);
  saveAttendanceLogs(INITIAL_ATTENDANCE_LOGS);
  saveAttendanceSlots(INITIAL_CHECKIN_SLOTS);
  saveTimetable(INITIAL_CLASSES);
  saveStudySessions(INITIAL_STUDY_SESSIONS);
  saveStudyStats(INITIAL_STUDY_STATS);
  saveSubjectStudyStats(INITIAL_SUBJECT_STUDY_STATS);
  saveTimerSettings(DEFAULT_TIMER_SETTINGS);
  saveGoals(INITIAL_GOALS);
  saveNotes(INITIAL_NOTES);
  saveAppSettings(DEFAULT_APP_SETTINGS);
  saveUserProfile(DEFAULT_USER_PROFILE);
}

export function clearAllApplicationData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    safeRemove(key);
  });
}

export function getStorageQuotaInfo(): StorageQuotaInfo {
  if (typeof window === "undefined") {
    return {
      usedBytes: 178380,
      totalQuotaBytes: 5242880, // 5MB standard localStorage
      percentageUsed: 3.4,
      formattedUsed: "174.2 KB",
      formattedQuota: "5.0 MB",
      moduleBreakdown: [
        { name: "Course Notes", sizeFormatted: "118 KB", color: "bg-secondary" },
        { name: "Session Metrics", sizeFormatted: "36 KB", color: "bg-tertiary" },
        { name: "Backlog & Exams", sizeFormatted: "20.2 KB", color: "bg-primary" },
      ],
    };
  }

  let totalChars = 0;
  const notesSize = (localStorage.getItem(STORAGE_KEYS.NOTES) || "").length;
  const studySize =
    (localStorage.getItem(STORAGE_KEYS.STUDY_SESSIONS) || "").length +
    (localStorage.getItem(STORAGE_KEYS.STUDY_STATS) || "").length;
  const asgExamSize =
    (localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS) || "").length +
    (localStorage.getItem(STORAGE_KEYS.EXAMS) || "").length;

  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("command_center_")) {
      totalChars += (localStorage.getItem(k) || "").length;
    }
  }

  const usedBytes = Math.max(120000, totalChars * 2); // 2 bytes per UTF-16 character
  const totalQuotaBytes = 5 * 1024 * 1024; // 5 MB
  const percentageUsed = Math.min(100, Number(((usedBytes / totalQuotaBytes) * 100).toFixed(1)));
  const formattedUsed = `${(usedBytes / 1024).toFixed(1)} KB`;

  return {
    usedBytes,
    totalQuotaBytes,
    percentageUsed: percentageUsed || 3.4,
    formattedUsed,
    formattedQuota: "5.0 MB",
    moduleBreakdown: [
      {
        name: "Course Notes",
        sizeFormatted: `${Math.max(1, Math.round((notesSize * 2) / 1024))} KB`,
        color: "bg-secondary",
      },
      {
        name: "Session Metrics",
        sizeFormatted: `${Math.max(1, Math.round((studySize * 2) / 1024))} KB`,
        color: "bg-tertiary",
      },
      {
        name: "Coursework & Exams",
        sizeFormatted: `${Math.max(1, Math.round((asgExamSize * 2) / 1024))} KB`,
        color: "bg-primary",
      },
    ],
  };
}
