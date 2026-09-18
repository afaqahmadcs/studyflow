"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassItem, DayOfWeek, ClassType } from "@/types/timetable";
import { CalendarPlus, Trash2 } from "lucide-react";

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (classData: Omit<ClassItem, "id" | "status">, editingId?: string) => void;
  onDelete?: (id: string) => void;
  initialData?: ClassItem | null;
}

export function ClassModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
}: ClassModalProps) {
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [day, setDay] = useState<DayOfWeek>("Monday");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:30");
  const [type, setType] = useState<ClassType>("lecture");
  const [colorTag, setColorTag] = useState<"primary" | "secondary" | "tertiary" | "secondary-fixed">("primary");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (initialData) {
      setSubjectCode(initialData.subjectCode);
      setSubjectName(initialData.subjectName);
      setTeacher(initialData.teacher);
      setRoom(initialData.room);
      setDay(initialData.day);
      setStartTime(initialData.startTime);
      setEndTime(initialData.endTime);
      setType(initialData.type);
      setColorTag(initialData.colorTag);
      setNotes(initialData.notes || "");
    } else {
      setSubjectCode("");
      setSubjectName("");
      setTeacher("");
      setRoom("");
      setDay("Monday");
      setStartTime("09:00");
      setEndTime("10:30");
      setType("lecture");
      setColorTag("primary");
      setNotes("");
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectCode.trim() || !subjectName.trim()) return;

    // Calculate duration in minutes
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const durationMinutes = Math.max(30, (endH * 60 + endM) - (startH * 60 + startM));

    onSave(
      {
        subjectCode: subjectCode.toUpperCase(),
        subjectName,
        teacher,
        room,
        day,
        startTime,
        endTime,
        durationMinutes,
        type,
        colorTag,
        notes,
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
          <CalendarPlus className="w-5 h-5 text-primary" />
          <span>{initialData ? "Edit Scheduled Class" : "Schedule New Class"}</span>
        </div>
      }
      description="Configure lecture or laboratory slot on the academic timetable"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject code & Name */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Subject Code *
            </label>
            <Input
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              placeholder="e.g. CS450"
              required
              autoFocus
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Subject Name *
            </label>
            <Input
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g. Operating Systems & Kernel Architecture"
              required
            />
          </div>
        </div>

        {/* Teacher & Room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Teacher / Instructor
            </label>
            <Input
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="e.g. Prof. Vance"
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Room / Venue
            </label>
            <Input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. Turing Memorial Hall"
            />
          </div>
        </div>

        {/* Day, Start Time, End Time */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Day of Week
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value as DayOfWeek)}
              className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Start Time
            </label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              End Time
            </label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Class Type & Color Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Format / Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ClassType)}
              className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary"
            >
              <option value="lecture">Lecture</option>
              <option value="lab">Laboratory (Lab)</option>
              <option value="seminar">Seminar / Discussion</option>
              <option value="tutorial">Tutorial / Office Hours</option>
            </select>
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Color Channel
            </label>
            <select
              value={colorTag}
              onChange={(e) => setColorTag(e.target.value as any)}
              className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary"
            >
              <option value="primary">Electric Indigo (Primary)</option>
              <option value="secondary">Cyan Stream (Secondary)</option>
              <option value="tertiary">Emerald Streak (Tertiary)</option>
              <option value="secondary-fixed">Sky Blue (Fixed)</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
            Class Notes / Topics
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Syllabus coverage, preparation instructions..."
            className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm p-3 rounded-lg border border-white/[0.08] focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          {initialData ? (
            <Button
              type="button"
              variant="danger"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={handleDelete}
            >
              Delete Class
            </Button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? "Save Changes" : "Add to Schedule"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
