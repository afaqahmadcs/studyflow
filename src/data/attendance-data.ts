import {
  SubjectAttendance,
  CheckInSlot,
  AttendanceLogRecord,
  AttendanceTrendPoint,
  AttendanceSummary,
} from "@/types/attendance";

export const INITIAL_SUBJECT_ATTENDANCE: SubjectAttendance[] = [
  {
    code: "CS401",
    name: "Distributed Systems",
    instructor: "Prof. Dr. Aris Thorne",
    credits: 4,
    attended: 24,
    total: 25,
    excused: 0,
    percentage: 96.0,
    safeMissBuffer: 5,
    cutoffFloorClasses: 20,
    tier: "healthy",
    statusLabel: "Exceptional",
  },
  {
    code: "CS450",
    name: "Operating Systems & Kernels",
    instructor: "Dr. Valerie Cho",
    credits: 4,
    attended: 25,
    total: 27,
    excused: 1,
    percentage: 92.5,
    safeMissBuffer: 4,
    cutoffFloorClasses: 22,
    tier: "healthy",
    statusLabel: "Safe",
  },
  {
    code: "MATH310",
    name: "Applied Linear Algebra",
    instructor: "Prof. Kenji Sato",
    credits: 3,
    attended: 19,
    total: 20,
    excused: 0,
    percentage: 95.0,
    safeMissBuffer: 3,
    cutoffFloorClasses: 16,
    tier: "healthy",
    statusLabel: "Safe",
  },
  {
    code: "CS320",
    name: "Database Engineering",
    instructor: "Prof. Maya Lin",
    credits: 3,
    attended: 18,
    total: 20,
    excused: 1,
    percentage: 82.5,
    safeMissBuffer: 1,
    cutoffFloorClasses: 16,
    tier: "critical",
    statusLabel: "Critical Buffer",
    alertMessage: "Low Attendance Alert: Only 1 miss allowed before breach of 80% institutional threshold!",
  },
];

export const INITIAL_CHECKIN_SLOTS: CheckInSlot[] = [
  {
    id: "slot-cs401",
    code: "CS401",
    title: "CS401 • Distributed Sys",
    time: "09:00 AM – 10:30 AM",
    room: "Room Turing-302",
    status: "present",
    loggedAt: "09:02 AM",
  },
  {
    id: "slot-cs320",
    code: "CS320",
    title: "CS320 • Database Lab",
    time: "11:00 AM – 01:00 PM",
    room: "Lab Omega",
    status: "present",
    loggedAt: "11:04 AM",
  },
  {
    id: "slot-cs450",
    code: "CS450",
    title: "CS450 • Operating Systems",
    time: "02:00 PM – 03:30 PM",
    room: "Hall 4B",
    status: "pending",
  },
  {
    id: "slot-math310",
    code: "MATH310",
    title: "MATH310 • Linear Algebra",
    time: "04:00 PM – 05:30 PM",
    room: "Euler-105",
    status: "pending",
  },
];

