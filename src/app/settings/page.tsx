"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchPaletteModal } from "@/components/modals/search-palette-modal";
import { NotificationsPopover } from "@/components/modals/notifications-popover";
import { QuickActionModal, QuickActionType } from "@/components/modals/quick-action-modal";
import { useToast } from "@/components/ui/toast";

import { SettingsHeader, SettingsTab } from "@/components/settings/settings-header";
import { ProfilePanel } from "@/components/settings/profile-panel";
import { AppearancePanel } from "@/components/settings/appearance-panel";
import { NotificationsPanel } from "@/components/settings/notifications-panel";
import { AcademicRulesPanel } from "@/components/settings/academic-rules-panel";
import { DataPrivacyPanel } from "@/components/settings/data-privacy-panel";
import { SettingsTelemetrySidebar } from "@/components/settings/settings-telemetry-sidebar";

import {
  getAppSettings,
  saveAppSettings,
  getUserProfile,
  saveUserProfile,
  getStorageQuotaInfo,
  DEFAULT_APP_SETTINGS,
} from "@/lib/storage";
import { AppSettings, StorageQuotaInfo } from "@/types/settings";

export default function SettingsPage() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [settings, setSettings] = useState<AppSettings>(() => getAppSettings());
  const [quotaInfo, setQuotaInfo] = useState<StorageQuotaInfo>(() => getStorageQuotaInfo());
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // App shell modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState<QuickActionType>(null);

  // Refresh settings from storage
  const reloadFromStorage = useCallback(() => {
    const loadedSettings = getAppSettings();
    const profile = getUserProfile();
    setSettings({
      ...loadedSettings,
      profile,
    });
    setQuotaInfo(getStorageQuotaInfo());
    setHasUnsavedChanges(false);
  }, []);

  useEffect(() => {
    reloadFromStorage();

    const handleStorage = () => {
      reloadFromStorage();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [reloadFromStorage]);

  // Global hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [settings]);

  // Save Settings Handler
  const handleSave = () => {
    setIsSaving(true);
    try {
      saveAppSettings(settings);
      saveUserProfile(settings.profile);
      setQuotaInfo(getStorageQuotaInfo());
      setHasUnsavedChanges(false);

      setTimeout(() => {
        setIsSaving(false);
        toast({
          title: "Settings Saved",
          description: "All configuration preferences synchronized across command center.",
          type: "success",
        });
      }, 350);
    } catch {
      setIsSaving(false);
      toast({
        title: "Save Failed",
        description: "An error occurred while persisting settings.",
        type: "error",
      });
    }
  };

  // Restore Default Settings Handler
  const handleResetToDefault = () => {
    setSettings(DEFAULT_APP_SETTINGS);
    saveAppSettings(DEFAULT_APP_SETTINGS);
    saveUserProfile(DEFAULT_APP_SETTINGS.profile);
    setQuotaInfo(getStorageQuotaInfo());
    setHasUnsavedChanges(false);

    toast({
      title: "Defaults Restored",
      description: "Default configuration preferences have been applied.",
      type: "info",
    });
  };

  // Updaters for each section
  const handleProfileChange = (profile: AppSettings["profile"]) => {
    setSettings((prev) => ({ ...prev, profile }));
    setHasUnsavedChanges(true);
  };

  const handleAppearanceChange = (appearance: AppSettings["appearance"]) => {
    setSettings((prev) => ({ ...prev, appearance }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationsChange = (notifications: AppSettings["notifications"]) => {
    setSettings((prev) => ({ ...prev, notifications }));
    setHasUnsavedChanges(true);
  };

  const handleAcademicChange = (academic: AppSettings["academic"]) => {
    setSettings((prev) => ({ ...prev, academic }));
    setHasUnsavedChanges(true);
  };

  return (
    <div className="flex h-screen bg-background text-on-surface overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Drawer */}
      <MobileNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onOpenQuickAction={() => setQuickActionType("assignment")}
          onToggleNotifications={() => setNotificationsOpen(true)}
          unreadCount={3}
        />

        <main className="flex-1 overflow-y-auto p-space-lg pt-4 space-y-space-lg pb-24">
          {/* Top Hero Banner with Academic Node & Tab Switcher */}
          <SettingsHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
            studentId={settings.profile.studentId}
          />

          {/* Main 12-Column Configuration Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            {/* Left 8-Column Active Panel */}
            <div className="lg:col-span-8 space-y-space-lg">
              {activeTab === "profile" && (
                <ProfilePanel
                  profile={settings.profile}
                  onChange={handleProfileChange}
                />
              )}

              {activeTab === "appearance" && (
                <AppearancePanel
                  appearance={settings.appearance}
                  onChange={handleAppearanceChange}
                />
              )}

              {activeTab === "notifications" && (
                <NotificationsPanel
                  notifications={settings.notifications}
                  onChange={handleNotificationsChange}
                />
              )}

              {activeTab === "academic" && (
                <AcademicRulesPanel
                  academic={settings.academic}
                  onChange={handleAcademicChange}
                />
              )}

              {activeTab === "data-privacy" && (
                <DataPrivacyPanel onDataMutated={reloadFromStorage} />
              )}
            </div>

            {/* Right 4-Column Telemetry Sidecard */}
            <SettingsTelemetrySidebar
              quotaInfo={quotaInfo}
              isSaving={isSaving}
              onSave={handleSave}
              onResetToDefault={handleResetToDefault}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <SearchPaletteModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectAction={(actionType) => {
          setSearchOpen(false);
          setQuickActionType(actionType);
        }}
      />

      <NotificationsPopover
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <QuickActionModal
        isOpen={quickActionType !== null}
        type={quickActionType}
        onClose={() => setQuickActionType(null)}
      />
    </div>
  );
}
