"use client";

import React, { useState } from "react";
import {
  Sliders,
  Scale,
  Clock,
  TrendingUp,
  Calendar,
  Plus,
  Trash2,
  X,
  BookOpen,
} from "lucide-react";
import { AcademicPreferences, RegisteredCourseItem, WeekStartDay } from "@/types/settings";

interface AcademicRulesPanelProps {
  academic: AcademicPreferences;
  onChange: (updated: AcademicPreferences) => void;
}

export function AcademicRulesPanel({ academic, onChange }: AcademicRulesPanelProps) {
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newInstructor, setNewInstructor] = useState("");
  const [newCredits, setNewCredits] = useState(4);

  const handleCutoffChange = (val: number) => {
    onChange({
      ...academic,
      mandatoryAttendanceCutoff: val,
    });
  };

  const handleStudyDurationChange = (val: number) => {
    onChange({
      ...academic,
      defaultStudyDurationMinutes: val,
    });
  };

  const handleWeeklyTargetChange = (val: number) => {
    onChange({
      ...academic,
      weeklyStudyTargetHours: val,
    });
  };

  const handleWeekStartChange = (val: WeekStartDay) => {
    onChange({
      ...academic,
      weekStartsOn: val,
    });
  };

  const handleAddCourse = () => {
    if (!newCode.trim() || !newName.trim()) return;

    const colors = ["bg-primary", "bg-secondary", "bg-primary-container", "bg-tertiary"];
    const randomColor = colors[academic.registeredCourses.length % colors.length];

    const newCourse: RegisteredCourseItem = {
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      instructor: newInstructor.trim() || "Faculty Assigned",
      credits: newCredits,
      color: randomColor,
    };

    onChange({
      ...academic,
      registeredCourses: [...academic.registeredCourses, newCourse],
    });

    setNewCode("");
    setNewName("");
    setNewInstructor("");
    setNewCredits(4);
    setCourseModalOpen(false);
  };

  const handleRemoveCourse = (code: string) => {
    onChange({
      ...academic,
      registeredCourses: academic.registeredCourses.filter((c) => c.code !== code),
    });
  };

  return (
    <section className="rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-md space-y-space-md">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-space-sm">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <Sliders className="w-4 h-4" />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Academic Rules &amp; Thresholds
            </h2>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              Establish rigorous automated guards, timer paces, and session standards.
            </p>
          </div>
        </div>
        <span className="font-label-sm text-[11px] px-2 py-0.5 rounded bg-tertiary-container/20 text-tertiary font-semibold border border-tertiary/20">
          Term Enforced
        </span>
      </div>

      {/* 3 Core Rule Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Rule 1: Attendance Cutoff */}
        <div className="p-space-md rounded-lg bg-surface-container space-y-2 border border-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface font-medium">
              Mandatory Cutoff
            </span>
            <Scale className="w-4 h-4 text-error" />
          </div>
          <div className="relative">
            <input
              type="number"
              step="0.5"
              min="50"
              max="100"
              value={academic.mandatoryAttendanceCutoff}
              onChange={(e) => handleCutoffChange(parseFloat(e.target.value) || 80)}
              className="w-full bg-surface-container-lowest font-mono-code text-lg text-on-surface px-3 py-2 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary/50 transition-all"
            />
            <span className="absolute right-3 top-2.5 text-xs font-mono-code text-outline">%</span>
          </div>
          <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
            Minimum lecture attendance required to sit for final semester examinations.
          </p>
        </div>

        {/* Rule 2: Default Study Duration */}
        <div className="p-space-md rounded-lg bg-surface-container space-y-2 border border-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface font-medium">
              Default Session
            </span>
            <Clock className="w-4 h-4 text-secondary" />
          </div>
          <div className="relative">
            <select
              value={academic.defaultStudyDurationMinutes}
              onChange={(e) => handleStudyDurationChange(parseInt(e.target.value, 10))}
              className="w-full bg-surface-container-lowest font-mono-code text-sm text-on-surface px-3 py-2.5 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary/50 transition-all"
            >
              <option value={25}>25m Pomodoro Focus</option>
              <option value={30}>30m Short Flow</option>
              <option value={45}>45m Mid Session</option>
              <option value={50}>50m Deep Flow</option>
              <option value={60}>60m 1-Hour Block</option>
              <option value={90}>90m Master Class</option>
            </select>
          </div>
          <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
            Standard focus duration automatically initialized when loading the Study Cockpit.
          </p>
        </div>

        {/* Rule 3: Weekly Target Volume */}
        <div className="p-space-md rounded-lg bg-surface-container space-y-2 border border-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface font-medium">
              Weekly Target
            </span>
            <TrendingUp className="w-4 h-4 text-tertiary" />
          </div>
          <div className="relative">
            <input
              type="number"
              step="1"
              min="5"
              max="80"
              value={academic.weeklyStudyTargetHours}
              onChange={(e) => handleWeeklyTargetChange(parseFloat(e.target.value) || 30)}
              className="w-full bg-surface-container-lowest font-mono-code text-lg text-on-surface px-3 py-2 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary/50 transition-all"
            />
            <span className="absolute right-3 top-2.5 text-xs font-mono-code text-outline">hours</span>
          </div>
          <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
            Aggregate solo focus goal outside scheduled university laboratory credit hours.
          </p>
        </div>
      </div>

      {/* Week Starting Day Selector */}
      <div className="p-space-sm rounded-lg bg-surface-container border border-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-outline" />
          <span className="text-xs font-medium text-on-surface">Week Starting Day</span>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg border border-white/[0.04]">
          <button
            type="button"
            onClick={() => handleWeekStartChange("monday")}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              academic.weekStartsOn === "monday"
                ? "bg-primary-container text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Monday
          </button>
          <button
            type="button"
            onClick={() => handleWeekStartChange("sunday")}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              academic.weekStartsOn === "sunday"
                ? "bg-primary-container text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Sunday
          </button>
        </div>
      </div>

      {/* Registered Academic Subjects Manager */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
              Registered Academic Subjects ({academic.registeredCourses.length})
            </h3>
            <p className="text-[11px] text-on-surface-variant">
              Courses tracked across Timetable, Assignments, Exams, and Attendance telemetry.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCourseModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-medium text-xs border border-white/[0.04] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Course</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {academic.registeredCourses.map((c) => (
            <div
              key={c.code}
              className="p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all flex items-center justify-between gap-3 border border-white/[0.02]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono-code text-[11px] font-bold text-on-surface ${c.color}/20 border border-white/[0.08]`}>
                  {c.code.slice(0, 4)}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono-code text-xs font-semibold text-primary">{c.code}</span>
                    <span className="text-xs text-on-surface truncate">{c.name}</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant block truncate">
                    {c.instructor} • {c.credits} Credits
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveCourse(c.code)}
                title="Remove course"
                className="p-1.5 rounded text-outline hover:text-error hover:bg-surface-container transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Course Modal */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Register Academic Course
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCourseModalOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Course Code (e.g. CS401)
                </label>
                <input
                  type="text"
                  placeholder="CS401"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-surface-container text-on-surface text-sm px-3.5 py-2 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  placeholder="Distributed Systems"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-surface-container text-on-surface text-sm px-3.5 py-2 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Instructor
                  </label>
                  <input
                    type="text"
                    placeholder="Prof. S. Vance"
                    value={newInstructor}
                    onChange={(e) => setNewInstructor(e.target.value)}
                    className="w-full bg-surface-container text-on-surface text-sm px-3.5 py-2 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Credits
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={newCredits}
                    onChange={(e) => setNewCredits(parseInt(e.target.value, 10) || 4)}
                    className="w-full bg-surface-container text-on-surface text-sm px-3.5 py-2 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCourseModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCourse}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary text-xs font-medium hover:bg-primary transition-all shadow-sm"
              >
                Register Course
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