export const INITIAL_ATTENDANCE_LOGS: AttendanceLogRecord[] = [
  {
    id: "log-1",
    timestamp: "Oct 27, 2025 • 11:04 AM",
    date: "2025-10-27",
    code: "CS320",
    courseName: "CS320 Lab",
    unitSubtitle: "Database Systems Practicum",
    location: "Lab Omega • Seat 14",
    status: "present",
    faculty: "Prof. Maya Lin",
    authMethod: "RFID Badge Authenticated",
    auditId: "#TX-90281-A",
  },
  {
    id: "log-2",
    timestamp: "Oct 27, 2025 • 09:02 AM",
    date: "2025-10-27",
    code: "CS401",
    courseName: "CS401 Lecture",
    unitSubtitle: "Distributed Architecture",
    location: "Turing Hall • Rm 302",
    status: "present",
    faculty: "Dr. Aris Thorne",
    authMethod: "Biometric Beacon",
    auditId: "#TX-90214-B",
  },
  {
    id: "log-3",
    timestamp: "Oct 23, 2025 • 02:15 PM",
    date: "2025-10-23",
    code: "CS450",
    courseName: "CS450 OS Lecture",
    unitSubtitle: "Deadlocks & Concurrency",
    location: "Hall 4B",
    status: "excused",
    faculty: "Health Services Bureau",
    authMethod: "Cert #MC-4491-OS",
    auditId: "#EX-77812-M",
  },
  {
    id: "log-4",
    timestamp: "Oct 16, 2025 • 11:00 AM",
    date: "2025-10-16",
    code: "CS320",
    courseName: "CS320 Lecture",
    unitSubtitle: "Relational Normalization",
    location: "Room 102",
    status: "absent",
    faculty: "Prof. Maya Lin",
    authMethod: "Automated Absence Flag",
    auditId: "#FL-10932-U",
  },
  {
    id: "log-5",
    timestamp: "Oct 14, 2025 • 04:00 PM",
    date: "2025-10-14",
    code: "MATH310",
    courseName: "MATH310 Lecture",
    unitSubtitle: "Eigenvectors & Diagonalization",
    location: "Euler-105",
    status: "present",
    faculty: "Prof. Kenji Sato",
    authMethod: "RFID Badge Authenticated",
    auditId: "#TX-89104-M",
  },
  {
    id: "log-6",
    timestamp: "Oct 12, 2025 • 09:00 AM",
    date: "2025-10-12",
    code: "CS401",
    courseName: "CS401 Lecture",
    unitSubtitle: "Byzantine Agreement Principles",
    location: "Turing Hall • Rm 302",
    status: "present",
    faculty: "Dr. Aris Thorne",
    authMethod: "Biometric Beacon",
    auditId: "#TX-88931-D",
  },
];

export const ATTENDANCE_TREND_DATA: AttendanceTrendPoint[] = [
  { week: "W1", percentage: 95.0, isActual: true },
  { week: "W2", percentage: 96.5, isActual: true },
  { week: "W3", percentage: 98.0, isActual: true },
  { week: "W4", percentage: 91.0, isActual: true },
  { week: "W5", percentage: 93.0, isActual: true },
  { week: "W6", percentage: 95.5, isActual: true },
  { week: "W7", percentage: 94.0, isActual: true },
  { week: "W8", percentage: 93.4, isActual: true, isCurrent: true },
  { week: "W9", percentage: 92.8, isActual: false },
  { week: "W10", percentage: 93.2, isActual: false },
  { week: "W11", percentage: 92.0, isActual: false },
  { week: "W12", percentage: 91.5, isActual: false },
  { week: "W13", percentage: 92.0, isActual: false },
  { week: "W14", percentage: 92.5, isActual: false },
];

export function computeAttendanceSummary(subjects: SubjectAttendance[]): AttendanceSummary {
  let totalAttended = 0;
  let totalSessions = 0;
  let totalExcused = 0;

  subjects.forEach((s) => {
    totalAttended += s.attended;
    totalSessions += s.total;
    totalExcused += s.excused || 0;
  });

  const absentSessions = Math.max(0, totalSessions - totalAttended - totalExcused);
  const overallPercentage =
    totalSessions > 0 ? Number(((totalAttended / totalSessions) * 100).toFixed(1)) : 100;

  // Maximum sessions that can be missed before falling below 80%
  // Formula: (totalAttended) / (totalSessions + x) >= 0.8
  // totalAttended >= 0.8 * totalSessions + 0.8 * x
  // x <= (totalAttended - 0.8 * totalSessions) / 0.8
  const bunkSafetyMargin = Math.max(
    0,
    Math.floor((totalAttended - 0.8 * totalSessions) / 0.8)
  );

  return {
    overallPercentage,
    attendedSessions: totalAttended,
    absentSessions,
    excusedSessions: totalExcused,
    totalSessions,
    bunkSafetyMargin,
    policyThreshold: 80.0,
    complianceTier: overallPercentage >= 90 ? "Tier 1" : overallPercentage >= 80 ? "Tier 2" : "At Risk",
  };
}
