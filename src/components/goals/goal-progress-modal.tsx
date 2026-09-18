"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Goal } from "@/types/goals";
import { Plus, Minus, Check } from "lucide-react";

interface GoalProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal | null;
  onUpdate: (goalId: string, newProgress: number) => void;
}

export function GoalProgressModal({
  isOpen,
  onClose,
  goal,
  onUpdate,
}: GoalProgressModalProps) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (goal) setVal(goal.currentValue);
  }, [goal, isOpen]);

  if (!goal) return null;

  const handleSave = () => {
    onUpdate(goal.id, Number(val));
    onClose();
  };

  const handleMarkDone = () => {
    onUpdate(goal.id, goal.targetValue);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Calibrate Progress"
      description={`Update progress for: ${goal.title}`}
      maxWidth="sm"
    >
      <div className="space-y-space-md mt-space-sm">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-white/[0.04] text-center space-y-2">
          <span className="font-label-sm text-outline uppercase tracking-wider text-[11px]">
            Current Benchmark
          </span>
          <div className="font-mono-code text-[36px] font-bold text-on-surface">
            {val} <span className="text-[16px] text-outline">/ {goal.targetValue} {goal.unit}</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, Math.round((val / goal.targetValue) * 100))}%`,
              }}
            />
          </div>
        </div>

        {/* Quick Bump Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setVal((prev) => Math.max(0, Number((prev - 1).toFixed(1))))}
            className="py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-mono-code text-[12px] flex items-center justify-center gap-1 border border-white/[0.04]"
          >
            <Minus className="w-3.5 h-3.5" /> 1
          </button>
          <button
            onClick={() => setVal((prev) => Number((prev + 1).toFixed(1)))}
            className="py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-mono-code text-[12px] flex items-center justify-center gap-1 border border-white/[0.04]"
          >
            <Plus className="w-3.5 h-3.5" /> 1
          </button>
          <button
            onClick={() => setVal((prev) => Number((prev + 5).toFixed(1)))}
            className="py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-mono-code text-[12px] flex items-center justify-center gap-1 border border-white/[0.04]"
          >
            <Plus className="w-3.5 h-3.5" /> 5
          </button>
          <button
            onClick={handleMarkDone}
            className="py-2 rounded-lg bg-tertiary-container/30 hover:bg-tertiary-container/50 text-tertiary font-mono-code text-[12px] flex items-center justify-center gap-1 border border-tertiary/20"
          >
            <Check className="w-3.5 h-3.5" /> 100%
          </button>
        </div>

        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Progress
          </Button>
        </div>
      </div>
    </Modal>
  );
}
