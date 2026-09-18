# StudyFlow - Student Command Center

A production-quality academic command center and dashboard built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**, based directly on the Google Stitch **Obsidian Orbit** design system.

![Student Command Center Preview](/public/avatar.png)

## 🚀 Features

- **Obsidian Orbit Design System**: Deep slate/obsidian palette (`#0B0F17` / `#0f131c`), glassmorphic panels, and high-contrast telemetry accents.
- **Dynamic Theming**: Obsidian Orbit dark mode default with a clean light theme foundation and instant toggle.
- **Top Momentum & Telemetry**: Live sprint status, 72% concentric radial progress gauge, and 7-segment daily completion bar.
- **Precision Quick Actions Hub**: 6 hotkey-enabled triggers (`A`, `E`, `N`, `✓`, `→`) opening interactive modals for assignments, exams, focus sprints, attendance, and notes.
- **Operational KPI Grid**: Live trackers for classes today, active deliverables, midterm targets, and attendance index.
- **Connected Timetable Rail**: Real-time scheduled classes with active session status and quick action triggers.
- **Critical Deliverables**: Filter tabs (All, Urgent, In Progress, Submitted) with completion checkboxes and progress bars.
- **Target Exam Countdown**: CS401 Midterm countdown timer (Days, Hours, Mins, live Secs), preparedness index, and revision cheatsheet trigger.
- **Study Cockpit Velocity**: 14-day study streak, focus hour counters, and an interactive 7-day study volume bar chart with daily target threshold.
- **Academic Progress**: Cumulative 3.86 GPA, course mastery bars, and Dean's List honors status.
- **Global Command Palette**: Instant modal search (`⌘K` / `Ctrl+K`) across courses, deliverables, and system triggers.
- **Toast Notifications**: Interactive floating toast feedback on completing tasks and triggering actions.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile with a slide-over drawer navigation.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Plus Jakarta Sans, Inter, JetBrains Mono (via `next/font/google`)

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```
