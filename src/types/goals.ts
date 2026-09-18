export type GoalType = "daily" | "weekly" | "academic";
export type GoalPriority = "low" | "medium" | "critical";
export type GoalStatus = "pending" | "in_progress" | "completed";

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: GoalType;
  subjectCode: string; // e.g. "CS450", "CS401", "CS320", "MATH310", "ALL"
  subjectName: string;
  target: string;      // e.g. "7 Tasks", "10.0 Hours", "3.90 GPA", "3 Pages"
  currentValue: number;
  targetValue: number;
  unit: string;        // "tasks", "hrs", "pages", "GPA", "assertions", "%"
  deadline: string;    // e.g. "Tonight, 11:59 PM", "Nov 14, 2025"
  status: GoalStatus;
  priority: GoalPriority;
  xpReward: number;
  verifiedAt?: string;
  keyResult?: string;
  notes?: string;
}

export interface GoalsTelemetryStats {
  dailyCompleted: number;
  dailyTotal: number;
  weeklyVelocityPercent: number;
  currentGpa: number;
  targetGpa: number;
  streakDays: number;
}
