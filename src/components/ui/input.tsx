import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
  trailingShortcut?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      leadingIcon,
      trailingShortcut,
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative flex items-center w-full", wrapperClassName)}>
        {leadingIcon && (
          <div className="absolute left-3 text-outline pointer-events-none flex items-center justify-center">
            {leadingIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm py-2 rounded-full border border-white/[0.08] transition-all duration-200",
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-high",
            leadingIcon ? "pl-9" : "pl-3.5",
            trailingShortcut ? "pr-14" : "pr-3.5",
            className
          )}
          {...props}
        />
        {trailingShortcut && (
          <div className="absolute right-2.5 flex items-center pointer-events-none">
            <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono-code text-[10px] border border-white/[0.08]">
              {trailingShortcut}
            </kbd>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
