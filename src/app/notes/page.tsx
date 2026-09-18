"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, FolderOpen, Upload, BookOpen } from "lucide-react";
import { Note } from "@/types/notes";
import { INITIAL_NOTES } from "@/data/notes-data";
import { NoteExplorer } from "@/components/notes/note-explorer";
import { NoteEditorPanel } from "@/components/notes/note-editor-panel";
import { DeleteNoteModal } from "@/components/notes/delete-note-modal";
import { useToast } from "@/components/ui/toast";

export default function NotesPage() {
  const { toast } = useToast();

  // Local storage state
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_notes");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_NOTES;
  });

  const [activeNoteId, setActiveNoteId] = useState<string | null>(() => {
    return INITIAL_NOTES[0]?.id || null;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("");
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("command_center_notes", JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0] || null;

  // Handlers
  const handleCreateNewNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "Untitled Academic Note",
      subjectCode: selectedCourse !== "ALL" ? selectedCourse : "CS401",
      subjectName:
        selectedCourse === "CS450"
          ? "Operating Systems"
          : selectedCourse === "CS320"
          ? "Database Systems"
          : selectedCourse === "MATH310"
          ? "Linear Algebra"
          : "Distributed Systems",
      content: `## 1. Overview & Key Questions\n\nStart typing notes, formulas, or lecture summaries here...\n\n### Core Points:\n- Point A\n- Point B\n`,
      tags: ["#draft"],
      isPinned: false,
      createdAt: "Today",
      updatedAt: "Just now",
      readTimeMinutes: 1,
      wordCount: 15,
      checklistItems: [{ id: `c-${Date.now()}`, text: "Initial concept review", done: false }],
    };

    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    toast({
      title: "New Note Created",
      description: "Initialized clean markdown document in your Obsidian Vault.",
      type: "success",
    });
  };

  const handleUpdateActiveNote = (updatedFields: Partial<Note>) => {
    if (!activeNote) return;
    const nowTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNote.id
          ? {
              ...n,
              ...updatedFields,
              updatedAt: `Today ${nowTime}`,
            }
          : n
      )
    );
  };

  const handleTogglePin = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextState = !n.isPinned;
          toast({
            title: nextState ? "Note Pinned" : "Note Unpinned",
            description: nextState ? `"${n.title}" pinned to the top.` : "Removed from pinned list.",
            type: "info",
          });
          return { ...n, isPinned: nextState };
        }
        return n;
      })
    );
  };

  const handleDeleteTrigger = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDeletingNoteId(id);
  };

  const handleConfirmDelete = () => {
    if (!deletingNoteId) return;
    setNotes((prev) => {
      const remaining = prev.filter((n) => n.id !== deletingNoteId);
      if (activeNoteId === deletingNoteId) {
        setActiveNoteId(remaining[0]?.id || null);
      }
      return remaining;
    });

    toast({
      title: "Note Deleted",
      description: "Document removed from Obsidian Vault.",
      type: "info",
    });
    setDeletingNoteId(null);
  };

  const handleImportMarkdownPrompt = () => {
    toast({
      title: "Import Markdown",
      description: "Markdown import is ready. You can paste any .md text directly into the editor.",
      type: "info",
    });
  };

  const deletingTargetNote = notes.find((n) => n.id === deletingNoteId);

  return (
    <div className="flex flex-col w-full space-y-space-lg p-space-lg max-w-7xl mx-auto">
      {/* 1. Header & Utility Command Toolbar */}
      <div className="flex flex-col gap-space-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs mb-1">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono-code text-[11px] uppercase font-semibold tracking-wider border border-white/[0.04]">
                Sync: Active Node 01
              </span>
              <span className="text-on-surface-variant font-mono-code text-[11px]">
                • {notes.length} Knowledge Nodes Synchronized
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
              Academic Notes & Knowledge Base
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-[13px]">
              Markdown-ready second brain synced across enrolled courses with LaTeX equations and code syntax.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex items-center flex-wrap gap-space-sm">
            <button
              onClick={handleImportMarkdownPrompt}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-[12px] transition-all border border-white/[0.04]"
              type="button"
            >
              <Upload className="w-3.5 h-3.5 text-secondary" />
              <span>Import Markdown</span>
            </button>

            <button
              onClick={handleCreateNewNote}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-container hover:opacity-95 text-on-primary font-label-md text-[12px] font-semibold transition-all shadow-[0_0_16px_rgba(128,131,255,0.35)]"
              type="button"
            >
              <Plus className="w-4 h-4" />
              <span>New Note</span>
              <kbd className="ml-1 px-1 py-0.2 rounded bg-black/20 text-[10px] font-mono-code">
                ⌘N
              </kbd>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Panel Layout (Desktop Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* Left Column: Note Explorer & Navigation (4 Cols) */}
        <div className="lg:col-span-4">
          <NoteExplorer
            notes={notes}
            activeNoteId={activeNote?.id || null}
            onSelectNote={(n) => setActiveNoteId(n.id)}
            onNewNote={handleCreateNewNote}
            onTogglePin={(id, e) => handleTogglePin(id, e)}
            onDeleteNote={(id, e) => handleDeleteTrigger(id, e)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCourse={selectedCourse}
            onSelectCourse={setSelectedCourse}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />
        </div>

        {/* Right Column: Rich Markdown Editor Panel (8 Cols) */}
        <div className="lg:col-span-8">
          <NoteEditorPanel
            note={activeNote}
            onUpdateNote={handleUpdateActiveNote}
            onDeleteNote={(id) => handleDeleteTrigger(id)}
            onTogglePin={(id) => handleTogglePin(id)}
          />
        </div>
      </div>

      {/* 3. Auxiliary Showcase Drawer: Archived Notes Telemetry */}
      <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-outline border border-white/[0.04]">
            <FolderOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[13px]">
              Looking for archived lecture notes?
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
              Fall 2024 notes for Algorithms & Computer Architecture are indexed in deep cold storage.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            toast({
              title: "Archive Vault Opened",
              description: "18 archived notes indexed and searchable.",
              type: "info",
            });
          }}
          className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-[12px] transition-all border border-white/[0.04] whitespace-nowrap"
          type="button"
        >
          Browse Archive (18 Notes)
        </button>
      </div>

      {/* Delete Note Confirmation Modal */}
      <DeleteNoteModal
        isOpen={!!deletingNoteId}
        onClose={() => setDeletingNoteId(null)}
        onConfirm={handleConfirmDelete}
        noteTitle={deletingTargetNote?.title || "Untitled Note"}
      />
    </div>
  );
}
