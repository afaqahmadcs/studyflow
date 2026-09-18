"use client";

import React from "react";
import { Brain } from "lucide-react";

export function ConcentrationHeatmap() {
  const days = [
    {
      name: "Mon",
      slots: [
        "bg-surface-container-high",
        "bg-secondary shadow-sm",
        "bg-secondary shadow-sm",
        "bg-primary/70",
        "bg-primary/30",
        "bg-primary/70",
        "bg-surface-container-high",
      ],
    },
    {
      name: "Tue",
      slots: [
        "bg-surface-container-high",
        "bg-secondary",
        "bg-secondary",
        "bg-surface-container-high",
        "bg-primary/30",
        "bg-primary/70",
        "bg-primary/30",
      ],
    },
    {
      name: "Wed",
      slots: [
        "bg-primary/30",
        "bg-secondary shadow-sm",
        "bg-secondary shadow-sm",
        "bg-primary/70",
        "bg-primary/70",
        "bg-secondary",
        "bg-surface-container-high",
      ],
    },
    {
      name: "Thu",
      slots: [
        "bg-surface-container-high",
        "bg-secondary",
        "bg-primary/70",
        "bg-surface-container-high",
        "bg-primary/30",
        "bg-primary/30",
        "bg-surface-container-high",
      ],
    },
    {
      name: "Fri",
      slots: [
        "bg-surface-container-high",
        "bg-secondary",
        "bg-secondary",
        "bg-primary/30",
        "bg-surface-container-high",
        "bg-primary/30",
        "bg-surface-container-high",
      ],
    },
    {
      name: "Sat",
      isHighlight: true,
      slots: [
        "bg-surface-container-high",
        "bg-secondary",
        "bg-secondary shadow-sm",
        "bg-secondary shadow-sm",
        "bg-primary/70",
        "bg-surface-container-high",
        "bg-surface-container-high",
      ],
    },
    {
      name: "Sun",
      slots: [
        "bg-surface-container-high",
        "bg-primary/70",
        "bg-primary/70",
        "bg-primary/30",
        "bg-surface-container-high",
        "bg-primary/70",
        "bg-surface-container-high",
      ],
    },
  ];

  return (
    <div className="lg:col-span-7 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl space-y-space-md">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Cognitive Concentration Heatmap
            </h2>
            <span className="px-2 py-0.5 rounded bg-surface-container-high text-[11px] font-mono-code text-on-surface-variant font-medium border border-white/[0.04]">
              Spring Cadence
            </span>
          </div>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
            Study intensity categorized by hour of day and day of week
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-outline">
          <span>Low</span>
          <span className="w-2.5 h-2.5 rounded-sm bg-surface-container-high" />
          <span className="w-2.5 h-2.5 rounded-sm bg-primary/30" />
          <span className="w-2.5 h-2.5 rounded-sm bg-primary/70" />
          <span className="w-2.5 h-2.5 rounded-sm bg-secondary" />
          <span>High Flow</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[420px] space-y-1.5">
          {/* Time Slot Headers */}
          <div className="grid grid-cols-8 text-center font-mono-code text-[10px] text-outline pb-1">
            <span className="text-left">Day</span>
            <span>06:00</span>
            <span className="text-secondary font-bold">09:00★</span>
            <span className="text-secondary font-bold">11:00★</span>
            <span>14:00</span>
            <span>17:00</span>
            <span>20:00</span>
            <span>23:00</span>
          </div>

          {/* Days */}
          {days.map((d, index) => (
            <div key={index} className="grid grid-cols-8 items-center gap-1.5 text-center">
              <span
                className={`font-mono-code text-[11px] text-left ${
                  d.isHighlight ? "text-secondary font-semibold" : "text-on-surface-variant"
                }`}
              >
                {d.name}
              </span>
              {d.slots.map((slotColor, sIdx) => (
                <span
                  key={sIdx}
                  className={`h-6 rounded ${slotColor} transition-transform hover:scale-105 cursor-pointer`}
                  title={`${d.name} slot ${sIdx + 1}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Summary Insight */}
      <div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between text-body-sm text-[12px] border border-white/[0.04]">
        <span className="text-on-surface flex items-center gap-2">
          <Brain className="w-4 h-4 text-secondary" />
          <span>
            Peak Cognitive Productivity:{" "}
            <strong className="text-secondary font-mono-code">09:00 AM – 12:30 PM</strong>
          </span>
        </span>
        <span className="text-outline font-mono-code text-[11px]">
          Concentration Index 9.4 / 10
        </span>
      </div>
    </div>
  );
}
