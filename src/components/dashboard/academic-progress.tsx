"use client";

import React from "react";
import { GraduationCap, Award } from "lucide-react";
import { ACADEMIC_COURSES } from "@/data/student-data";

export function AcademicProgress() {
  return (
    <div className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] space-y-space-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-tertiary-container/20 text-tertiary">
            <GraduationCap className="w-[20px] h-[20px]" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Term Performance
          </h3>
        </div>
        <div className="text-right">
          <span className="font-mono-code text-mono-code text-tertiary font-bold">
            3.86 Cumulative GPA
          </span>
        </div>
      </div>

      {/* Course Mastery Progress Bars */}
      <div className="space-y-3">
        {ACADEMIC_COURSES.map((course) => {
          return (
            <div key={course.name} className="space-y-1">
              <div className="flex items-center justify-between text-body-sm font-body-sm">
                <span className="text-on-surface font-medium">{course.name}</span>
                <span className={`font-mono-code text-mono-code ${course.colorClass.split(" ")[1]}`}>
                  {course.grade}
                </span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full transition-all duration-700 ${course.colorClass.split(" ")[0]}`}
                  style={{ width: `${course.percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Academic Distinction Footer */}
      <div className="pt-2 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant bg-surface-container/60 p-2.5 rounded-lg border border-white/[0.04] flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-tertiary flex-shrink-0" />
          <span className="font-medium">Dean&apos;s List Honors Track</span>
        </div>
        <span className="font-mono-code text-mono-code text-on-surface">
          14/14 Credits Completed
        </span>
      </div>
    </div>
  );
}
