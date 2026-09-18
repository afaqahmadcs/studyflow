"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Flame,
  Volume2,
  VolumeX,
  Maximize2,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface StudyCockpitHeaderProps {
  streakDays: number;
  currentSubject: string;
  isZenMode: boolean;
  onToggleZenMode: () => void;
  onOpenSettings: () => void;
}

export function StudyCockpitHeader({
  streakDays,
  currentSubject,
  isZenMode,
  onToggleZenMode,
  onOpenSettings,
}: StudyCockpitHeaderProps) {
  const { toast } = useToast();
  const [ambientAudio, setAmbientAudio] = useState("binaural");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Web Audio synthesizer references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeSourcesRef = useRef<AudioNode[]>([]);

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.2);
      } catch {}
    }
    setTimeout(() => {
      activeSourcesRef.current.forEach((node) => {
        try {
          if ("stop" in node && typeof (node as AudioScheduledSourceNode).stop === "function") {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {}
      });
      activeSourcesRef.current = [];
    }, 250);
  };

  const startAudio = (type: string) => {
    try {
      stopAudio();
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.4);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (type === "binaural") {
        // Dual carrier sine waves (196 Hz and 236 Hz creating 40 Hz Gamma pulse)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = "sine";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(196, ctx.currentTime);
        osc2.frequency.setValueAtTime(236, ctx.currentTime);

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        activeSourcesRef.current.push(osc1, osc2);
        osc1.start();
        osc2.start();
      } else {
        // Filtered noise buffer for Rain, Library, Lo-Fi ambient sound
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.1;
          b2 = 0.85 * b2 + white * 0.2;
          output[i] = (b0 + b1 + b2) * 0.35;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        noiseNode.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = type === "rain" ? "lowpass" : type === "lofi" ? "bandpass" : "lowpass";
        filter.frequency.setValueAtTime(type === "rain" ? 420 : type === "lofi" ? 380 : 260, ctx.currentTime);

        noiseNode.connect(filter);
        filter.connect(masterGain);
        activeSourcesRef.current.push(noiseNode, filter);
        noiseNode.start();
      }
    } catch (e) {
      console.warn("Audio context not available", e);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const handleToggleAudio = () => {
    const nextState = !isPlayingAudio;
    setIsPlayingAudio(nextState);

    if (nextState) {
      startAudio(ambientAudio);
    } else {
      stopAudio();
    }

    const labels: Record<string, string> = {
      binaural: "Binaural Beats 40Hz (Flow State)",
      lofi: "Lo-Fi Chill Beats",
      library: "Oxford Library Ambience",
      rain: "Deep Rain & Thunderstorm",
    };

    toast({
      title: nextState ? "Audio Generator Active" : "Audio Generator Muted",
      description: nextState
        ? `Streaming acoustic background: ${labels[ambientAudio]}.`
        : "Soundtrack paused for silence.",
      type: "info",
    });
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md bg-surface-container-low border border-white/[0.04] p-space-lg rounded-xl shadow-md relative overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />

      {/* Left Info */}
      <div className="flex flex-col relative z-10">
        <div className="flex items-center gap-space-sm mb-1">
          <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-tertiary font-mono-code text-[11px] uppercase font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
            Telemetry Active
          </span>
          <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-mono-code text-[11px] font-medium border border-white/[0.04]">
            Cockpit Mode v2.4
          </span>
        </div>

        <h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
          Deep Study Cockpit & Flow State
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 flex flex-wrap items-center gap-2 text-[13px]">
          <span>Spring Term 2025</span>
          <span className="text-outline">•</span>
          <span className="text-secondary font-medium">{currentSubject}</span>
          <span className="text-outline">•</span>
          <span className="inline-flex items-center gap-1 text-tertiary font-medium bg-tertiary-container/20 px-2 py-0.5 rounded text-[12px]">
            <Flame className="w-3.5 h-3.5 fill-tertiary text-tertiary" />
            <span>{streakDays}-Day Focus Streak</span>
          </span>
        </p>
      </div>

      {/* Right Action Controls */}
      <div className="flex flex-wrap items-center gap-space-sm relative z-10">
        {/* Ambient Audio Controller */}
        <div className="flex items-center gap-2 bg-surface-container-high px-space-sm py-1.5 rounded-lg shadow-sm border border-white/[0.04]">
          <Sparkles className="w-4 h-4 text-secondary" />
          <select
            value={ambientAudio}
            onChange={(e) => {
              const newPreset = e.target.value;
              setAmbientAudio(newPreset);
              if (isPlayingAudio) {
                startAudio(newPreset);
                toast({
                  title: "Acoustic Shift",
                  description: `Switched preset to ${newPreset}.`,
                  type: "info",
                });
              }
            }}
            className="bg-transparent text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer pr-2 text-[12px]"
          >
            <option className="bg-surface-container-high text-on-surface" value="binaural">
              Binaural Beats 40Hz
            </option>
            <option className="bg-surface-container-high text-on-surface" value="lofi">
              Lo-Fi Chill Beats
            </option>
            <option className="bg-surface-container-high text-on-surface" value="library">
              Library Ambience
            </option>
            <option className="bg-surface-container-high text-on-surface" value="rain">
              Deep Rain & Thunder
            </option>
          </select>

          <button
            onClick={handleToggleAudio}
            className={cn(
              "w-7 h-7 rounded-md flex items-center justify-center transition-colors",
              isPlayingAudio
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-highest hover:bg-surface-bright text-on-surface"
            )}
            title={isPlayingAudio ? "Mute ambient audio" : "Play ambient audio"}
          >
            {isPlayingAudio ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-outline" />
            )}
          </button>
        </div>

        {/* Zen Focus Mode Button */}
        <button
          onClick={onToggleZenMode}
          className={cn(
            "flex items-center gap-1.5 px-space-sm py-2 rounded-lg font-label-md text-label-md shadow-sm transition-all border text-[12px]",
            isZenMode
              ? "bg-primary text-on-primary border-primary font-bold shadow-[0_0_16px_rgba(192,193,255,0.3)]"
              : "bg-surface-container-high hover:bg-surface-bright text-on-surface border-white/[0.04]"
          )}
          title="Toggle distraction-free view"
        >
          <Maximize2 className="w-3.5 h-3.5 text-primary" />
          <span>Zen Focus</span>
        </button>

        {/* Session Parameters Modal Trigger */}
        <button
          onClick={onOpenSettings}
          className="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center justify-center transition-all shadow-sm border border-white/[0.04]"
          title="Session Parameters"
        >
          <Sliders className="w-4 h-4 text-outline" />
        </button>
      </div>
    </div>
  );
}
