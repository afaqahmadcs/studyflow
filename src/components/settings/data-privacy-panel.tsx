"use client";

import React, { useState, useRef } from "react";
import {
  ShieldAlert,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  exportAllApplicationData,
  importAllApplicationData,
  resetToSampleData,
  clearAllApplicationData,
} from "@/lib/storage";
import { ApplicationBackup } from "@/types/settings";
import { useToast } from "@/components/ui/toast";

interface DataPrivacyPanelProps {
  onDataMutated: () => void;
}

export function DataPrivacyPanel({ onDataMutated }: DataPrivacyPanelProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Export JSON Backup
  const handleExportBackup = () => {
    try {
      const backup = exportAllApplicationData();
      const jsonStr = JSON.stringify(backup, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const dateStr = new Date().toISOString().split("T")[0];
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `student_command_center_backup_${dateStr}.json`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Backup Exported Successfully",
        description: "Saved full application JSON archive to your downloads.",
        type: "success",
      });
    } catch {
      toast({
        title: "Export Failed",
        description: "Unable to serialize application data.",
        type: "error",
      });
    }
  };

  // Trigger File Input for Import
  const handleTriggerImport = () => {
    fileInputRef.current?.click();
  };

  // Handle File Selected for Import
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text) as ApplicationBackup;
        const success = importAllApplicationData(parsed);

        if (success) {
          toast({
            title: "Backup Restored Successfully",
            description: "All coursework, exams, and logs synchronized.",
            type: "success",
          });
          onDataMutated();
        } else {
          toast({
            title: "Import Error",
            description: "Backup JSON has an invalid or incompatible schema.",
            type: "error",
          });
        }
      } catch {
        toast({
          title: "Import Failed",
          description: "Could not parse uploaded file as valid JSON.",
          type: "error",
        });
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset input
  };

  // Execute Reset to Sample Data
  const handleExecuteReset = () => {
    resetToSampleData();
    setConfirmResetOpen(false);
    toast({
      title: "Sample Data Restored",
      description: "Default coursework, timetable, and study stats re-seeded.",
      type: "info",
    });
    onDataMutated();
  };

  // Execute Clear All Data
  const handleExecuteClear = () => {
    clearAllApplicationData();
    setConfirmClearOpen(false);
    toast({
      title: "Application Data Cleared",
      description: "All localized records and cache have been wiped.",
      type: "info",
    });
    onDataMutated();
  };

  return (
    <section className="rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-md space-y-space-md">
      {/* Hidden File Input for Backup Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-space-sm">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-error/10 text-error border border-error/20">
            <ShieldAlert className="w-4 h-4" />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Data Management &amp; Privacy
            </h2>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              Manage your localized academic datastore, telemetry traces, and backups.
            </p>
          </div>
        </div>
        <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium border border-white/[0.04]">
          AES-256 Storage
        </span>
      </div>

      {/* Primary Export & Import Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
        <button
          type="button"
          onClick={handleExportBackup}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-medium border border-white/[0.04] transition-all shadow-sm group"
        >
          <Download className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          <span>Export All Data (Full JSON Backup)</span>
        </button>

        <button
          type="button"
          onClick={handleTriggerImport}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-medium border border-white/[0.04] transition-all shadow-sm group"
        >
          <Upload className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
          <span>Import &amp; Restore Backup</span>
        </button>
      </div>

      {/* Danger Zone Box */}
      <div className="p-space-md rounded-xl bg-error-container/15 border border-error/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-error">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-headline-sm text-sm font-semibold">
              Restricted Operations (Danger Zone)
            </span>
          </div>
          <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-error-container/30 text-error font-medium border border-error/30">
            Irreversible
          </span>
        </div>

        <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
          Resetting term progress restores the factory demo state with curated coursework, attendance, and study history. Clearing all data erases all browser localStorage entries for this command center.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-error-container/30 hover:bg-error-container/60 text-error font-label-md text-xs font-medium transition-all border border-error/20"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sample Data</span>
          </button>

          <button
            type="button"
            onClick={() => setConfirmClearOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-error hover:bg-error/90 text-on-error font-label-md text-xs font-medium shadow-sm transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Application Data</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-warning">
              <RotateCcw className="w-6 h-6 text-primary" />
              <h3 className="font-headline-sm text-base font-semibold text-on-surface">
                Reset to Sample Data?
              </h3>
            </div>
            <p className="text-body-sm text-xs text-on-surface-variant leading-relaxed">
              This will overwrite your current coursework, study logs, attendance records, and goals with the clean institutional sample dataset.
            </p>
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteReset}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary text-xs font-medium hover:bg-primary transition-all"
              >
                Yes, Restore Sample Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-surface-container-low border border-error/40 shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-error">
              <Trash2 className="w-6 h-6 text-error" />
              <h3 className="font-headline-sm text-base font-semibold text-on-surface">
                Permanently Clear All Data?
              </h3>
            </div>
            <p className="text-body-sm text-xs text-on-surface-variant leading-relaxed">
              Warning: This will delete all localized application data from this browser, leaving an empty slate. This action cannot be undone unless you have a recent JSON backup export.
            </p>
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmClearOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteClear}
                className="px-4 py-2 rounded-lg bg-error hover:bg-error/90 text-on-error text-xs font-medium transition-all"
              >
                Wipe All Storage
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
