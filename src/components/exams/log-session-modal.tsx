"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExamItem, StudySession } from "@/types/exam";
import { Timer, BookOpen, Clock } from "lucide-react";

interface LogSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamItem | null;
  onSaveSession: (examId: string, session: StudySession) => void;
}

export function LogSessionModal({
  isOpen,
  onClose,
  exam,
  onSaveSession,
}: LogSessionModalProps) {
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [sessionType, setSessionType] = useState("Deep Focus Session");

  if (!exam) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newSession: StudySession = {
      id: `sess-${Date.now()}`,
      title,
      date: "Today",
      durationMinutes,
      type: sessionType,
    };

    onSaveSession(exam.id, newSession);
    setTitle("");
    setDurationMinutes(60);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Log Study Session • ${exam.code}`}
      description={`Track focused revision volume for ${exam.subjectName}.`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
            Session Focus Title *
          </label>
          <Input
            required
            placeholder="e.g. Raft leader election trace simulations"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            icon={BookOpen}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Duration (Minutes) *
            </label>
            <Input
              type="number"
              min={10}
              max={600}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 30)}
              icon={Clock}
            />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Session Category
            </label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full bg-surface-container-high text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.06] focus:outline-none focus:border-primary"
            >
              <option value="Deep Focus Session">Deep Focus Session</option>
              <option value="Past Paper Drill">Past Paper Drill</option>
              <option value="Textbook Problem Set">Textbook Problem Set</option>
              <option value="Lab Practicum">Lab Practicum</option>
              <option value="Group Revision">Group Revision</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary-glow" type="submit">
            Log Session
          </Button>
        </div>
      </form>
    </Modal>
  );
}
