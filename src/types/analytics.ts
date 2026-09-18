import { SubjectAttendance } from "./attendance";
import { ExamItem } from "./exam";
import { Goal } from "./goals";

export type AnalyticsScope = "week" | "month" | "semester";

export interface DayStudyVolume {
  dayName: string;        // "Mon", "Tue", ...
  fullDay: string;        // "Monday", "Tuesday", ...
  dateStr: string;        // "2025-10-27"
  totalHours: number;     // 5.6
  courseBreakdown: {
    code: string;
    name: string;
    hours: number;
    color: string;
  }[];
}

export interface StudyAnalyticsSummary {
  todayMinutes: number;
  todayHours: number;
  weeklyMinutes: number;
  weeklyHours: number;
  totalHours: number;
  weeklyPaceHours: number;
  currentStreakDays: number;
  daysMeetingTargetCount: number;
  targetDailyHours: number;
  dailyStudyVolume: DayStudyVolume[];
  subjectDistribution: {
    code: string;
    name: string;
    hours: number;
    percentage: number;
    color: string;
  }[];
  peakFocusEfficiency: number; // e.g. 94%
  medianSessionMinutes: number;
  focusTrendWeeks: {
    week: string;
    percentage: number;
    isCurrent?: boolean;
    isPeak?: boolean;
  }[];
}

export interface GradeTierItem {
  label: string;          // "95 – 100% (High Honors)"
  count: number;
  percentage: number;
  colorClass: string;     // "bg-tertiary"
  textColorClass: string; // "text-tertiary"
}

export interface AssignmentAnalyticsSummary {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  inProgress: number;
  completionPercentage: number;
  onTimeVelocityPercentage: number;
  consecutiveOnTimeStreak: number;
  medianScore: number;
  gradeTiers: GradeTierItem[];
}

export interface AttendanceAnalyticsSummary {
  overallPercentage: number;
  attendedSessions: number;
  totalSessions: number;
  absentSessions: number;
  safeMissBuffer: number;
  policyThreshold: number; // 80.0
  complianceTier: "healthy" | "warning" | "critical";
  subjects: SubjectAttendance[];
  trendPoints: {
    week: string;
    percentage: number;
    isCurrent?: boolean;
  }[];
}

export interface CourseReadinessItem {
  code: string;
  name: string;
  instructor: string;
  credits: number;
  hoursLogged: number;
  readinessPercentage: number;
  statusLabel: string;
  statusColorClass: string;
  projectedGrade: string;
  assessmentType: string;
  isAttentionNeeded: boolean;
}

export interface ExamAnalyticsSummary {
  upcomingCount: number;
  completedCount: number;
  averagePreparation: number;
  nearestExam: ExamItem | null;
  nearestExamDaysRemaining: number;
  courseReadiness: CourseReadinessItem[];
  upcomingExams: (ExamItem & { daysRemaining: number })[];
}

export interface GoalAnalyticsSummary {
  totalGoals: number;
  completedGoals: number;
  activeGoals: number;
  completionPercentage: number;
  dailyCompleted: number;
  dailyTotal: number;
  dailyCompletionPercentage: number;
  weeklyVelocityPercentage: number;
  strategicMilestonePercentage: number;
  goalsList: Goal[];
}

export interface CognitiveDirective {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "priority" | "recommended";
  iconName: "timer_off" | "notification_important" | "schedule" | "trending_up";
  actionLabel: string;
  actionHref: string;
}

export interface AnalyticsPayload {
  lastUpdated: string;
  scope: AnalyticsScope;
  selectedCourse: string;
  semesterGpa: number;
  targetGpa: number;
  gpaDelta: number;
  study: StudyAnalyticsSummary;
  assignments: AssignmentAnalyticsSummary;
  attendance: AttendanceAnalyticsSummary;
  exams: ExamAnalyticsSummary;
  goals: GoalAnalyticsSummary;
  advisoryDirectives: CognitiveDirective[];
}
