"use client";

import React from "react";
import { Bell, Clock, AlertTriangle, BookOpen, CheckCircle } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: "urgent" | "schedule" | "academic";
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "Kernel Memory Allocator Deadline Approaching",
    desc: "CS450 submission portal closes in 9 hours (11:59 PM). Ensure Valgrind output log is attached.",
    time: "35m ago",
    type: "urgent",
  },
  {
    id: "n2",
    title: "Operating Systems Lecture in 1h 15m",
    desc: "Turing Memorial Hall • Prof. Vance pre-read slides available.",
    time: "1h ago",
    type: "schedule",
  },
  {
    id: "n3",
    title: "Distributed Systems Midterm Venue Confirmed",
    desc: "Friday, Oct 31 @ 10:00 AM in West Auditorium. 1 cheat-sheet sheet allowed.",
    time: "3h ago",
    type: "academic",
  },
];

export function NotificationsPopover({
  isOpen,
  onClose,
}: NotificationsPopoverProps) {
  const { toast } = useToast();

  const handleMarkAllRead = () => {
    toast({
      title: "All Notifications Cleared",
      description: "Inbox caught up with live semester alerts.",
      type: "success",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <span>Academic Alerts &amp; Telemetry</span>
        </div>
      }
      description="Real-time notifications from professors, portals & deadlines"
      maxWidth="md"
    >
      <div className="space-y-3">
        {NOTIFICATIONS.map((n) => {
          return (
            <div
              key={n.id}
              className="p-3 rounded-xl bg-surface-container/70 border border-white/[0.06] hover:bg-surface-container transition-colors space-y-1"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {n.type === "urgent" && (
                    <AlertTriangle className="w-4 h-4 text-error flex-shrink-0" />
                  )}
                  {n.type === "schedule" && (
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                  {n.type === "academic" && (
                    <BookOpen className="w-4 h-4 text-tertiary flex-shrink-0" />
                  )}
                  <h4 className="font-label-md text-on-surface font-semibold text-sm">
                    {n.title}
                  </h4>
                </div>
                <span className="font-mono-code text-[11px] text-on-surface-variant flex-shrink-0">
                  {n.time}
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant pl-6">
                {n.desc}
              </p>
            </div>
          );
        })}

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <span className="font-label-sm text-xs text-on-surface-variant">
            3 active priority notices
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Dismiss
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={<CheckCircle className="w-3.5 h-3.5" />}
              onClick={handleMarkAllRead}
            >
              Mark all read
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
