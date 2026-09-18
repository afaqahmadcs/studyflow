"use client";

import React, { useState, useRef } from "react";
import {
  Pin,
  Download,
  Trash2,
  Cloud,
  CheckCircle2,
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  Sigma,
  Quote,
  Link2,
  Copy,
  Check,
} from "lucide-react";
import { Note } from "@/types/notes";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

interface NoteEditorPanelProps {
  note: Note | null;
  onUpdateNote: (updated: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export function NoteEditorPanel({
  note,
  onUpdateNote,
  onDeleteNote,
  onTogglePin,
}: NoteEditorPanelProps) {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [copiedCode, setCopiedCode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-surface-container-low/90 rounded-xl border border-white/[0.04] min-h-[640px] text-center">
        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-outline mb-3">
          <CheckSquare className="w-6 h-6" />
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          No Note Selected
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-1">
          Select a note from the explorer or click "+ New Note" to create a markdown revision document.
        </p>
      </div>
    );
  }

  // Formatting injection helper
  const insertSyntax = (before: string, after = "") => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const previous = note.content;
    const selected = previous.substring(start, end);
    const replacement = `${before}${selected || "text"}${after}`;
    const updated = previous.substring(0, start) + replacement + previous.substring(end);
    onUpdateNote({ content: updated });

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + (selected.length || 4));
    }, 50);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([note.content], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${note.title.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "note"}.md`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Markdown Exported",
      description: `Downloaded "${note.title}.md" successfully.`,
      type: "success",
    });
  };

  const handleCopyCodeSnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    toast({
      title: "Code Copied",
      description: "Code snippet copied to clipboard.",
      type: "info",
    });
  };

  // Word and character stats
  const wordCount = note.content.trim() ? note.content.trim().split(/\s+/).length : 0;
  const charCount = note.content.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex flex-col bg-surface-container-low/90 backdrop-blur-md rounded-xl border border-white/[0.04] shadow-xl overflow-hidden min-h-[720px]">
      {/* 1. Editor Header & Dynamic Title Bar */}
      <div className="p-space-md bg-surface-container pb-space-sm border-b border-white/[0.04]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          {/* Course Selector & Cloud Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={note.subjectCode}
              onChange={(e) => {
                const map: Record<string, string> = {
                  CS401: "Distributed Systems",
                  CS450: "Operating Systems",
                  CS320: "Database Systems",
                  MATH310: "Linear Algebra",
                };
                onUpdateNote({
                  subjectCode: e.target.value,
                  subjectName: map[e.target.value] || "Academics",
                });
              }}
              className="bg-primary-container/15 text-primary hover:bg-primary-container/25 transition-colors font-label-sm text-[12px] font-semibold px-2.5 py-1 rounded cursor-pointer focus:outline-none border border-primary/20"
            >
              <option value="CS401" className="bg-surface-container-high text-on-surface">
                CS401 Distributed Systems
              </option>
              <option value="CS450" className="bg-surface-container-high text-on-surface">
                CS450 Operating Systems
              </option>
              <option value="CS320" className="bg-surface-container-high text-on-surface">
                CS320 Database Systems
              </option>
              <option value="MATH310" className="bg-surface-container-high text-on-surface">
                MATH310 Linear Algebra
              </option>
            </select>

            <span className="font-mono-code text-[11px] text-on-surface-variant flex items-center gap-1">
              <Cloud className="w-3.5 h-3.5 text-tertiary" />
              <span>Auto-synced ({note.updatedAt})</span>
            </span>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onTogglePin(note.id)}
              className={cn(
                "p-1.5 rounded-lg border transition-colors",
                note.isPinned
                  ? "bg-primary-container/20 border-primary text-primary"
                  : "bg-surface-container-high border-white/[0.04] text-on-surface-variant hover:text-on-surface"
              )}
              title={note.isPinned ? "Unpin Note" : "Pin Note"}
            >
              <Pin className={cn("w-4 h-4", note.isPinned ? "fill-primary" : "")} />
            </button>

            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-[12px] transition-colors border border-white/[0.04]"
              title="Download Markdown"
            >
              <Download className="w-3.5 h-3.5 text-secondary" />
              <span>Export MD</span>
            </button>

            <button
              onClick={() => onDeleteNote(note.id)}
              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors border border-white/[0.04]"
              title="Delete Note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Title Input */}
        <div className="mt-space-sm">
          <input
            type="text"
            value={note.title}
            onChange={(e) => onUpdateNote({ title: e.target.value })}
            placeholder="Document title..."
            className="w-full bg-transparent text-on-surface font-headline-xl text-[22px] font-bold tracking-tight focus:outline-none focus:bg-surface-container-highest/20 rounded px-1 py-0.5"
          />
        </div>

        {/* Telemetry Specs Bar */}
        <div className="flex items-center gap-space-md mt-1 px-1 text-on-surface-variant font-mono-code text-[11px]">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
          <span>•</span>
          <span>{readTime} min read</span>
          <span>•</span>
          <span className="text-tertiary font-medium">Markdown Supported</span>
        </div>
      </div>

      {/* 2. Formatting Ribbon / Toolbar */}
      <div className="px-space-md py-1.5 bg-surface-container-highest/40 flex items-center justify-between flex-wrap gap-1 border-b border-white/[0.03]">
        <div className="flex items-center gap-0.5 flex-wrap">
          <button
            type="button"
            onClick={() => insertSyntax("**", "**")}
            className="p-1.5 rounded hover:bg-surface-container-high text-on-surface"
            title="Bold (**text**)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("*", "*")}
            className="p-1.5 rounded hover:bg-surface-container-high text-on-surface"
            title="Italic (*text*)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("~~", "~~")}
            className="p-1.5 rounded hover:bg-surface-container-high text-on-surface"
            title="Strikethrough (~~text~~)"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-4 bg-surface-variant mx-1" />

          <button
            type="button"
            onClick={() => insertSyntax("## ")}
            className="px-2 py-1 rounded hover:bg-surface-container-high text-on-surface font-mono-code text-[11px] font-bold"
            title="Heading 2 (## Title)"
          >
            H2
          </button>

          <div className="w-px h-4 bg-surface-variant mx-1" />

          <button
            type="button"
            onClick={() => insertSyntax("- ")}
            className="p-1.5 rounded hover:bg-surface-container-high text-on-surface"
            title="Bullet List (- item)"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("1. ")}
            className="p-1.5 rounded hover:bg-surface-container-high text-on-surface"
            title="Numbered List (1. item)"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("- [ ] ")}
            className="p-1.5 rounded hover:bg-surface-container-high text-primary"
            title="Checklist Item (- [ ] item)"
          >
            <CheckSquare className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-4 bg-surface-variant mx-1" />

          <button
            type="button"
            onClick={() => insertSyntax("```go\n", "\n```")}
            className="p-1.5 rounded hover:bg-surface-container-high text-secondary"
            title="Code Block"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("$$", "$$")}
            className="p-1.5 rounded hover:bg-surface-container-high text-tertiary"
            title="Math Formula ($$eq$$)"
          >
            <Sigma className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("> ")}
            className="p-1.5 rounded hover:bg-surface-container-high text-on-surface"
            title="Quote Block (> quote)"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("[", "](https://)")}
            className="p-1.5 rounded hover:bg-surface-container-high text-on-surface"
            title="Link [text](url)"
          >
            <Link2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-0.5 rounded bg-surface-container-lowest border border-white/[0.04]">
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={cn(
              "px-2.5 py-0.5 rounded font-label-sm text-[11px] transition-all",
              viewMode === "edit"
                ? "bg-surface-container text-on-surface font-semibold shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Live Edit
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={cn(
              "px-2.5 py-0.5 rounded font-label-sm text-[11px] transition-all",
              viewMode === "preview"
                ? "bg-surface-container text-primary font-semibold shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Preview
          </button>
        </div>
      </div>

      {/* 3. Editor Content Workspace Area */}
      <div className="p-space-lg flex-1 overflow-y-auto flex flex-col">
        {viewMode === "edit" ? (
          <textarea
            ref={textareaRef}
            value={note.content}
            onChange={(e) => onUpdateNote({ content: e.target.value })}
            placeholder="Type your markdown study notes here..."
            className="w-full flex-1 min-h-[480px] bg-transparent text-on-surface font-mono-code text-[13px] leading-relaxed resize-none focus:outline-none"
          />
        ) : (
          /* Rendered Markdown Preview */
          <div className="space-y-space-md text-on-surface leading-relaxed text-[14px]">
            {/* Custom styled callout box example */}
            <div className="p-space-md rounded-xl bg-primary-container/10 border border-primary/20 shadow-sm">
              <div className="flex items-start gap-space-sm">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-headline-sm text-[13px] text-primary font-semibold">
                    Exam Tip • {note.subjectCode} High-Yield Topic
                  </span>
                  <p className="font-body-md text-[13px] text-on-surface">
                    Master key definitions, time complexities, and failure modes before midterms.
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist Section */}
            {note.checklistItems && note.checklistItems.length > 0 && (
              <div className="p-space-md rounded-xl bg-surface-container-lowest border border-white/[0.04] space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-[11px] uppercase tracking-wider text-outline font-semibold">
                    Mastery Verification Checklist
                  </span>
                  <span className="font-mono-code text-[11px] text-tertiary font-semibold">
                    {note.checklistItems.filter((c) => c.done).length} of{" "}
                    {note.checklistItems.length} Completed
                  </span>
                </div>
                <div className="space-y-1.5">
                  {note.checklistItems.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => {
                          const updatedChecklist = note.checklistItems?.map((c) =>
                            c.id === item.id ? { ...c, done: !c.done } : c
                          );
                          onUpdateNote({ checklistItems: updatedChecklist });
                        }}
                        className="w-4 h-4 rounded bg-surface-container-high text-primary accent-primary cursor-pointer"
                      />
                      <span
                        className={cn(
                          "font-body-md text-[13px]",
                          item.done
                            ? "line-through text-on-surface-variant opacity-70"
                            : "text-on-surface font-medium"
                        )}
                      >
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Formatted Markdown Content */}
            <div className="prose prose-invert max-w-none space-y-3 font-body-md text-[14px]">
              {note.content.split("\n\n").map((block, idx) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2
                      key={idx}
                      className="font-headline-lg text-[18px] font-bold text-on-surface pt-2"
                    >
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                if (block.startsWith("### ")) {
                  return (
                    <h3
                      key={idx}
                      className="font-headline-sm text-[15px] font-semibold text-secondary pt-1"
                    >
                      {block.replace("### ", "")}
                    </h3>
                  );
                }
                if (block.startsWith("```")) {
                  const codeSnippet = block.replace(/```[a-z]*\n?/g, "");
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-surface-container-lowest p-space-md border border-white/[0.04] relative group"
                    >
                      <button
                        onClick={() => handleCopyCodeSnippet(codeSnippet)}
                        className="absolute top-3 right-3 text-outline hover:text-on-surface font-mono-code text-[11px] flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded"
                      >
                        {copiedCode ? (
                          <Check className="w-3.5 h-3.5 text-tertiary" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedCode ? "Copied" : "Copy"}</span>
                      </button>
                      <pre className="font-mono-code text-[12px] text-on-surface overflow-x-auto leading-relaxed">
                        <code>{codeSnippet}</code>
                      </pre>
                    </div>
                  );
                }
                if (block.startsWith("> ")) {
                  return (
                    <blockquote
                      key={idx}
                      className="border-l-4 border-primary pl-4 py-1 text-on-surface-variant italic text-[13px]"
                    >
                      {block.replace(/^>\s?/gm, "")}
                    </blockquote>
                  );
                }
                if (block.startsWith("- ")) {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-1 pl-2">
                      {block.split("\n").map((line, lIdx) => (
                        <li key={lIdx} className="text-on-surface-variant text-[13px]">
                          {line.replace(/^- /, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="text-on-surface-variant text-[13px] leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Status Bar */}
      <div className="h-9 px-space-md bg-surface-container-lowest border-t border-white/[0.04] flex items-center justify-between text-on-surface-variant font-mono-code text-[11px]">
        <div className="flex items-center gap-space-md">
          <span className="flex items-center gap-1.5 text-tertiary">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
            <span>Obsidian Vault Active</span>
          </span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">Markdown + KaTeX</span>
        </div>
        <div className="flex items-center gap-space-sm">
          <span>Created: {note.createdAt}</span>
          <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-medium text-[10px]">
            {note.subjectCode}
          </span>
        </div>
      </div>
    </div>
  );
}
