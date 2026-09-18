"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AttendanceStatus, SubjectAttendance } from "@/types/attendance";
import { CalendarPlus, BookOpen, MapPin, UserCheck } from "lucide-react";

interface CustomClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: SubjectAttendance[];
  onLogClass: (data: {
    code: string;
    courseName: string;
    location: string;
    status: AttendanceStatus;
    faculty: string;
    notes?: string;
  }) => void;
}

export function CustomClassModal({
  isOpen,
  onClose,
  subjects,
  onLogClass,
}: CustomClassModalProps) {
  const [selectedCode, setSelectedCode] = useState(subjects[0]?.code || "CS401");
  const [location, setLocation] = useState("Auditorium 1 • Seat A-12");
  const [status, setStatus] = useState<AttendanceStatus>("present");
  const [faculty, setFaculty] = useState("Prof. Dr. Aris Thorne");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = subjects.find((s) => s.code === selectedCode);
    const courseName = sub ? `${sub.code} Lecture` : `${selectedCode} Session`;

    onLogClass({
      code: selectedCode,
      courseName,
      location,
      status,
      faculty,
      notes,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Custom Class / Session"
      description="Record an ad-hoc session, guest lecture, or institutional make-up class."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Subject select */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
            Course Unit *
          </label>
          <select
            value={selectedCode}
            onChange={(e) => {
              const code = e.target.value;
              setSelectedCode(code);
              const sub = subjects.find((s) => s.code === code);
              if (sub) setFaculty(sub.instructor);
            }}
            className="w-full bg-surface-container-high text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg border border-white/[0.06] focus:outline-none focus:border-primary"
          >
            {subjects.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} • {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
            Attendance Verification Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setStatus("present")}
              className={`py-2 rounded-lg font-label-sm text-label-sm font-semibold transition-all border ${
                status === "present"
                  ? "bg-tertiary-container/30 text-tertiary border-tertiary"
                  : "bg-surface-container-high text-on-surface-variant border-white/[0.04]"
              }`}
            >
              Present ✓
            </button>
            <button
              type="button"
              onClick={() => setStatus("excused")}
              className={`py-2 rounded-lg font-label-sm text-label-sm font-semibold transition-all border ${
                status === "excused"
                  ? "bg-secondary/20 text-secondary border-secondary"
                  : "bg-surface-container-high text-on-surface-variant border-white/[0.04]"
              }`}
            >
              Excused Leave
            </button>
            <button
              type="button"
              onClick={() => setStatus("absent")}
              className={`py-2 rounded-lg font-label-sm text-label-sm font-semibold transition-all border ${
                status === "absent"
                  ? "bg-error-container/40 text-error border-error"
                  : "bg-surface-container-high text-on-surface-variant border-white/[0.04]"
              }`}
            >
              Absent
            </button>
          </div>
        </div>

        {/* Location & Faculty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Venue / Room
            </label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              icon={MapPin}
              placeholder="e.g. Lab Omega"
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Faculty Sign-Off
            </label>
            <Input
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              icon={UserCheck}
              placeholder="e.g. Prof. Maya Lin"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
            Remarks / Medical Ref (Optional)
          </label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. University seminar presentation attendance credit"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary-glow" type="submit">
            Record Class
          </Button>
        </div>
      </form>
    </Modal>
  );
}
