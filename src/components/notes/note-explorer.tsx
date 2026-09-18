"use client";

import React, { useState } from "react";
import {
  Search,
  Pin,
  Clock,
  Tag,
  Trash2,
  Plus,
  FileText,
  Bookmark,
} from "lucide-react";
import { Note } from "@/types/notes";
import { cn } from "@/lib/utils";

interface NoteExplorerProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (note: Note) => void;
  onNewNote: () => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onDeleteNote: (id: string, e: React.MouseEvent) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCourse: string;
  onSelectCourse: (course: string) => void;
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export function NoteExplorer({
  notes,
  activeNoteId,
  onSelectNote,
  onNewNote,
  onTogglePin,
  onDeleteNote,
  searchQuery,
  onSearchChange,
  selectedCourse,
  onSelectCourse,
  selectedTag,
  onSelectTag,
}: NoteExplorerProps) {
  const [tab, setTab] = useState<"all" | "pinned" | "recent">("all");

  const courses = [
    { code: "ALL", label: "All Notes", count: notes.length },
    { code: "CS401", label: "CS401 Dist. Systems", color: "bg-primary-container" },
    { code: "CS450", label: "CS450 OS", color: "bg-secondary" },
    { code: "CS320", label: "CS320 Databases", color: "bg-tertiary" },
    { code: "MATH310", label: "MATH310 LinAlg", color: "bg-primary-fixed-dim" },
  ];

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    if (tab === "pinned" && !note.isPinned) return false;
    if (selectedCourse !== "ALL" && note.subjectCode !== selectedCourse) return false;
    if (selectedTag && !note.tags.includes(selectedTag)) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = note.title.toLowerCase().includes(q);
      const matchContent = note.content.toLowerCase().includes(q);
      const matchTags = note.tags.some((t) => t.toLowerCase().includes(q));
      const matchSubject = note.subjectCode.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchTags && !matchSubject) return false;
    }

    return true;
  });

  // Sort pinned first
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col gap-space-sm bg-surface-container-lowest/80 backdrop-blur-md p-space-sm rounded-xl border border-white/[0.04] shadow-lg">
      {/* 1. Explorer Search & New Note Action */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 flex items-center">
          <Search className="w-4 h-4 text-outline absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search notes, markdown, tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-[12px] pl-9 pr-8 py-2 rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-white/[0.04]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 text-outline hover:text-on-surface text-[11px]"
            >
              ✕
            </button>
          )}
        </div>

        <button
          onClick={onNewNote}
          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary-container hover:opacity-95 text-on-primary font-label-md text-[12px] font-semibold transition-all shadow-[0_0_12px_rgba(128,131,255,0.35)] flex-shrink-0"
          title="Create New Note (⌘N)"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New</span>
        </button>
      </div>

      {/* 2. Course Taxonomy Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {courses.map((c) => {
          const isSelected = selectedCourse === c.code;
          return (
            <button
              key={c.code}
              onClick={() => onSelectCourse(c.code)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-[11px] whitespace-nowrap transition-all border border-white/[0.03]",
                isSelected
                  ? "bg-surface-container-high text-primary font-semibold shadow-sm"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
              )}
            >
              {c.color && <span className={cn("w-2 h-2 rounded-full", c.color)} />}
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Segmented Navigation Tabs */}
      <div className="flex items-center p-1 rounded-lg bg-surface-container-low border border-white/[0.04] text-on-surface-variant">
        <button
          onClick={() => setTab("all")}
          className={cn(
            "flex-1 py-1 rounded-md font-label-sm text-[11px] font-medium transition-all",
            tab === "all"
              ? "bg-surface-container-high text-on-surface shadow-sm font-semibold"
              : "hover:text-on-surface"
          )}
        >
          All ({notes.length})
        </button>
        <button
          onClick={() => setTab("pinned")}
          className={cn(
            "flex-1 py-1 rounded-md font-label-sm text-[11px] font-medium transition-all flex items-center justify-center gap-1",
            tab === "pinned"
              ? "bg-surface-container-high text-primary shadow-sm font-semibold"
              : "hover:text-on-surface"
          )}
        >
          <Pin className="w-3 h-3 text-primary" />
          <span>Pinned ({notes.filter((n) => n.isPinned).length})</span>
        </button>
        <button
          onClick={() => setTab("recent")}
          className={cn(
            "flex-1 py-1 rounded-md font-label-sm text-[11px] font-medium transition-all",
            tab === "recent"
              ? "bg-surface-container-high text-on-surface shadow-sm font-semibold"
              : "hover:text-on-surface"
          )}
        >
          Recent
        </button>
      </div>

      {/* 4. Tag Pill Bar */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          <span className="text-outline font-label-sm flex items-center gap-0.5 text-[10px] pl-1">
            <Tag className="w-3 h-3" /> Tag:
          </span>
          {selectedTag && (
            <button
              onClick={() => onSelectTag("")}
              className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-mono-code text-[10px]"
            >
              Clear
            </button>
          )}
          {allTags.slice(0, 5).map((t) => (
            <button
              key={t}
              onClick={() => onSelectTag(selectedTag === t ? "" : t)}
              className={cn(
                "px-2 py-0.5 rounded font-mono-code text-[10px] transition-colors whitespace-nowrap",
                selectedTag === t
                  ? "bg-primary-container text-on-primary font-bold"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* 5. Notes List Container */}
      <div className="flex flex-col gap-2 max-h-[640px] overflow-y-auto pr-1">
        {sortedNotes.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant bg-surface-container-low rounded-xl border border-white/[0.04] text-[12px]">
            {searchQuery
              ? `No notes matching "${searchQuery}".`
              : "No notes found in this view. Click \"+ New Note\" to create one!"}
          </div>
        ) : (
          sortedNotes.map((note) => {
            const isSelected = activeNoteId === note.id;
            return (
              <div
                key={note.id}
                onClick={() => onSelectNote(note)}
                className={cn(
                  "group relative flex flex-col p-space-sm rounded-lg transition-all cursor-pointer border",
                  isSelected
                    ? "bg-surface-container-high border-primary/40 shadow-[0_0_16px_rgba(128,131,255,0.15)]"
                    : "bg-surface-container-low hover:bg-surface-container border-white/[0.03]"
                )}
              >
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-space-xs">
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        note.subjectCode === "CS401"
                          ? "bg-primary-container"
                          : note.subjectCode === "CS450"
                          ? "bg-secondary"
                          : note.subjectCode === "CS320"
                          ? "bg-tertiary"
                          : "bg-primary-fixed-dim"
                      )}
                    />
                    <span className="font-label-sm text-[11px] font-semibold text-primary">
                      {note.subjectCode}
                    </span>
                    <span className="font-mono-code text-[10px] text-outline">
                      • {note.updatedAt}
                    </span>
                  </div>

                  {/* Actions & Pin */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => onTogglePin(note.id, e)}
                      title={note.isPinned ? "Unpin note" : "Pin note"}
                      className={cn(
                        "p-1 rounded transition-colors",
                        note.isPinned
                          ? "text-primary"
                          : "text-outline hover:text-on-surface opacity-0 group-hover:opacity-100"
                      )}
                    >
                      <Pin
                        className={cn(
                          "w-3.5 h-3.5",
                          note.isPinned ? "fill-primary" : ""
                        )}
                      />
                    </button>

                    <button
                      onClick={(e) => onDeleteNote(note.id, e)}
                      title="Delete note"
                      className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-error/10 text-on-surface-variant hover:text-error transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-headline-sm text-[13px] text-on-surface font-semibold mt-1 tracking-tight truncate">
                  {note.title}
                </h3>

                {/* Snippet */}
                <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                  {note.content
                    .replace(/[#*`$>\\-]/g, "")
                    .replace(/\n+/g, " ")
                    .slice(0, 110)}...
                </p>

                {/* Tags */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-surface-container font-mono-code text-[10px] text-on-surface-variant border border-white/[0.02]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
