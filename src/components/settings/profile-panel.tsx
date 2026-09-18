"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IdCard,
  CheckCircle2,
  Lock,
  Camera,
  Flag,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { UserProfileSettings } from "@/types/settings";

interface ProfilePanelProps {
  profile: UserProfileSettings;
  onChange: (updated: UserProfileSettings) => void;
}

const AVATAR_PRESETS = [
  { id: "default", label: "Default Avatar", url: "/avatar.png" },
  {
    id: "avatar-1",
    label: "Student Scholar",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "avatar-2",
    label: "Software Engineer",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "avatar-3",
    label: "Researcher",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "avatar-4",
    label: "Dev Lead",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  },
];

export function ProfilePanel({ profile, onChange }: ProfilePanelProps) {
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [customAvatarInput, setCustomAvatarInput] = useState("");

  const handleFieldChange = (field: keyof UserProfileSettings, value: string | number) => {
    onChange({
      ...profile,
      [field]: value,
    });
  };

  const handleSelectPreset = (url: string) => {
    handleFieldChange("avatarUrl", url);
    setAvatarModalOpen(false);
  };

  const handleApplyCustomUrl = () => {
    if (customAvatarInput.trim()) {
      handleFieldChange("avatarUrl", customAvatarInput.trim());
      setCustomAvatarInput("");
      setAvatarModalOpen(false);
    }
  };

  return (
    <section className="rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-md space-y-space-md">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-space-sm">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <IdCard className="w-4 h-4" />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Profile Information
            </h2>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              Update your institutional identity and academic registration record.
            </p>
          </div>
        </div>
        <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-surface-container-highest text-primary font-medium border border-white/[0.04]">
          Synced w/ SIS
        </span>
      </div>

      {/* Avatar Section */}
      <div className="p-space-md rounded-lg bg-surface-container border border-white/[0.02] flex flex-col sm:flex-row items-center gap-space-md">
        <div className="relative group flex-shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-primary/30 relative">
            <Image
              src={profile.avatarUrl || "/avatar.png"}
              alt={profile.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={() => setAvatarModalOpen(true)}
            aria-label="Change profile photo"
            className="absolute inset-0 rounded-full bg-surface-container-lowest/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <Camera className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <button
              type="button"
              onClick={() => setAvatarModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-primary-container hover:bg-primary-container/80 text-on-primary font-label-md text-xs font-medium transition-all shadow-sm"
            >
              Change Avatar
            </button>
            <button
              type="button"
              onClick={() => handleFieldChange("avatarUrl", "/avatar.png")}
              className="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant hover:text-error transition-all font-label-md text-xs font-medium border border-white/[0.04]"
            >
              Reset to Default
            </button>
          </div>
          <p className="font-body-sm text-[12px] text-on-surface-variant">
            Recommended: Square PNG or WebP. Max payload limit: 4MB. Automatically updated in the top navigation bar.
          </p>
        </div>
      </div>

      {/* 2-Column Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-2">
        {/* Full Legal Name */}
        <div className="space-y-1.5">
          <label className="block font-label-md text-xs text-on-surface font-medium">
            Full Legal Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="w-full bg-surface-container text-on-surface font-body-md text-sm px-3.5 py-2.5 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary/50 focus:bg-surface-container-high transition-all"
            />
            <ShieldCheck className="w-4 h-4 absolute right-3 top-3 text-outline pointer-events-none" />
          </div>
        </div>

        {/* Student ID / Roll No (Readonly) */}
        <div className="space-y-1.5">
          <label className="block font-label-md text-xs text-on-surface font-medium">
            Student ID / Roll No
          </label>
          <div className="relative">
            <input
              type="text"
              value={profile.studentId}
              readOnly
              className="w-full bg-surface-container/60 text-on-surface-variant font-mono-code text-sm px-3.5 py-2.5 rounded-lg border border-white/[0.02] cursor-not-allowed"
            />
            <Lock className="w-4 h-4 absolute right-3 top-3 text-outline/60 pointer-events-none" />
          </div>
        </div>

        {/* Academic Email */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block font-label-md text-xs text-on-surface font-medium">
              Academic Email
            </label>
            <span className="inline-flex items-center gap-1 font-label-sm text-[11px] text-tertiary">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </span>
          </div>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className="w-full bg-surface-container text-on-surface font-body-md text-sm px-3.5 py-2.5 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary/50 focus:bg-surface-container-high transition-all"
          />
        </div>

        {/* Major / Department */}
        <div className="space-y-1.5">
          <label className="block font-label-md text-xs text-on-surface font-medium">
            Major / Department
          </label>
          <input
            type="text"
            value={profile.major}
            onChange={(e) => handleFieldChange("major", e.target.value)}
            className="w-full bg-surface-container text-on-surface font-body-md text-sm px-3.5 py-2.5 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary/50 focus:bg-surface-container-high transition-all"
          />
        </div>

        {/* Academic Year & Standing */}
        <div className="space-y-1.5">
          <label className="block font-label-md text-xs text-on-surface font-medium">
            Academic Year &amp; Standing
          </label>
          <input
            type="text"
            value={profile.academicYear}
            onChange={(e) => handleFieldChange("academicYear", e.target.value)}
            className="w-full bg-surface-container text-on-surface font-body-md text-sm px-3.5 py-2.5 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary/50 focus:bg-surface-container-high transition-all"
          />
        </div>

        {/* Target Term GPA */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block font-label-md text-xs text-on-surface font-medium">
              Target Term GPA
            </label>
            <span className="font-mono-code text-[11px] text-primary">
              Current: {profile.currentGpa.toFixed(2)}
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0.00"
              max="4.00"
              value={profile.targetGpa}
              onChange={(e) => handleFieldChange("targetGpa", parseFloat(e.target.value) || 0)}
              className="w-full bg-surface-container text-on-surface font-mono-code text-sm px-3.5 py-2.5 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary/50 focus:bg-surface-container-high transition-all"
            />
            <Flag className="w-4 h-4 absolute right-3 top-3 text-tertiary pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {avatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-surface-container-low border border-white/[0.08] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Choose Profile Picture
                </h3>
                <p className="text-body-sm text-xs text-on-surface-variant mt-0.5">
                  Select a scholarly avatar preset or provide a custom image URL.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAvatarModalOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-5 gap-3">
              {AVATAR_PRESETS.map((preset) => {
                const isSelected = profile.avatarUrl === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all group ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/40 scale-105"
                        : "border-transparent hover:border-white/20"
                    }`}
                  >
                    <Image
                      src={preset.url}
                      alt={preset.label}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-on-primary bg-primary rounded-full p-0.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom URL Input */}
            <div className="space-y-2 pt-2 border-t border-white/[0.04]">
              <label className="block text-xs font-medium text-on-surface">
                Or Paste Image URL (HTTPS)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={customAvatarInput}
                  onChange={(e) => setCustomAvatarInput(e.target.value)}
                  className="flex-1 bg-surface-container text-on-surface text-xs px-3 py-2 rounded-lg border border-white/[0.04] focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-medium text-xs hover:bg-primary transition-all"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
