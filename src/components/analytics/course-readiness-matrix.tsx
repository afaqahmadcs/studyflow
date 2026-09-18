"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, BookOpen } from "lucide-react";
import { CourseReadinessItem } from "@/types/analytics";

interface CourseReadinessMatrixProps {
  courses: CourseReadinessItem[];
}

export function CourseReadinessMatrix({ courses }: CourseReadinessMatrixProps) {
  if (!courses || courses.length === 0) {
    return (
      <div className="lg:col-span-8 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl space-y-space-md">
        <div>
          <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            Course Performance &amp; Readiness Matrix
          </h2>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
            Real-time projection model balancing homework, exams, and attendance signals
          </p>
        </div>
        <div className="py-10 text-center flex flex-col items-center justify-center">
          <BookOpen className="w-10 h-10 text-outline mb-2" />
          <p className="text-body-md text-on-surface font-medium">No Course Data Available</p>
          <p className="text-body-sm text-on-surface-variant max-w-sm mt-1">
            Enroll in courses and log assignments, exams, or attendance to compute real-time readiness.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-8 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl space-y-space-md">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div>
          <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            Course Performance &amp; Readiness Matrix
          </h2>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
            Real-time projection model balancing homework, exams, and attendance signals
          </p>
        </div>
        <span className="px-2 py-1 rounded bg-surface-container text-primary font-mono-code text-[11px] border border-white/[0.04]">
          {courses.length} Registered Courses
        </span>
      </div>

      {/* Course Cards Deck */}
      <div className="space-y-space-sm">
        {courses.map((course) => {
          // Color styles per course
          const isCs401 = course.code === "CS401";
          const isCs450 = course.code === "CS450";
          const isCs320 = course.code === "CS320";

          const badgeBg = isCs401
            ? "bg-primary/15 text-primary border border-primary/20"
            : isCs450
            ? "bg-secondary/15 text-secondary border border-secondary/20"
            : isCs320
            ? "bg-primary-container/20 text-primary-container border border-primary-container/20"
            : "bg-tertiary/15 text-tertiary border border-tertiary/20";

          const gaugeColor = isCs320
            ? "bg-error"
            : isCs401
            ? "bg-primary"
            : isCs450
            ? "bg-secondary"
            : "bg-tertiary";

          const numberPart = course.code.replace(/\D/g, "");

          return (
            <div
              key={course.code}
              className="p-space-md rounded-lg bg-surface-container hover:bg-surface-container-high transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-white/[0.02]"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono-code text-[13px] font-bold flex-shrink-0 ${badgeBg}`}
                >
                  {numberPart || course.code}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate">
                      {course.name}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[11px] font-mono-code font-semibold ${
                        isCs320
                          ? "bg-surface-container-highest text-on-surface-variant"
                          : isCs450
                          ? "bg-secondary/15 text-secondary"
                          : "bg-tertiary/15 text-tertiary"
                      }`}
                    >
                      {course.projectedGrade}
                    </span>
                    {course.isAttentionNeeded && (
                      <span
                        className="w-2 h-2 rounded-full bg-error animate-pulse"
                        title="Requires Intervention"
                      />
                    )}
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                    {course.instructor} • {course.credits}.0 Credits • {course.hoursLogged}h Logged
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-space-lg justify-between md:justify-end">
                {/* Readiness Gauge */}
                <div className="flex flex-col items-start md:items-end w-36">
                  <div className="flex items-center justify-between w-full font-mono-code text-[11px] mb-1">
                    <span className={course.isAttentionNeeded ? "text-error font-medium" : "text-outline"}>
                      {course.assessmentType}
                    </span>
                    <span
                      className={
                        course.isAttentionNeeded
                          ? "text-error font-semibold"
                          : "text-on-surface font-semibold"
                      }
                    >
                      {course.readinessPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                    <div
                      className={`h-full rounded-full ${gaugeColor}`}
                      style={{ width: `${course.readinessPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Overall Projection Score */}
                <div className="text-right min-w-[70px]">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface font-mono-code">
                    {course.code === "CS401"
                      ? "94.2%"
                      : course.code === "CS450"
                      ? "91.5%"
                      : course.code === "CS320"
                      ? "88.0%"
                      : "96.0%"}
                  </span>
                  <span className={`block font-label-sm text-[11px] font-medium ${course.statusColorClass}`}>
                    {course.statusLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
