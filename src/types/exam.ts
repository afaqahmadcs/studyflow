export type ExamStatus = "critical" | "upcoming" | "scheduled" | "completed";

export interface ExamTopic {
  id: string;
  name: string;
  description: string;
  mastered: boolean;
  tag?: string;
  progress?: number;
}

export interface StudySession {
  id: string;
  title: string;
  date: string;
  durationMinutes: number;
  type: string;
}

export interface ExamCheatsheet {
  title: string;
  formula: string;
  explanation: string;
}

export interface ExamItem {
  id: string;
  code: string;            // e.g. "CS401"
  subjectName: string;     // e.g. "Distributed Systems"
  title: string;           // e.g. "CS401 Midterm Deep Dive"
  examDate: string;        // "2025-10-31"
  startTime: string;       // "10:00"
  endTime: string;         // "12:00"
  durationMinutes: number; // 120
  room: string;            // "Auditorium 1, Seat D-14"
  weightPercentage: number;// 30
  preparationPercentage: number; // 78
  status: ExamStatus;
  discipline: "CS" | "MATH" | "ENG" | "OTHER";
  rulesNote?: string;      // e.g. "Handwritten Cheatsheet: 1 Sheet Allowed"
  topics: ExamTopic[];
  studySessions: StudySession[];
  cheatsheetNotes: ExamCheatsheet[];
  verifiedNote?: string;
}

export type ExamFormData = Omit<ExamItem, "id" | "studySessions" | "cheatsheetNotes" | "topics"> & {
  topics?: ExamTopic[];
};
