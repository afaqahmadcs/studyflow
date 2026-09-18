"use client";

import React from "react";
import {
  BellRing,
  Clock,
  AlertTriangle,
  Mail,
  CalendarCheck,
  Flag,
  Volume2,
} from "lucide-react";
import { NotificationSettings } from "@/types/settings";

interface NotificationsPanelProps {
  notifications: NotificationSettings;
  onChange: (updated: NotificationSettings) => void;
}

export function NotificationsPanel({ notifications, onChange }: NotificationsPanelProps) {
  const handleToggle = (field: keyof NotificationSettings) => {
    onChange({
      ...notifications,
      [field]: !notifications[field],
    });
  };

  const notificationItems = [
    {
      key: "classStartReminders" as const,
      title: "Class start reminders",
      description: "Trigger audio ping & desktop notice 10 minutes prior to scheduled lecture",
      icon: Clock,
      color: "text-primary",
    },
    {
      key: "assignmentDeadlineAlerts" as const,
      title: "Assignment deadline alerts",
      description: "Multi-stage push notices at 24 hours and 3 hours before LMS portal submission close",
      icon: AlertTriangle,
      color: "text-error",
    },
    {
      key: "attendanceThresholdWarnings" as const,
      title: "Attendance threshold sensitivity warnings",
      description: "Escalate alert when attendance margin for any registered course drops beneath 85%",
      icon: AlertTriangle,
      color: "text-secondary",
    },
    {
      key: "dailyMorningBriefing" as const,
      title: "Daily morning agenda briefing email",
      description: "Dispatched daily at 06:30 containing lecture timetable, pending tickets, and deadlines",
      icon: Mail,
      color: "text-outline",
    },
    {
      key: "examCountdownNudges" as const,
      title: "Exam countdown & readiness nudges",
      description: "Daily spaced-repetition prompts for midterms and final examination dates",
      icon: CalendarCheck,
      color: "text-primary",
    },
    {
      key: "goalPaceReminders" as const,
      title: "Goal pace & sprint reminders",
      description: "Telemetry nudges when daily micro-targets or weekly sprint pace are lagging",
      icon: Flag,
      color: "text-tertiary",
    },
    {
      key: "soundAlerts" as const,
      title: "Native Web Audio feedback pings",
      description: "Play chime soundscapes when timer finishes, classes begin, or milestones unlock",
      icon: Volume2,
      color: "text-secondary",
    },
  ];

  return (
    <section className="rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-md space-y-space-md">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-space-sm">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary border border-tertiary/20">
            <BellRing className="w-4 h-4" />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Notification Preferences
            </h2>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              Route critical academic interrupts without cognitive overload.
            </p>
          </div>
        </div>
        <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-surface-container-highest text-tertiary font-medium border border-white/[0.04]">
          Real-Time Sync
        </span>
      </div>

      {/* Clean Toggles List */}
      <div className="space-y-2.5">
        {notificationItems.map((item) => {
          const Icon = item.icon;
          const isChecked = notifications[item.key];

          return (
            <div
              key={item.key}
              onClick={() => handleToggle(item.key)}
              className="flex items-center justify-between p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer border border-white/[0.02]"
            >
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <span className={`p-1.5 rounded-md bg-surface-container-highest flex-shrink-0 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-sm text-on-surface font-medium truncate">
                    {item.title}
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {item.description}
                  </span>
                </div>
              </div>

              {/* iOS-style toggle switch */}
              <div className="relative inline-flex items-center flex-shrink-0">
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${
                    isChecked ? "bg-primary-container" : "bg-surface-container-highest"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform transform mt-0.5 ml-0.5 shadow-sm ${
                      isChecked ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
