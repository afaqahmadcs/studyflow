"use client";

import React from "react";
import { X } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { useNav } from "@/context/nav-context";

export function MobileNav() {
  const { mobileMenuOpen, setMobileMenuOpen } = useNav();

  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative z-10 flex flex-col w-[280px] max-w-full h-full bg-surface-container-lowest animate-in slide-in-from-left duration-200 shadow-2xl">
        <div className="absolute top-4 right-3 z-50">
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation"
            className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 h-full overflow-hidden" onClick={() => setMobileMenuOpen(false)}>
          <Sidebar className="w-full border-r-0" />
        </div>
      </div>
    </div>
  );
}
