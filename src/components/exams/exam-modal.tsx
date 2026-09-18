"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExamItem, ExamStatus } from "@/types/exam";
import { CalendarCheck, BookOpen, Clock, MapPin, Percent } from "lucide-react";

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ExamItem>) => void;
  initialData?: ExamItem | null;
}

export function ExamModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ExamModalProps) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState<{
    code: string;
    subjectName: string;
    title: string;
    examDate: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    room: string;
    weightPercentage: number;
    preparationPercentage: number;
    status: ExamStatus;
    discipline: "CS" | "MATH" | "ENG" | "OTHER";
    rulesNote: string;
  }>({
    code: "",
    subjectName: "",
    title: "",
    examDate: new Date().toISOString().split("T")[0],
    startTime: "10:00",
    endTime: "12:00",
    durationMinutes: 120,
    room: "Auditorium 1",
    weightPercentage: 30,
    preparationPercentage: 50,
    status: "scheduled",
    discipline: "CS",
    rulesNote: "1 Page Handwritten Cheatsheet Allowed",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code,
        subjectName: initialData.subjectName,
        title: initialData.title,
        examDate: initialData.examDate,
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        durationMinutes: initialData.durationMinutes,
        room: initialData.room,
        weightPercentage: initialData.weightPercentage,
        preparationPercentage: initialData.preparationPercentage,
        status: initialData.status,
        discipline: initialData.discipline,
        rulesNote: initialData.rulesNote || "",
      });
    } else {
      setFormData({
        code: "",
        subjectName: "",
        title: "",
        examDate: new Date().toISOString().split("T")[0],
        startTime: "10:00",
        endTime: "12:00",
        durationMinutes: 120,
        room: "Auditorium 1",
        weightPercentage: 30,
        preparationPercentage: 50,
        status: "scheduled",
        discipline: "CS",
        rulesNote: "1 Page Handwritten Cheatsheet Allowed",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.subjectName) return;

    onSave({
      ...formData,
      title: formData.title || `${formData.code} Evaluation`,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Exam Evaluation" : "Register New Exam"}
      description="Configure curriculum examination schedule, room venue, and grading weight."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Code & Discipline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Course Code *
            </label>
            <Input
              required
              placeholder="e.g. CS401"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              icon={BookOpen}
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Discipline
            </label>
            <select
              value={formData.discipline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discipline: e.target.value as "CS" | "MATH" | "ENG" | "OTHER",
                })
              }
              className="w-full bg-surface-container-high text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.06] focus:outline-none focus:border-primary"
            >
              <option value="CS">Computer Science (CS)</option>
              <option value="MATH">Mathematics (MATH)</option>
              <option value="ENG">Engineering (ENG)</option>
              <option value="OTHER">Other Discipline</option>
            </select>
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Evaluation Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as ExamStatus,
                })
              }
              className="w-full bg-surface-container-high text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.06] focus:outline-none focus:border-primary"
            >
              <option value="critical">Critical (Imminent)</option>
              <option value="upcoming">Upcoming (Within 2 wks)</option>
              <option value="scheduled">Scheduled (Future)</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Subject Name & Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Subject Name *
            </label>
            <Input
              required
              placeholder="e.g. Distributed Systems"
              value={formData.subjectName}
              onChange={(e) =>
                setFormData({ ...formData, subjectName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Evaluation Title
            </label>
            <Input
              placeholder="e.g. Midterm Assessment"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
        </div>

        {/* Date, Time & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Exam Date *
            </label>
            <input
              type="date"
              required
              value={formData.examDate}
              onChange={(e) =>
                setFormData({ ...formData, examDate: e.target.value })
              }
              className="w-full bg-surface-container-high text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.06] focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              className="w-full bg-surface-container-high text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.06] focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Duration (Minutes)
            </label>
            <Input
              type="number"
              min={15}
              max={360}
              value={formData.durationMinutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  durationMinutes: parseInt(e.target.value) || 60,
                })
              }
              icon={Clock}
            />
          </div>
        </div>

        {/* Venue, Weight & Initial Readiness */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Venue / Room
            </label>
            <Input
              placeholder="e.g. Auditorium 1, Seat D-14"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              icon={MapPin}
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Grade Weight %
            </label>
            <Input
              type="number"
              min={1}
              max={100}
              value={formData.weightPercentage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  weightPercentage: parseInt(e.target.value) || 20,
                })
              }
              icon={Percent}
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Readiness %
            </label>
            <Input
              type="number"
              min={0}
              max={100}
              value={formData.preparationPercentage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preparationPercentage: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        {/* Rules & Cheatsheet Policy */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
            Exam Rules / Cheatsheet Allowance
          </label>
          <Input
            placeholder="e.g. Handwritten Cheatsheet: 1 Sheet Allowed • Closed book"
            value={formData.rulesNote}
            onChange={(e) =>
              setFormData({ ...formData, rulesNote: e.target.value })
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary-glow" type="submit">
            {isEditing ? "Save Changes" : "Register Exam"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
