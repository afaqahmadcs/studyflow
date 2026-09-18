export interface NoteChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Note {
  id: string;
  title: string;
  subjectCode: string; // e.g. "CS401", "CS450", "CS320", "MATH310"
  subjectName: string;
  content: string;     // Markdown-ready text
  tags: string[];
  isPinned: boolean;
  createdAt: string;   // e.g. "Oct 27, 2025"
  updatedAt: string;   // e.g. "Today 10:15 AM"
  readTimeMinutes: number;
  wordCount?: number;
  checklistItems?: NoteChecklistItem[];
}
