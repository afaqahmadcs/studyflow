"use client";

import React, { createContext, useContext, useState } from "react";

export type NavItemKey =
  | "overview"
  | "timetable"
  | "assignments"
  | "exams"
  | "attendance"
  | "study"
  | "goals"
  | "notes"
  | "analytics"
  | "settings";

interface NavContextType {
  activeNav: NavItemKey;
  setActiveNav: (key: NavItemKey) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [activeNav, setActiveNav] = useState<NavItemKey>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <NavContext.Provider
      value={{
        activeNav,
        setActiveNav,
        mobileMenuOpen,
        setMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
}
