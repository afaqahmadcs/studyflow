"use client";

import React from "react";
import {
  Sliders,
  CheckCircle2,
  Circle,
  Sparkles,
  Sun,
  Moon,
  Laptop,
  Check,
} from "lucide-react";
import { AppearanceSettings, AccentColor, LayoutDensity, ThemeMode } from "@/types/settings";
import { useTheme } from "@/context/theme-context";

interface AppearancePanelProps {
  appearance: AppearanceSettings;
  onChange: (updated: AppearanceSettings) => void;
}

const ACCENT_COLORS: { id: AccentColor; name: string; hex: string }[] = [
  { id: "indigo", name: "Electric Indigo", hex: "#8083ff" },
  { id: "cyan", name: "Cyan Pulse", hex: "#06b6d4" },
  { id: "emerald", name: "Emerald Growth", hex: "#10b981" },
  { id: "violet", name: "Deep Violet", hex: "#8b5cf6" },
  { id: "rose", name: "Rose Alert", hex: "#f43f5e" },
];

export function AppearancePanel({ appearance, onChange }: AppearancePanelProps) {
  const { theme: currentContextTheme, setTheme } = useTheme();

  const handleThemeSelect = (mode: ThemeMode) => {
    onChange({
      ...appearance,
      theme: mode,
    });
    setTheme(mode);
  };

  const handleAccentSelect = (accent: AccentColor) => {
    onChange({
      ...appearance,
      accentColor: accent,
    });
  };

  const handleDensitySelect = (density: LayoutDensity) => {
    onChange({
      ...appearance,
      density,
    });
  };

  const handleScaleChange = (scale: number) => {
    onChange({
      ...appearance,
      baseTextScale: scale,
    });
  };

  return (
    <section className="rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-md space-y-space-md">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-space-sm">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
            <Sliders className="w-4 h-4" />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Appearance &amp; Interface
            </h2>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              Fine-tune your visual cockpit, ergonomics, and ocular comfort.
            </p>
          </div>
        </div>
        <span className="font-label-sm text-[11px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium border border-white/[0.04]">
          OLED Optimized
        </span>
      </div>

      {/* Theme Mode Cards */}
      <div className="space-y-2">
        <label className="block font-label-md text-xs text-on-surface font-medium">
          Theme Mode Palette
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
          {/* Obsidian Dark */}
          <div
            onClick={() => handleThemeSelect("dark")}
            className={`group relative rounded-xl p-3.5 cursor-pointer shadow-lg transition-all ${
              appearance.theme === "dark"
                ? "bg-surface-container-lowest ring-2 ring-primary border-transparent"
                : "bg-surface-container-high border border-white/[0.04] hover:bg-surface-variant opacity-80 hover:opacity-100"
            }`}
          >
            <div className="h-20 rounded-lg bg-surface-dim p-2 flex flex-col justify-between overflow-hidden shadow-inner border border-white/[0.04]">
              <div className="flex items-center justify-between">
                <div className="w-12 h-2 rounded bg-surface-variant" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
              <div className="space-y-1">
                <div className="w-16 h-1.5 rounded bg-surface-container-high" />
                <div className="w-24 h-1.5 rounded bg-surface-container-high" />
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="font-label-md text-sm text-on-surface font-semibold flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-primary" /> Obsidian Dark
              </span>
              {appearance.theme === "dark" ? (
                <CheckCircle2 className="w-4 h-4 text-primary" />
              ) : (
                <Circle className="w-4 h-4 text-outline" />
              )}
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant block mt-0.5">
              High-contrast night focus
            </span>
          </div>

          {/* Paper Light */}
          <div
            onClick={() => handleThemeSelect("light")}
            className={`group relative rounded-xl p-3.5 cursor-pointer shadow-lg transition-all ${
              appearance.theme === "light"
                ? "bg-surface-container-lowest ring-2 ring-primary border-transparent"
                : "bg-surface-container-high border border-white/[0.04] hover:bg-surface-variant opacity-80 hover:opacity-100"
            }`}
          >
            <div className="h-20 rounded-lg bg-[#dfe2ee] p-2 flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="flex items-center justify-between">
                <div className="w-12 h-2 rounded bg-[#a4a8b5]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#494bd6]" />
              </div>
              <div className="space-y-1">
                <div className="w-16 h-1.5 rounded bg-[#c5c8d6]" />
                <div className="w-24 h-1.5 rounded bg-[#c5c8d6]" />
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="font-label-md text-sm text-on-surface font-semibold flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-secondary" /> Paper Light
              </span>
              {appearance.theme === "light" ? (
                <CheckCircle2 className="w-4 h-4 text-primary" />
              ) : (
                <Circle className="w-4 h-4 text-outline" />
              )}
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant block mt-0.5">
              Daylight library reading
            </span>
          </div>

          {/* Auto Chrono (System) */}
          <div
            onClick={() => handleThemeSelect("system")}
            className={`group relative rounded-xl p-3.5 cursor-pointer shadow-lg transition-all ${
              appearance.theme === "system"
                ? "bg-surface-container-lowest ring-2 ring-primary border-transparent"
                : "bg-surface-container-high border border-white/[0.04] hover:bg-surface-variant opacity-80 hover:opacity-100"
            }`}
          >
            <div className="h-20 rounded-lg bg-gradient-to-tr from-surface-dim via-surface-container to-[#dfe2ee]/30 p-2 flex flex-col justify-between overflow-hidden shadow-inner border border-white/[0.04]">
              <div className="flex items-center justify-between">
                <div className="w-12 h-2 rounded bg-surface-variant" />
                <Laptop className="w-3.5 h-3.5 text-secondary" />
              </div>
              <div className="space-y-1">
                <div className="w-16 h-1.5 rounded bg-surface-container-high" />
                <div className="w-20 h-1.5 rounded bg-surface-container-high" />
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="font-label-md text-sm text-on-surface font-semibold flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-tertiary" /> Auto Chrono
              </span>
              {appearance.theme === "system" ? (
                <CheckCircle2 className="w-4 h-4 text-primary" />
              ) : (
                <Circle className="w-4 h-4 text-outline" />
              )}
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant block mt-0.5">
              Follows sunrise / OS sync
            </span>
          </div>
        </div>
      </div>

      {/* Accent Swatches & Layout Density */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-2">
        {/* Accent Color Swatches */}
        <div className="space-y-2">
          <label className="block font-label-md text-xs text-on-surface font-medium">
            Telemetry Accent Wave
          </label>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-white/[0.02]">
            {ACCENT_COLORS.map((accent) => {
              const isSelected = appearance.accentColor === accent.id;
              return (
                <button
                  key={accent.id}
                  type="button"
                  title={accent.name}
                  onClick={() => handleAccentSelect(accent.id)}
                  style={{ backgroundColor: accent.hex }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-surface-container scale-110"
                      : "hover:scale-110"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white font-bold" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Density Toggle */}
        <div className="space-y-2">
          <label className="block font-label-md text-xs text-on-surface font-medium">
            Dashboard Layout Density
          </label>
          <div className="p-1.5 rounded-lg bg-surface-container border border-white/[0.02] flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleDensitySelect("standard")}
              className={`flex-1 py-1.5 rounded text-center font-label-md text-xs transition-all ${
                appearance.density === "standard"
                  ? "bg-surface-bright text-on-surface font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Standard Spacing
            </button>
            <button
              type="button"
              onClick={() => handleDensitySelect("compact")}
              className={`flex-1 py-1.5 rounded text-center font-label-md text-xs transition-all ${
                appearance.density === "compact"
                  ? "bg-surface-bright text-on-surface font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Compact Pro
            </button>
          </div>
        </div>
      </div>

      {/* Font Size Scale Slider */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <label className="block font-label-md text-xs text-on-surface font-medium">
            Base Text Scale
          </label>
          <span className="font-mono-code text-[11px] text-on-surface-variant">
            {appearance.baseTextScale === 1
              ? "12px (Compact)"
              : appearance.baseTextScale === 2
              ? "14px (Default Inter Medium)"
              : appearance.baseTextScale === 3
              ? "16px (Readable)"
              : "18px (Large)"}
          </span>
        </div>
        <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-surface-container border border-white/[0.02]">
          <span className="text-xs text-outline font-medium">A</span>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={appearance.baseTextScale}
            onChange={(e) => handleScaleChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <span className="text-lg text-on-surface font-semibold">A</span>
        </div>
      </div>
    </section>
  );
}
