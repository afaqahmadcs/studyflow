import {
  StudySessionRecord,
  SubjectStudyStat,
  StudyStats,
  TimerSettings,
} from "@/types/study";

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  pomodoroMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  deepFlowMinutes: 50,
  autoResume: false,
  soundAlerts: true,
};

export const INITIAL_STUDY_SESSIONS: StudySessionRecord[] = [
  {
    id: "sess-1",
    subjectCode: "CS401",
    subjectName: "Distributed Systems",
    objective: "Vector Clocks & Causality proofs",
    durationMinutes: 50,
    mode: "deep_flow",
    date: "Today",
    startTime: "10:15 AM",
    endTime: "11:05 AM",
    timestamp: "Today, 10:15 AM - 11:05 AM",
    xpEarned: 80,
    tasksVerified: 4,
    tags: ["#DistributedSystems", "#MidtermPrep"],
    notes:
      "Mapped partial ordering relations across asynchronous nodes. Successfully solved homework problems 4.1 through 4.4 on concurrent clock drift.",
  },
  {
    id: "sess-2",
    subjectCode: "CS450",
    subjectName: "Operating Systems",
    objective: "Page Table Walkers & TLB Invalidation",
    durationMinutes: 25,
    mode: "pomodoro",
    date: "Today",
    startTime: "08:30 AM",
    endTime: "08:55 AM",
    timestamp: "Today, 08:30 AM - 08:55 AM",
    xpEarned: 40,
    tasksVerified: 2,
    tags: ["#VirtualMemory", "#KernelSpace"],
    notes:
      "Reviewed multi-level paging overhead on x86-64 architecture. Traced kernel context switch TLB shootdowns under multicore locks.",
  },
  {
    id: "sess-3",
    subjectCode: "CS320",
    subjectName: "Database Systems",
    objective: "B-Tree Index Concurrency & Latching",
    durationMinutes: 75,
    mode: "deep_flow",
    date: "Yesterday",
    startTime: "04:00 PM",
    endTime: "05:15 PM",
    timestamp: "Yesterday, 04:00 PM - 05:15 PM",
    xpEarned: 120,
    tasksVerified: 3,
    tags: ["#StorageEngine", "#LockCoupling"],
    notes:
      "Deep dive into latch crabbing protocols. Implemented write lock release patterns during B+ root node structural modifications.",
  },
  {
    id: "sess-4",
    subjectCode: "MATH310",
    subjectName: "Linear Algebra",
    objective: "Eigenvalues & Spectral Theorem proofs",
    durationMinutes: 50,
    mode: "deep_flow",
    date: "Yesterday",
    startTime: "01:15 PM",
    endTime: "02:05 PM",
    timestamp: "Yesterday, 01:15 PM - 02:05 PM",
    xpEarned: 80,
    tasksVerified: 3,
    tags: ["#SpectralTheory", "#PureMath"],
    notes:
      "Verified symmetric operator orthodiagonalization theorems. Worked out 3 complete proof structures for self-adjoint compact operators.",
  },
];

export const INITIAL_SUBJECT_STUDY_STATS: SubjectStudyStat[] = [
  {
    code: "CS401",
    name: "CS401 Distributed Systems",
    subtitle: "Consensus & P2P Overlays",
    hours: 10.5,
    percentage: 40,
    color: "bg-primary-container",
  },
  {
    code: "CS450",
    name: "CS450 Operating Systems",
    subtitle: "Virtual Memory & Kernels",
    hours: 8.0,
    percentage: 30,
    color: "bg-secondary",
  },
  {
    code: "CS320",
    name: "CS320 Database Systems",
    subtitle: "Indexing & Concurrency",
    hours: 5.0,
    percentage: 19,
    color: "bg-primary",
  },
  {
    code: "MATH310",
    name: "MATH310 Linear Algebra",
    subtitle: "Spectral Decomposition",
    hours: 3.0,
    percentage: 11,
    color: "bg-secondary-fixed",
  },
];

export const INITIAL_STUDY_STATS: StudyStats = {
  todayMinutes: 225, // 3h 45m
  weeklyMinutes: 1590, // 26h 30m
  totalSessions: 4,
  currentStreakDays: 14,
  personalBestStreakDays: 19,
  cognitivePeakWindow: "09:00 AM - 12:30 PM",
  attentionIndex: 94.2,
};

export const AVAILABLE_SUBJECTS = [
  { code: "CS401", name: "Distributed Systems", icon: "dns" },
  { code: "CS450", name: "Operating Systems", icon: "memory" },
  { code: "CS320", name: "Database Systems", icon: "database" },
  { code: "MATH310", name: "Linear Algebra", icon: "functions" },
  { code: "ENG200", name: "Technical Communication", icon: "book" },
];
