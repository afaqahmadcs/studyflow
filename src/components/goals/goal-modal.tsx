"use client";

import React, { useState, useEffect } from "react";
import { Flag, X } from "lucide-react";
import { Goal, GoalType, GoalPriority } from "@/types/goals";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Partial<Goal>) => void;
  editingGoal?: Goal | null;
}

export function GoalModal({
  isOpen,
  onClose,
  onSave,
  editingGoal,
}: GoalModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<GoalType>("daily");
  const [subjectCode, setSubjectCode] = useState("CS450");
  const [priority, setPriority] = useState<GoalPriority>("medium");
  const [unit, setUnit] = useState("tasks");
  const [currentValue, setCurrentValue] = useState(0);
  const [targetValue, setTargetValue] = useState(1);
  const [deadline, setDeadline] = useState("Tonight, 11:59 PM");

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setDescription(editingGoal.description);
      setType(editingGoal.type);
      setSubjectCode(editingGoal.subjectCode);
      setPriority(editingGoal.priority);
      setUnit(editingGoal.unit);
      setCurrentValue(editingGoal.currentValue);
      setTargetValue(editingGoal.targetValue);
      setDeadline(editingGoal.deadline);
    } else {
      setTitle("");
      setDescription("");
      setType("daily");
      setSubjectCode("CS450");
      setPriority("medium");
      setUnit("tasks");
      setCurrentValue(0);
      setTargetValue(1);
      setDeadline("Tonight, 11:59 PM");
    }
  }, [editingGoal, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const subjectMap: Record<string, string> = {
      CS401: "Distributed Systems",
      CS450: "Operating Systems",
      CS320: "Database Systems",
      MATH310: "Linear Algebra",
      ALL: "All Courses",
    };

    onSave({
      ...(editingGoal ? { id: editingGoal.id } : {}),
      title: title.trim(),
      description: description.trim() || title.trim(),
      type,
      subjectCode,
      subjectName: subjectMap[subjectCode] || "Academics",
      target: `${targetValue} ${unit}`,
      currentValue: Number(currentValue),
      targetValue: Math.max(1, Number(targetValue)),
      unit,
      deadline,
      priority,
      status:
        currentValue >= targetValue
          ? "completed"
          : currentValue > 0
          ? "in_progress"
          : "pending",
      xpReward: type === "daily" ? 50 : type === "weekly" ? 100 : 250,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingGoal ? "Edit Academic Goal" : "Create Academic Goal"}
      description="Calibrate targets against sprint velocity"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-space-md mt-space-sm">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="font-label-md text-label-md text-on-surface font-medium text-[13px]">
            Goal Objective Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Score 90%+ in Linear Algebra Midterm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-[13px] px-space-md py-2.5 rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-white/[0.04]"
          />
        </div>

        {/* Category / Type Selector */}
        <div className="space-y-1.5">
          <label className="font-label-md text-label-md text-on-surface font-medium text-[13px]">
            Time Horizon • Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setType("daily")}
              className={cn(
                "px-3 py-2 rounded-lg font-label-sm text-[12px] font-semibold text-center transition-all border border-white/[0.04]",
                type === "daily"
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
              )}
            >
              Daily Micro
            </button>
            <button
              type="button"
              onClick={() => setType("weekly")}
              className={cn(
                "px-3 py-2 rounded-lg font-label-sm text-[12px] font-semibold text-center transition-all border border-white/[0.04]",
                type === "weekly"
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
              )}
            >
              Weekly Sprint
            </button>
            <button
              type="button"
              onClick={() => setType("academic")}
              className={cn(
                "px-3 py-2 rounded-lg font-label-sm text-[12px] font-semibold text-center transition-all border border-white/[0.04]",
                type === "academic"
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
              )}
            >
              Semester Plan
            </button>
          </div>
        </div>

        {/* Subject & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <div className="space-y-1.5">
            <label className="font-label-md text-label-md text-on-surface font-medium text-[13px]">
              Linked Academic Subject
            </label>
            <select
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-[13px] px-space-md py-2.5 rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-white/[0.04]"
            >
              <option value="CS401">CS401 Distributed Systems</option>
              <option value="CS450">CS450 Operating Systems</option>
              <option value="CS320">CS320 Database Systems</option>
              <option value="MATH310">MATH310 Linear Algebra</option>
              <option value="ALL">All Courses / Honors Track</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-label-md text-label-md text-on-surface font-medium text-[13px]">
              Priority Urgency
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["low", "medium", "critical"] as GoalPriority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={cn(
                    "py-2.5 rounded-lg font-mono-code text-[11px] font-medium text-center transition-all border border-white/[0.04]",
                    priority === p
                      ? p === "critical"
                        ? "bg-error-container/40 text-error font-bold"
                        : p === "medium"
                        ? "bg-secondary-container/30 text-secondary font-bold"
                        : "bg-primary-container/20 text-primary font-bold"
                      : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Targets (Unit, Current, Target) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
          <div className="space-y-1.5">
            <label className="font-label-md text-label-md text-on-surface font-medium text-[13px]">
              Metric Unit
            </label>
            <input
              type="text"
              placeholder="tasks / hrs / pages / GPA"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-[13px] px-space-md py-2 rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-white/[0.04]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-label-md text-label-md text-on-surface font-medium text-[13px]">
              Current Value
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={currentValue}
              onChange={(e) => setCurrentValue(parseFloat(e.target.value) || 0)}
              className="w-full bg-surface-container-lowest text-on-surface font-mono-code text-[13px] px-space-md py-2 rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-white/[0.04]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-label-md text-label-md text-on-surface font-medium text-[13px]">
              Target Benchmark
            </label>
            <input
              type="number"
              step="any"
              min="1"
              value={targetValue}
              onChange={(e) => setTargetValue(parseFloat(e.target.value) || 1)}
              className="w-full bg-surface-container-lowest text-on-surface font-mono-code text-[13px] px-space-md py-2 rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-white/[0.04]"
            />
          </div>
        </div>

        {/* Deadline */}
        <div className="space-y-1.5">
          <label className="font-label-md text-label-md text-on-surface font-medium text-[13px]">
            Deadline / Scheduled Time
          </label>
          <input
            type="text"
            placeholder="e.g. Tonight, 11:59 PM or Nov 14, 2025"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full bg-surface-container-lowest text-on-surface font-body-md text-[13px] px-space-md py-2.5 rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-white/[0.04]"
          />
        </div>

        {/* Description / Key Result */}
        <div className="space-y-1.5">
          <label className="font-label-md text-label-md text-on-surface font-medium text-[13px]">
            Description / Key Result Criteria
          </label>
          <textarea
            rows={2}
            placeholder="Details, acceptance criteria, or target milestones..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-surface-container-lowest text-on-surface font-body-md text-[13px] px-space-md py-2 rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-white/[0.04] resize-none"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-space-sm pt-space-sm">
          <Button variant="subtle" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {editingGoal ? "Save Changes" : "Create Goal"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
