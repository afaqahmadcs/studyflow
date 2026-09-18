"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface DeleteNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  noteTitle: string;
}

export function DeleteNoteModal({
  isOpen,
  onClose,
  onConfirm,
  noteTitle,
}: DeleteNoteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Note"
      description="Permanent removal from Obsidian Vault"
      maxWidth="sm"
    >
      <div className="space-y-space-md mt-space-sm">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-error-container/20 border border-error/20">
          <div className="w-9 h-9 rounded-full bg-error/20 text-error flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[13px]">
              Are you sure you want to delete this note?
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] mt-1">
              &quot;{noteTitle}&quot; will be permanently deleted and cross-references in linked documents will be unlinked.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete Note
          </Button>
        </div>
      </div>
    </Modal>
  );
}
