export interface StudentProfile {
  name: string;
  avatar: string;
  term: string;
  week: string;
  gpa: number;
  standing: string;
  major: string;
  creditsCompleted: number;
  totalCredits: number;
}

export interface Checkpoint {
  id: string;
  time: string;
  title: string;
  status: "done" | "active" | "pending";
}

export interface ScheduleItem {
  id: string;
  time: string;
  courseCode: string;
  courseName: string;
  location: string;
  instructor: string;
  extraInfo?: string;
  status: "attended" | "active" | "upcoming" | "later";
  statusText?: string;
  actionText?: string;
}

export interface Deliverable {
  id: string;
  courseCode: string;
  title: string;
  priority: "critical" | "medium" | "standard" | "low";
  dueText: string;
  details: string;
  progress: number;
  completed: boolean;
  category: "urgent" | "in_progress" | "submitted";
}

export interface ExamCountdownData {
  courseCode: string;
  credits: number;
  title: string;
  dateText: string;
  description: string;
  days: number;
  hours: number;
  minutes: number;
  preparednessPercent: number;
  preparednessText: string;
  modulesReviewed: string;
  mockExamsStat: string;
}

export interface SecondaryExam {
  id: string;
  courseCode: string;
  title: string;
  dateText: string;
  topics: string;
  readyPercent: number;
  status: string;
}

export interface StudyDay {
  day: string;
  percent: number;
  hours: string;
  isToday?: boolean;
}

export const STUDENT_PROFILE: StudentProfile = {
  name: "Afaq",
  avatar: "/avatar.png",
  term: "Spring Term 2025",
  week: "Week 8",
  gpa: 3.86,
  standing: "Top 5%",
  major: "Computer Science & Engineering",
  creditsCompleted: 14,
  totalCredits: 14,
};

export const CHECKPOINTS: Checkpoint[] = [
  { id: "c1", time: "08:00", title: "Algorithm Review", status: "done" },
  { id: "c2", time: "09:00", title: "CS401 Lecture", status: "done" },
  { id: "c3", time: "11:00", title: "CS320 Lab", status: "done" },
  { id: "c4", time: "12:45", title: "Paper Submission", status: "done" },
  { id: "c5", time: "13:30", title: "Code Review", status: "done" },
  { id: "c6", time: "14:00", title: "CS450 Lecture", status: "active" },
  { id: "c7", time: "17:00", title: "Deep Study Block", status: "pending" },
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: "s1",
    time: "09:00 AM - 10:30 AM",
    courseCode: "CS401",
    courseName: "Distributed Systems Architecture",
    location: "Lecture Hall 3B",
    instructor: "Prof. Martinez",
    status: "attended",
    statusText: "Attended",
  },
  {
    id: "s2",
    time: "11:00 AM - 12:30 PM",
    courseCode: "CS320",
    courseName: "Database Engineering & Index Internals",
    location: "Lab C, Room 204",
    instructor: "Dr. Aris",
    extraInfo: "B-Tree Workstation #14",
    status: "active",
    statusText: "Active • 24m remaining",
    actionText: "Open Scratchpad",
  },
  {
    id: "s3",
    time: "02:00 PM - 03:30 PM",
    courseCode: "CS450",
    courseName: "Operating Systems & Kernel Architecture",
    location: "Turing Memorial Hall",
    instructor: "Prof. Vance",
    status: "upcoming",
    statusText: "Upcoming in 1h 15m",
    actionText: "Pre-read Notes",
  },
  {
    id: "s4",
    time: "04:00 PM - 05:00 PM",
    courseCode: "MATH310",
    courseName: "Applied Linear Algebra: SVD & Projections",
    location: "Online Synced Stream • Math Annex 102",
    instructor: "Math Dept",
    status: "later",
    statusText: "Syllabus #7",
  },
];

export const INITIAL_DELIVERABLES: Deliverable[] = [
  {
    id: "d1",
    courseCode: "CS450",
    title: "Kernel Memory Allocator (Malloc) Implementation",
    priority: "critical",
    dueText: "Due Today, 11:59 PM (9h left)",
    details: "450 lines C99 code • Valgrind Check Passed",
    progress: 85,
    completed: false,
    category: "urgent",
  },
  {
    id: "d2",
    courseCode: "CS320",
    title: "B-Tree Indexing Benchmark Report",
    priority: "medium",
    dueText: "Due: Wed, Oct 29 (in 2 days)",
    details: "PostgreSQL vs Custom B-Tree benchmark data",
    progress: 40,
    completed: false,
    category: "in_progress",
  },
  {
    id: "d3",
    courseCode: "MATH310",
    title: "Problem Set 7: SVD & Eigenvalue Decompositions",
    priority: "standard",
    dueText: "Due: Friday, Oct 31",
    details: "Problems 1-8 in LaTeX",
    progress: 15,
    completed: false,
    category: "in_progress",
  },
  {
    id: "d4",
    courseCode: "CS401",
    title: "Raft Consensus Architecture Research Paper",
    priority: "low",
    dueText: "Due: Nov 05, 2025",
    details: "Literature survey pending",
    progress: 0,
    completed: false,
    category: "in_progress",
  },
  {
    id: "d5",
    courseCode: "CS320",
    title: "SQL Query Optimizer Tuning Lab",
    priority: "standard",
    dueText: "Submitted Oct 25",
    details: "100% test vectors matched • Grade 98/100",
    progress: 100,
    completed: true,
    category: "submitted",
  },
];

export const FEATURED_EXAM: ExamCountdownData = {
  courseCode: "CS401",
  credits: 4,
  title: "Distributed Systems Midterm",
  dateText: "Friday, Oct 31 • 10:00 AM",
  description: "Covering Raft, Paxos, Vector Clocks, and CAP Theorem proof derivations.",
  days: 4,
  hours: 16,
  minutes: 42,
  preparednessPercent: 78,
  preparednessText: "78% • High Confidence",
  modulesReviewed: "5 of 8 modules reviewed",
  mockExamsStat: "2 mock exams completed (92% avg)",
};

export const SECONDARY_EXAM: SecondaryExam = {
  id: "se1",
  courseCode: "CS450",
  title: "OS Quiz #3",
  dateText: "• Nov 06 (10d left)",
  topics: "Virtual Memory, Page Tables, TLBs",
  readyPercent: 45,
  status: "Scheduled",
};

export const STUDY_WEEK_DATA: StudyDay[] = [
  { day: "Mon", percent: 75, hours: "3.75h", isToday: true },
  { day: "Tue", percent: 85, hours: "4.25h" },
  { day: "Wed", percent: 60, hours: "3.00h" },
  { day: "Thu", percent: 95, hours: "4.75h" },
  { day: "Fri", percent: 70, hours: "3.50h" },
  { day: "Sat", percent: 40, hours: "2.00h" },
  { day: "Sun", percent: 50, hours: "2.50h" },
];

export const ACADEMIC_COURSES = [
  {
    name: "Distributed Systems (CS401)",
    grade: "Grade A (94%)",
    percent: 94,
    colorClass: "bg-tertiary text-tertiary",
  },
  {
    name: "Operating Systems (CS450)",
    grade: "Grade A- (91%)",
    percent: 91,
    colorClass: "bg-primary text-primary",
  },
  {
    name: "Database Systems (CS320)",
    grade: "Grade B+ (88%)",
    percent: 88,
    colorClass: "bg-secondary text-secondary",
  },
  {
    name: "Applied Linear Algebra (MATH310)",
    grade: "Grade A (96%)",
    percent: 96,
    colorClass: "bg-tertiary text-tertiary",
  },
];
