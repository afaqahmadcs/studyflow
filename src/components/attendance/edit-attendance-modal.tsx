"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AttendanceLogRecord, AttendanceStatus } from "@/types/attendance";
import { Edit2, MapPin, UserCheck } from "lucide-react";

interface EditAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: AttendanceLogRecord | null;
  onSaveRecord: (record: AttendanceLogRecord) => void;
}

export function EditAttendanceModal({
  isOpen,
  onClose,
  record,
  onSaveRecord,
}: EditAttendanceModalProps) {
  const [status, setStatus] = useState<AttendanceStatus>("present");
  const [location, setLocation] = useState("");
  const [faculty, setFaculty] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (record) {
      setStatus(record.status);
      setLocation(record.location);
      setFaculty(record.faculty);
      setNotes(record.notes || "");
    }
  }, [record, isOpen]);

  if (!record) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveRecord({
      ...record,
      status,
      location,
      faculty,
      notes,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Audit Record • ${record.auditId}`}
      description={`Revise institutional verification entry for ${record.courseName}.`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="p-2.5 rounded-lg bg-surface-container-high border border-white/[0.04] text-[12px] flex justify-between items-center font-mono-code">
          <span className="text-on-surface-variant">{record.timestamp}</span>
          <span className="text-primary font-bold">{record.code}</span>
        </div>

        {/* Status Selection */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
            Status Override
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
              Location
            </label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              icon={MapPin}
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
              Faculty Verification
            </label>
            <Input
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              icon={UserCheck}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
            Reason / Audit Justification
          </label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Faculty confirmed attendance via manual RFID override"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary-glow" type="submit">
            Save Record
          </Button>
        </div>
      </form>
    </Modal>
  );
}
