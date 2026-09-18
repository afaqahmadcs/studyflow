"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  CheckCircle2,
  BookOpen,
  Check,
  Edit2,
} from "lucide-react";
import { TimerMode, TimerState } from "@/types/study";
import { AVAILABLE_SUBJECTS } from "@/data/study-data";
import { cn } from "@/lib/utils";

interface StudyTimerDialProps {
  selectedSubject: { code: string; name: string };
  onSelectSubject: (sub: { code: string; name: string }) => void;
  objective: string;
  onChangeObjective: (val: string) => void;
  onFinishSession: (sessionData: {
    durationMinutes: number;
    mode: TimerMode;
    subjectCode: string;
    subjectName: string;
    objective: string;
    startTime: string;
    endTime: string;
    date: string;
  }) => void;
}

export function StudyTimerDial({
  selectedSubject,
  onSelectSubject,
  objective,
  onChangeObjective,
  onFinishSession,
}: StudyTimerDialProps) {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timerState, setTimerState] = useState<TimerState>("idle");

  // Initial duration in seconds per mode
  const getModeSeconds = (m: TimerMode) => {
    switch (m) {
      case "pomodoro":
        return 25 * 60;
      case "short_break":
        return 5 * 60;
      case "long_break":
        return 15 * 60;
      case "deep_flow":
        return 50 * 60;
    }
  };

  const [initialSeconds, setInitialSeconds] = useState(getModeSeconds("pomodoro"));
  const [secondsLeft, setSecondsLeft] = useState(getModeSeconds("pomodoro"));
  const [cycleIndex, setCycleIndex] = useState(3); // 3 of 4
  const [isEditingObjective, setIsEditingObjective] = useState(false);
  const [customMinutesInput, setCustomMinutesInput] = useState("");
  const [isCustomDurationOpen, setIsCustomDurationOpen] = useState(false);

  // High-precision timer references using timestamp delta to avoid drift
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingAtPauseRef = useRef<number>(getModeSeconds("pomodoro"));
  const sessionStartWallTimeRef = useRef<Date | null>(null);

  // Change mode
  const handleSelectMode = (newMode: TimerMode) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const secs = getModeSeconds(newMode);
    setMode(newMode);
    setTimerState("idle");
    setInitialSeconds(secs);
    setSecondsLeft(secs);
    remainingAtPauseRef.current = secs;
    sessionStartWallTimeRef.current = null;
  };

  // Direct duration selector (e.g. 15, 25, 30, 45, 50, 60 min)
  const handleSelectDurationMinutes = (minutes: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const secs = Math.max(60, minutes * 60);
    setTimerState("idle");
    setInitialSeconds(secs);
    setSecondsLeft(secs);
    remainingAtPauseRef.current = secs;
    sessionStartWallTimeRef.current = null;
    setIsCustomDurationOpen(false);
  };

  // Timer Tick implementation
  const handleStart = () => {
    if (!sessionStartWallTimeRef.current) {
      sessionStartWallTimeRef.current = new Date();
    }
    setTimerState("running");
    startTimeRef.current = Date.now();
    remainingAtPauseRef.current = secondsLeft;

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, remainingAtPauseRef.current - elapsed);

      setSecondsLeft(remaining);

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimerState("idle");
        
        const now = new Date();
        const start = sessionStartWallTimeRef.current || new Date(Date.now() - initialSeconds * 1000);
        const startTimeStr = start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const endTimeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const completedMinutes = Math.max(1, Math.round(initialSeconds / 60));
        onFinishSession({
          durationMinutes: completedMinutes,
          mode,
          subjectCode: selectedSubject.code,
          subjectName: selectedSubject.name,
          objective,
          startTime: startTimeStr,
          endTime: endTimeStr,
          date: "Today",
        });
        sessionStartWallTimeRef.current = null;
      }
    }, 500);
  };

  const handlePause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    remainingAtPauseRef.current = secondsLeft;
    setTimerState("paused");
  };

  const handleResume = () => {
    handleStart();
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerState("idle");
    const secs = getModeSeconds(mode);
    setInitialSeconds(secs);
    setSecondsLeft(secs);
    remainingAtPauseRef.current = secs;
    sessionStartWallTimeRef.current = null;
  };

  const handleBumpFiveMinutes = () => {
    setInitialSeconds((prev) => prev + 300);
    setSecondsLeft((prev) => prev + 300);
    remainingAtPauseRef.current += 300;
    if (timerState === "running") {
      startTimeRef.current = Date.now();
    }
  };

  const handleManualFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerState("idle");

    const elapsedSeconds = Math.max(0, initialSeconds - secondsLeft);
    const completedMinutes = Math.max(1, Math.round(elapsedSeconds / 60));

    const now = new Date();
    const start = sessionStartWallTimeRef.current || new Date(Date.now() - elapsedSeconds * 1000);
    const startTimeStr = start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const endTimeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    onFinishSession({
      durationMinutes: completedMinutes,
      mode,
      subjectCode: selectedSubject.code,
      subjectName: selectedSubject.name,
      objective,
      startTime: startTimeStr,
      endTime: endTimeStr,
      date: "Today",
    });

    sessionStartWallTimeRef.current = null;

    // Reset timer
    const secs = getModeSeconds(mode);
    setInitialSeconds(secs);
    setSecondsLeft(secs);
    remainingAtPauseRef.current = secs;
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // SVG ring calculations (radius 118, circumference = 2 * PI * 118 = 741.42)
  const circumference = 741.42;
  const progressFraction = initialSeconds > 0 ? secondsLeft / initialSeconds : 0;
  const strokeDashoffset = Math.max(0, circumference * (1 - progressFraction));

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isBreak = mode === "short_break" || mode === "long_break";

  return (
    <div className="flex flex-col bg-surface-container-low border border-white/[0.04] rounded-xl p-space-lg shadow-lg relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-72 h-72 bg-secondary-container/10 rounded-full blur-[80px] pointer-events-none" />

      {/* 1. Mode Selector Tabs */}
      <div className="flex items-center justify-between gap-2 bg-surface-container-lowest p-1.5 rounded-lg mb-space-sm relative z-10 overflow-x-auto border border-white/[0.04]">
        <button
          onClick={() => handleSelectMode("pomodoro")}
          className={cn(
            "flex-1 py-1.5 px-3 rounded-md font-label-md text-label-md font-medium text-center transition-all text-[12px]",
            mode === "pomodoro"
              ? "bg-primary-container text-on-primary font-semibold shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          )}
        >
          Pomodoro 25m
        </button>
        <button
          onClick={() => handleSelectMode("short_break")}
          className={cn(
            "flex-1 py-1.5 px-3 rounded-md font-label-md text-label-md font-medium text-center transition-all text-[12px]",
            mode === "short_break"
              ? "bg-secondary text-on-secondary font-semibold shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          )}
        >
          Short Break 5m
        </button>
        <button
          onClick={() => handleSelectMode("long_break")}
          className={cn(
            "flex-1 py-1.5 px-3 rounded-md font-label-md text-label-md font-medium text-center transition-all text-[12px]",
            mode === "long_break"
              ? "bg-secondary text-on-secondary font-semibold shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          )}
        >
          Long Break 15m
        </button>
        <button
          onClick={() => handleSelectMode("deep_flow")}
          className={cn(
            "flex-1 py-1.5 px-3 rounded-md font-label-md text-label-md font-medium text-center transition-all text-[12px]",
            mode === "deep_flow"
              ? "bg-primary-container text-on-primary font-semibold shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          )}
        >
          Deep Flow 50m
        </button>
      </div>

      {/* 1.5 Quick Duration Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-container/60 p-2 rounded-lg mb-space-md relative z-10 border border-white/[0.03]">
        <span className="font-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider font-semibold pl-1">
          Duration:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[15, 25, 30, 45, 50, 60, 90].map((mins) => {
            const isSelected = Math.round(initialSeconds / 60) === mins;
            return (
              <button
                key={mins}
                onClick={() => handleSelectDurationMinutes(mins)}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-mono-code transition-all",
                  isSelected
                    ? "bg-primary-container text-on-primary font-bold shadow-sm"
                    : "bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface"
                )}
              >
                {mins}m
              </button>
            );
          })}
          {isCustomDurationOpen ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="1"
                max="180"
                placeholder="mins"
                value={customMinutesInput}
                onChange={(e) => setCustomMinutesInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customMinutesInput) {
                    const parsed = parseInt(customMinutesInput, 10);
                    if (!isNaN(parsed) && parsed > 0) {
                      handleSelectDurationMinutes(parsed);
                    }
                  }
                }}
                className="w-14 px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono-code text-[11px] border border-primary focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  const parsed = parseInt(customMinutesInput, 10);
                  if (!isNaN(parsed) && parsed > 0) {
                    handleSelectDurationMinutes(parsed);
                  }
                }}
                className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold"
              >
                Set
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsCustomDurationOpen(true)}
              className="px-2 py-1 rounded text-[11px] font-mono-code bg-surface-container-high hover:bg-surface-bright text-secondary hover:text-on-surface transition-colors"
            >
              +Custom
            </button>
          )}
        </div>
      </div>

      {/* 2. Subject & Active Objective Context Selector */}
      <div className="bg-surface-container rounded-lg p-space-sm mb-space-lg relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-white/[0.04]">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[10px]">
              Active Coursework
            </span>
            <div className="flex items-center gap-2">
              <select
                value={selectedSubject.code}
                onChange={(e) => {
                  const s = AVAILABLE_SUBJECTS.find((sub) => sub.code === e.target.value);
                  if (s) onSelectSubject({ code: s.code, name: s.name });
                }}
                className="bg-transparent text-on-surface font-headline-sm text-headline-sm font-semibold truncate focus:outline-none cursor-pointer pr-1 text-[14px]"
              >
                {AVAILABLE_SUBJECTS.map((s) => (
                  <option
                    key={s.code}
                    value={s.code}
                    className="bg-surface-container-high text-on-surface"
                  >
                    {s.code}: {s.name}
                  </option>
                ))}
              </select>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-primary-container/20 text-primary">
                Focus Target
              </span>
            </div>
          </div>
        </div>

        {/* Editable Objective */}
        <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded text-left border border-white/[0.04]">
          <CheckCircle2 className="w-4 h-4 text-tertiary flex-shrink-0" />
          {isEditingObjective ? (
            <input
              type="text"
              value={objective}
              onChange={(e) => onChangeObjective(e.target.value)}
              onBlur={() => setIsEditingObjective(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingObjective(false)}
              autoFocus
              className="bg-transparent font-mono-code text-[12px] text-on-surface focus:outline-none border-b border-primary w-48"
            />
          ) : (
            <span
              onClick={() => setIsEditingObjective(true)}
              className="font-mono-code text-[12px] text-on-surface truncate max-w-[200px] cursor-pointer hover:text-primary transition-colors flex items-center gap-1"
              title="Click to edit task objective"
            >
              {objective}
              <Edit2 className="w-2.5 h-2.5 text-outline ml-1 opacity-60" />
            </span>
          )}
        </div>
      </div>

      {/* 3. Cyberpunk Radial Timer Dial */}
      <div className="flex flex-col items-center justify-center my-space-md relative z-10">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Outer Decorative Subtle Rings */}
          <div className="absolute inset-0 rounded-full border border-surface-container-highest/60" />
          <div
            className={cn(
              "absolute inset-4 rounded-full border border-dashed border-outline-variant/30",
              timerState === "running" ? "animate-[spin_90s_linear_infinite]" : ""
            )}
          />

          {/* SVG Circular Progress Dial */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 280 280">
            <defs>
              <linearGradient id="timerGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#4cd7f6" />
                <stop offset="50%" stopColor="#8083ff" />
                <stop offset="100%" stopColor="#c0c1ff" />
              </linearGradient>
            </defs>

            {/* Background Track */}
            <circle
              cx="140"
              cy="140"
              fill="none"
              r="118"
              stroke="#262a33"
              strokeLinecap="round"
              strokeWidth="8"
            />

            {/* Active Fill Track */}
            <circle
              className="transition-all duration-700 ease-linear"
              cx="140"
              cy="140"
              fill="none"
              r="118"
              stroke="url(#timerGradient)"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="9"
            />
          </svg>

          {/* Core Dial Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            <span className="font-mono-code text-[11px] tracking-widest text-secondary uppercase mb-1">
              {isBreak ? "Rest & Recovery" : "Concentration"}
            </span>

            <div className="font-mono-code text-[56px] sm:text-[68px] leading-none font-semibold text-on-surface tracking-tighter drop-shadow-[0_0_20px_rgba(192,193,255,0.25)]">
              {timeFormatted}
            </div>

            {/* Cycle Indicators */}
            <div className="mt-4 flex flex-col items-center gap-1.5">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium text-[11px]">
                Cycle {cycleIndex} of 4
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(78,222,163,0.5)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(78,222,163,0.5)]" />
                <span
                  className={cn(
                    "w-2.5 h-2.5 rounded-full bg-primary-container",
                    timerState === "running" ? "animate-pulse" : ""
                  )}
                />
                <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Timer Primary Controls */}
      <div className="flex flex-wrap items-center justify-center gap-space-md mt-space-md relative z-10">
        {/* +5m Bump */}
        <button
          onClick={handleBumpFiveMinutes}
          className="px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 border border-white/[0.04] text-[12px]"
          title="Add 5 minutes to active session"
        >
          <Plus className="w-4 h-4 text-primary" />
          <span>+5m</span>
        </button>

        {/* Main Start / Pause / Resume Button */}
        {timerState === "running" ? (
          <button
            onClick={handlePause}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-inverse-primary hover:from-primary hover:to-primary-container text-on-primary font-headline-sm text-headline-sm font-semibold transition-all shadow-[0_0_24px_rgba(128,131,255,0.45)] flex items-center gap-2 active:scale-95 text-[15px]"
          >
            <Pause className="w-5 h-5 fill-current" />
            <span>Hold Focus</span>
          </button>
        ) : timerState === "paused" ? (
          <button
            onClick={handleResume}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-inverse-primary hover:from-primary hover:to-primary-container text-on-primary font-headline-sm text-headline-sm font-semibold transition-all shadow-[0_0_24px_rgba(128,131,255,0.45)] flex items-center gap-2 active:scale-95 text-[15px]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Resume Focus</span>
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-inverse-primary hover:from-primary hover:to-primary-container text-on-primary font-headline-sm text-headline-sm font-semibold transition-all shadow-[0_0_24px_rgba(128,131,255,0.45)] flex items-center gap-2 active:scale-95 text-[15px]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Enter Flow</span>
          </button>
        )}

        {/* Reset Timer */}
        <button
          onClick={handleReset}
          className="px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 border border-white/[0.04] text-[12px]"
          title="Reset timer to initial phase"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>

        {/* Finish Session & Log */}
        <button
          onClick={handleManualFinish}
          className="px-space-md py-2.5 rounded-lg bg-tertiary-container/30 hover:bg-tertiary-container/50 text-tertiary font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 border border-tertiary/30 text-[12px]"
          title="Conclude session early and record focus volume"
        >
          <Check className="w-4 h-4" />
          <span>Finish (+75 XP)</span>
        </button>
      </div>

      {/* 5. Micro Status Footer */}
      <div className="mt-space-lg pt-space-md flex flex-wrap items-center justify-between gap-2 font-mono-code text-mono-code text-on-surface-variant bg-surface-container-lowest/60 px-4 py-2 rounded-lg text-[11px] border border-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span>Target Rate: 52m focus / 8m rest</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-tertiary font-medium">Auto-resume: ON</span>
          <span className="text-outline">|</span>
          <span>Binaural Sync: 40.0 Hz</span>
        </div>
      </div>
    </div>
  );
}
