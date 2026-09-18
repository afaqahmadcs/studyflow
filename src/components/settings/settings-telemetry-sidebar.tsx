"use client";

import React from "react";
import {
  HardDrive,
  Activity,
  CheckCircle2,
  Save,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { StorageQuotaInfo } from "@/types/settings";

interface SettingsTelemetrySidebarProps {
  quotaInfo: StorageQuotaInfo;
  isSaving: boolean;
  onSave: () => void;
  onResetToDefault: () => void;
  hasUnsavedChanges?: boolean;
}

export function SettingsTelemetrySidebar({
  quotaInfo,
  isSaving,
  onSave,
  onResetToDefault,
  hasUnsavedChanges,
}: SettingsTelemetrySidebarProps) {
  const radius = 15.9155;
  const circumference = 100;
  const strokeDashoffset = circumference - (quotaInfo.percentageUsed / 100) * circumference;

  return (
    <div className="lg:col-span-4 flex flex-col gap-space-lg">
      {/* Card A: Local Telemetry Store */}
      <div className="rounded-xl bg-surface-container-low p-space-md border border-white/[0.04] shadow-md space-y-space-md">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-primary" />
            <span className="font-headline-sm text-sm text-on-surface font-semibold">
              Local Telemetry Store
            </span>
          </div>
          <span className="font-mono-code text-[11px] text-tertiary">IndexedDB / LS</span>
        </div>

        {/* Concentric SVG Usage Ring */}
        <div className="flex items-center gap-4 p-space-sm rounded-lg bg-surface-container border border-white/[0.02]">
          <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-surface-container-highest"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-secondary transition-all duration-500"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${quotaInfo.percentageUsed}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono-code text-[11px] font-semibold text-on-surface">
                {quotaInfo.percentageUsed}%
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-1 min-w-0">
            <span className="font-label-md text-xs text-on-surface font-medium truncate">
              {quotaInfo.formattedUsed} / {quotaInfo.formattedQuota} Quota
            </span>
            {quotaInfo.moduleBreakdown.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-[11px] font-mono-code text-on-surface-variant truncate"
              >
                <span className={`w-2 h-2 rounded-full ${m.color}`} />
                <span>
                  {m.sizeFormatted} {m.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata Telemetry */}
        <div className="space-y-2 pt-1 border-t border-white/[0.04]">
          <div className="flex items-center justify-between text-[11px] font-mono-code">
            <span className="text-on-surface-variant">Storage Latency</span>
            <span className="text-tertiary font-semibold">18ms (Direct)</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono-code">
            <span className="text-on-surface-variant">Device Fingerprint</span>
            <span className="text-on-surface">0x88F...4C2A</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono-code">
            <span className="text-on-surface-variant">Active Storage Nodes</span>
            <span className="text-primary font-semibold">8 Subsystems Active</span>
          </div>
        </div>
      </div>

      {/* Card B: System State Monitors */}
      <div className="rounded-xl bg-surface-container-low p-space-md border border-white/[0.04] shadow-md space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-white/[0.04]">
          <span className="font-headline-sm text-sm text-on-surface font-semibold">
            System State Monitors
          </span>
          <Activity className="w-4 h-4 text-primary" />
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container">
            <span className="text-on-surface-variant flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" /> Client Datastore
            </span>
            <span className="font-mono-code text-[11px] text-tertiary">Synchronized</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container">
            <span className="text-on-surface-variant flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> Theme Controller
            </span>
            <span className="font-mono-code text-[11px] text-secondary">Active</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container">
            <span className="text-on-surface-variant flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Cache Fragmentation
            </span>
            <span className="font-mono-code text-[11px] text-primary">0.0%</span>
          </div>
        </div>
      </div>

      {/* Card C: Save Settings Action Box */}
      <div className="rounded-xl bg-surface-container-low p-space-md border border-white/[0.04] shadow-md space-y-3 sticky top-24">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-on-surface">Settings Actions</span>
          {hasUnsavedChanges && (
            <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-mono-code text-[10px] font-semibold animate-pulse">
              Unsaved Changes
            </span>
          )}
        </div>

        <p className="text-[11px] text-on-surface-variant leading-relaxed">
          Configuration changes persist immediately to your centralized browser datastore.
        </p>

        <div className="space-y-2">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs font-semibold transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <Save className={`w-4 h-4 ${isSaving ? "animate-spin" : ""}`} />
            <span>{isSaving ? "Saving..." : "Save Settings"}</span>
          </button>

          <button
            type="button"
            onClick={onResetToDefault}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-medium border border-white/[0.04] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
