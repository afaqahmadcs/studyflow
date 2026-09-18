export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

export type ClassStatus = "attended" | "in_session" | "upcoming" | "later";
export type ClassType = "lecture" | "lab" | "seminar" | "tutorial";

export interface ClassItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  teacher: string;
  teacherAvatar?: string;
  room: string;
  day: DayOfWeek;
  startTime: string; // "HH:MM" e.g. "09:00"
  endTime: string;   // "HH:MM" e.g. "10:30"
  durationMinutes: number;
  status: ClassStatus;
  type: ClassType;
  colorTag: "primary" | "secondary" | "tertiary" | "secondary-fixed";
  notes?: string;
}

export type ClassFormData = Omit<ClassItem, "id" | "status">;
