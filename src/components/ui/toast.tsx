"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
}

interface ToastContextType {
  toast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      type = "success",
      duration = 3500,
    }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { id, title, description, type, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-xl border backdrop-blur-xl animate-in slide-in-from-bottom-2 fade-in duration-200",
              t.type === "success" &&
                "bg-surface-container-high/95 border-tertiary/30 text-on-surface",
              t.type === "error" &&
                "bg-surface-container-high/95 border-error/30 text-on-surface",
              t.type === "info" &&
                "bg-surface-container-high/95 border-primary/30 text-on-surface"
            )}
          >
            <div className="mt-0.5 flex-shrink-0">
              {t.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-tertiary" />
              )}
              {t.type === "error" && (
                <AlertCircle className="w-5 h-5 text-error" />
              )}
              {t.type === "info" && <Info className="w-5 h-5 text-primary" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-label-md text-label-md font-semibold text-on-surface">
                {t.title}
              </h4>
              {t.description && (
                <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
