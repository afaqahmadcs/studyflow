"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AssignmentItem,
  AssignmentPriority,
  AssignmentStatus,
} from "@/types/assignment";
import { ClipboardPlus, Trash2 } from "lucide-react";

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    assignmentData: Omit<AssignmentItem, "id" | "completed">,
    editingId?: string
  ) => void;
  onDelete?: (id: string) => void;
  initialData?: AssignmentItem | null;
}

export function AssignmentModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
}: AssignmentModalProps) {
  const [title, setTitle] = useState("");
  const [subjectCode, setSubjectCode] = useState("CS450");
  const [subjectName, setSubjectName] = useState("Operating Systems & Kernel Architecture");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("2025-10-31");
  const [dueDisplay, setDueDisplay] = useState("Due: Friday, Oct 31");
  const [priority, setPriority] = useState<AssignmentPriority>("medium");
  const [status, setStatus] = useState<AssignmentStatus>("in_progress");
  const [progress, setProgress] = useState(0);
  const [specs, setSpecs] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSubjectCode(initialData.subjectCode);
      setSubjectName(initialData.subjectName);
      setDescription(initialData.description);
      setDueDate(initialData.dueDate);
      setDueDisplay(initialData.dueDisplay);
      setPriority(initialData.priority);
      setStatus(initialData.status);
      setProgress(initialData.progress);
      setSpecs(initialData.specs || "");
      setTagsInput(initialData.tags ? initialData.tags.join(", ") : "");
    } else {
      setTitle("");
      setSubjectCode("CS450");
      setSubjectName("Operating Systems & Kernel Architecture");
      setDescription("");
      setDueDate("2025-10-31");
      setDueDisplay("Due: Friday, Oct 31");
      setPriority("medium");
      setStatus("in_progress");
      setProgress(0);
      setSpecs("");
      setTagsInput("");
    }
  }, [initialData, isOpen]);

  const handleSubjectChange = (code: string) => {
    setSubjectCode(code);
    if (code === "CS450") setSubjectName("Operating Systems & Kernel Architecture");
    else if (code === "CS401") setSubjectName("Distributed Systems Architecture");
    else if (code === "CS320") setSubjectName("Database Engineering & Index Internals");
    else if (code === "MATH310") setSubjectName("Applied Linear Algebra: SVD & Projections");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSave(
      {
        title,
        subjectCode,
        subjectName,
        description,
        dueDate,
        dueDisplay: dueDisplay.trim() || `Due: ${dueDate}`,
        priority,
        status,
        progress,
        specs,
        tags,
      },
      initialData?.id
    );
    onClose();
  };

  const handleDelete = () => {
    if (initialData?.id && onDelete) {
      onDelete(initialData.id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <ClipboardPlus className="w-5 h-5 text-primary" />
          <span>{initialData ? "Edit Deliverable" : "Create New Assignment"}</span>
        </div>
      }
      description="Add coursework deliverable with deadline and telemetry tracking"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
            Deliverable Title *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Distributed Key-Value Store Part 2"
            required
            autoFocus
          />
        </div>

        {/* Course & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Course / Subject
            </label>
            <select
              value={subjectCode}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary"
            >
              <option value="CS450">CS450: Operating Systems</option>
              <option value="CS401">CS401: Distributed Systems</option>
              <option value="CS320">CS320: Database Engineering</option>
              <option value="MATH310">MATH310: Applied Linear Algebra</option>
            </select>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as AssignmentPriority)}
              className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary"
            >
              <option value="critical">Critical (&lt; 24 Hours Remaining)</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Standard / Low Priority</option>
            </select>
          </div>
        </div>

        {/* Status & Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => {
                const s = e.target.value as AssignmentStatus;
                setStatus(s);
                if (s === "completed") setProgress(100);
                else if (progress === 100) setProgress(50);
              }}
              className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-label-sm text-label-sm text-on-surface-variant">
                Completion Progress
              </label>
              <span className="font-mono-code text-xs text-primary font-bold">
                {progress}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={progress}
              onChange={(e) => {
                const p = Number(e.target.value);
                setProgress(p);
                if (p === 100) setStatus("completed");
                else if (status === "completed") setStatus("in_progress");
              }}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
        </div>

        {/* Due Date & Due Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Due Date
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Due Text Display
            </label>
            <Input
              value={dueDisplay}
              onChange={(e) => setDueDisplay(e.target.value)}
              placeholder="e.g. Due Today, 11:59 PM (9h left)"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
            Brief Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Key objectives, rubric specs, or submission notes..."
            className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm p-3 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Specs & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Technical Specs / Validation
            </label>
            <Input
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              placeholder="e.g. 450 lines C99 code • Valgrind Check"
            />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Tags (comma separated)
            </label>
            <Input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. C99, Kernel, Memory"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          {initialData ? (
            <Button
              type="button"
              variant="danger"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={handleDelete}
            >
              Delete Deliverable
            </Button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? "Save Changes" : "Create Deliverable"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
