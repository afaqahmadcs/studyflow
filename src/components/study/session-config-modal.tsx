"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimerSettings } from "@/types/study";
import { Sliders, Clock, Bell, RefreshCw } from "lucide-react";

interface SessionConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TimerSettings;
  onSaveSettings: (settings: TimerSettings) => void;
}

export function SessionConfigModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}: SessionConfigModalProps) {
  const [formData, setFormData] = useState<TimerSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Study Session Configuration"
      description="Fine-tune Pomodoro intervals, rest rhythms, and automation settings."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Pomodoro Focus (Mins)
            </label>
            <Input
              type="number"
              min={5}
              max={120}
              value={formData.pomodoroMinutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pomodoroMinutes: parseInt(e.target.value) || 25,
                })
              }
              icon={Clock}
            />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Short Break (Mins)
            </label>
            <Input
              type="number"
              min={1}
              max={30}
              value={formData.shortBreakMinutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shortBreakMinutes: parseInt(e.target.value) || 5,
                })
              }
              icon={Clock}
            />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Long Break (Mins)
            </label>
            <Input
              type="number"
              min={5}
              max={60}
              value={formData.longBreakMinutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  longBreakMinutes: parseInt(e.target.value) || 15,
                })
              }
              icon={Clock}
            />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Deep Flow (Mins)
            </label>
            <Input
              type="number"
              min={30}
              max={180}
              value={formData.deepFlowMinutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deepFlowMinutes: parseInt(e.target.value) || 50,
                })
              }
              icon={Clock}
            />
          </div>
        </div>

        {/* Toggle options */}
        <div className="space-y-2 pt-2 border-t border-white/[0.04]">
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high border border-white/[0.04]">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-secondary" />
              <div>
                <span className="font-label-md text-on-surface text-[12px] font-medium block">
                  Auto-Resume Next Cycle
                </span>
                <span className="text-on-surface-variant text-[11px]">
                  Automatically start next break/focus cycle without clicking
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.autoResume}
              onChange={(e) =>
                setFormData({ ...formData, autoResume: e.target.checked })
              }
              className="w-4 h-4 rounded bg-surface-container-highest text-primary accent-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high border border-white/[0.04]">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-tertiary" />
              <div>
                <span className="font-label-md text-on-surface text-[12px] font-medium block">
                  Audio & Bell Notifications
                </span>
                <span className="text-on-surface-variant text-[11px]">
                  Chime upon focus session completion
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.soundAlerts}
              onChange={(e) =>
                setFormData({ ...formData, soundAlerts: e.target.checked })
              }
              className="w-4 h-4 rounded bg-surface-container-highest text-primary accent-primary cursor-pointer"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary-glow" type="submit">
            Save Preferences
          </Button>
        </div>
      </form>
    </Modal>
  );
}
