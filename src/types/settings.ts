import { AssignmentItem } from "./assignment";
import { SubjectAttendance, AttendanceLogRecord, CheckInSlot } from "./attendance";
import { ExamItem } from "./exam";
import { Goal } from "./goals";
import { Note } from "./notes";
import { StudySessionRecord, StudyStats, SubjectStudyStat, TimerSettings } from "./study";
import { ClassItem } from "./timetable";

export type ThemeMode = "dark" | "light" | "system";
export type AccentColor = "indigo" | "cyan" | "emerald" | "violet" | "rose";
export type LayoutDensity = "standard" | "compact";
export type WeekStartDay = "monday" | "sunday";

export interface UserProfileSettings {
  name: string;
  studentId: string;
  email: string;
  major: string;
  academicYear: string;
  targetGpa: number;
  currentGpa: number;
  avatarUrl: string;
  department: string;
}

export interface AppearanceSettings {
  theme: ThemeMode;
  accentColor: AccentColor;
  density: LayoutDensity;
  baseTextScale: number; // 1 (12px), 2 (14px default), 3 (16px), 4 (18px)
}

export interface NotificationSettings {
  classStartReminders: boolean;
  assignmentDeadlineAlerts: boolean;
  attendanceThresholdWarnings: boolean;
  dailyMorningBriefing: boolean;
  examCountdownNudges: boolean;
  goalPaceReminders: boolean;
  soundAlerts: boolean;
}

export interface RegisteredCourseItem {
  code: string;
  name: string;
  instructor: string;
  credits: number;
  color: string;
}

export interface AcademicPreferences {
  mandatoryAttendanceCutoff: number; // e.g. 80.0
  defaultStudyDurationMinutes: number; // e.g. 25 or 50
  shortBreakMinutes: number; // e.g. 5
  longBreakMinutes: number; // e.g. 15
  weeklyStudyTargetHours: number; // e.g. 30.0
  weekStartsOn: WeekStartDay;
  registeredCourses: RegisteredCourseItem[];
}

export interface AppSettings {
  profile: UserProfileSettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  academic: AcademicPreferences;
  lastUpdated: string;
}

export interface ApplicationBackup {
  schemaVersion: "2.4.0";
  exportedAt: string;
  settings: AppSettings;
  assignments: AssignmentItem[];
  exams: ExamItem[];
  attendanceSubjects: SubjectAttendance[];
  attendanceLogs: AttendanceLogRecord[];
  attendanceSlots: CheckInSlot[];
  timetableClasses: ClassItem[];
  studySessions: StudySessionRecord[];
  studyStats: StudyStats;
  subjectStudyStats: SubjectStudyStat[];
  timerSettings: TimerSettings;
  goals: Goal[];
  notes: Note[];
}

export interface StorageQuotaInfo {
  usedBytes: number;
  totalQuotaBytes: number;
  percentageUsed: number;
  formattedUsed: string;
  formattedQuota: string;
  moduleBreakdown: {
    name: string;
    sizeFormatted: string;
    color: string;
  }[];
}
