"use client";

import React from "react";
import {
  User,
  Palette,
  Bell,
  BookOpen,
  Shield,
  RotateCcw,
} from "lucide-react";

export type SettingsTab =
  | "profile"
  | "appearance"
  | "notifications"
  | "academic"
  | "data-privacy";

interface SettingsHeaderProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  studentId?: string;
  lastBackupTime?: string;
}

const TABS: { id: SettingsTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance & Theme", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "academic", label: "Academic Rules", icon: BookOpen },
  { id: "data-privacy", label: "Data & Privacy", icon: Shield },
];

export function SettingsHeader({
  activeTab,
  onTabChange,
  studentId = "2022-CS-409",
  lastBackupTime = "4m ago",
}: SettingsHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl">
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="space-y-1">
          <div className="flex items-center gap-space-xs">
            <span className="font-mono-code text-[11px] text-primary uppercase tracking-widest font-semibold">
              Config Node // Academic ID {studentId}
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
            System &amp; Account Settings
          </h1>
          <p className="font-body-md text-[13px] text-on-surface-variant max-w-2xl">
            Manage profile telemetry, interface appearance, notifications, and academic execution rules.
          </p>
        </div>

        {/* Cloud Telemetry Sync Pill */}
        <div className="flex items-center gap-3 self-start md:self-auto bg-surface-container-highest/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/[0.04] shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary" />
          </span>
          <div className="flex flex-col">
            <span className="font-label-sm text-[12px] text-on-surface font-medium">
              Client storage active
            </span>
            <span className="font-mono-code text-[10px] text-on-surface-variant">
              Last synced {lastBackupTime}
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Navigation Dock */}
      <div className="mt-space-lg pt-space-md flex items-center gap-1.5 overflow-x-auto no-scrollbar border-t border-white/[0.04]">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-[13px] transition-all flex-shrink-0 ${
                isActive
                  ? "bg-surface-bright text-on-surface font-semibold shadow-md border border-white/[0.08]"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-outline"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
