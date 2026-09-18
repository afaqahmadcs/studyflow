export type AssignmentPriority = "critical" | "high" | "medium" | "low";
export type AssignmentStatus = "pending" | "in_progress" | "completed" | "overdue";

export interface AssignmentItem {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  description: string;
  dueDate: string;       // e.g. "2025-10-27"
  dueDisplay: string;    // e.g. "Today, 11:59 PM (9h left)"
  priority: AssignmentPriority;
  status: AssignmentStatus;
  progress: number;      // 0 - 100
  completed: boolean;
  tags?: string[];
  specs?: string;        // e.g. "450 lines C99 code • Valgrind Check Passed"
  grade?: string;        // e.g. "Grade 98/100"
}

export type AssignmentFormData = Omit<AssignmentItem, "id" | "completed">;
