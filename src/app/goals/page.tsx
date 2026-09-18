"use client";

import React, { useState, useEffect } from "react";
import { Plus, Filter, Sparkles, Check, ArrowRight } from "lucide-react";
import { Goal, GoalType, GoalsTelemetryStats } from "@/types/goals";
import { INITIAL_GOALS, INITIAL_GOALS_TELEMETRY } from "@/data/goals-data";
import { GoalsTelemetry } from "@/components/goals/goals-telemetry";
import { GoalCardDaily } from "@/components/goals/goal-card-daily";
import { GoalCardSprint } from "@/components/goals/goal-card-sprint";
import { GoalCardStrategic } from "@/components/goals/goal-card-strategic";
import { GoalModal } from "@/components/goals/goal-modal";
import { GoalProgressModal } from "@/components/goals/goal-progress-modal";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export default function GoalsPage() {
  const { toast } = useToast();

  // State initialized with localStorage fallback
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_goals");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_GOALS;
  });

  const [activeTab, setActiveTab] = useState<"ALL" | GoalType>("ALL");
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [progressGoal, setProgressGoal] = useState<Goal | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("command_center_goals", JSON.stringify(goals));
  }, [goals]);

  // Derived telemetry metrics
  const dailyGoals = goals.filter((g) => g.type === "daily");
  const dailyCompleted = dailyGoals.filter((g) => g.status === "completed").length;
  const weeklyGoals = goals.filter((g) => g.type === "weekly");
  const weeklyVelocity =
    weeklyGoals.length > 0
      ? Math.round(
          (weeklyGoals.reduce(
            (acc, g) => acc + (g.targetValue > 0 ? (g.currentValue / g.targetValue) * 100 : 0),
            0
          ) /
            weeklyGoals.length)
        )
      : 84;

  const telemetryStats: GoalsTelemetryStats = {
    dailyCompleted,
    dailyTotal: dailyGoals.length,
    weeklyVelocityPercent: weeklyVelocity,
    currentGpa: 3.86,
    targetGpa: 3.90,
    streakDays: 14,
  };

  // Filtered Goals
  const filteredGoals = goals.filter((goal) => {
    if (activeTab !== "ALL" && goal.type !== activeTab) return false;
    if (selectedSubject !== "ALL" && goal.subjectCode !== selectedSubject) return false;
    return true;
  });

  // Handlers
  const handleToggleComplete = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const isNowCompleted = g.status !== "completed";
          const newStatus = isNowCompleted ? "completed" : "pending";
          const newCurrent = isNowCompleted ? g.targetValue : 0;
          const nowTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          if (isNowCompleted) {
            toast({
              title: `Goal "${g.title}" marked completed!`,
              description: `+${g.xpReward} XP Academic Mastery • Focus Velocity Up`,
              type: "success",
            });
          } else {
            toast({
              title: "Goal Reopened",
              description: `Goal marked as pending.`,
              type: "info",
            });
          }

          return {
            ...g,
            status: newStatus,
            currentValue: newCurrent,
            verifiedAt: isNowCompleted ? nowTime : undefined,
          };
        }
        return g;
      })
    );
  };

  const handleSaveGoal = (goalData: Partial<Goal>) => {
    if (goalData.id) {
      // Edit
      setGoals((prev) =>
        prev.map((g) => (g.id === goalData.id ? ({ ...g, ...goalData } as Goal) : g))
      );
      toast({
        title: "Goal Updated",
        description: `Successfully modified "${goalData.title}".`,
        type: "success",
      });
    } else {
      // Create
      const newGoal: Goal = {
        id: `goal-${Date.now()}`,
        title: goalData.title || "Untitled Goal",
        description: goalData.description || "",
        type: goalData.type || "daily",
        subjectCode: goalData.subjectCode || "CS450",
        subjectName: goalData.subjectName || "Academics",
        target: goalData.target || "1 Task",
        currentValue: goalData.currentValue || 0,
        targetValue: goalData.targetValue || 1,
        unit: goalData.unit || "tasks",
        deadline: goalData.deadline || "Tonight, 11:59 PM",
        status: goalData.status || "pending",
        priority: goalData.priority || "medium",
        xpReward: goalData.xpReward || 50,
      };

      setGoals((prev) => [newGoal, ...prev]);
      toast({
        title: "New Goal Registered",
        description: `Created "${newGoal.title}" under ${newGoal.type} horizon.`,
        type: "success",
      });
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    toast({
      title: "Goal Removed",
      description: "Academic objective has been deleted.",
      type: "info",
    });
  };

  const handleUpdateProgress = (goalId: string, newProgress: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const isDone = newProgress >= g.targetValue;
          return {
            ...g,
            currentValue: newProgress,
            status: isDone ? "completed" : newProgress > 0 ? "in_progress" : "pending",
          };
        }
        return g;
      })
    );
    toast({
      title: "Progress Calibrated",
      description: "Updated objective completion metrics.",
      type: "info",
    });
  };

  return (
    <div className="flex flex-col w-full space-y-space-xl p-space-lg max-w-7xl mx-auto">
      {/* 1. Header Block with Operational Controls */}
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded font-mono-code text-label-sm uppercase bg-surface-container-high text-primary font-medium text-[11px] border border-white/[0.04]">
              Sprint Term 2025
            </span>
            <span className="font-label-sm text-label-sm text-outline">•</span>
            <span className="font-mono-code text-label-sm text-secondary font-medium tracking-tight text-[11px]">
              Week 8 of 16
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-semibold">
            Academic Goals & Milestones
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant text-[13px]">
            Tracking {goals.length} Active Objectives •{" "}
            <span className="text-tertiary font-medium">
              {weeklyVelocity}% Overall Velocity
            </span>{" "}
            across 4 Course Cylinders
          </p>
        </div>

        {/* Action & Filter Dock */}
        <div className="flex flex-wrap items-center gap-space-sm">
          {/* Segmented Timeframe Switcher */}
          <nav aria-label="Goal Timeframes" className="flex items-center p-1 rounded-lg bg-surface-container-lowest border border-white/[0.04] shadow-inner">
            {(["ALL", "daily", "weekly", "academic"] as const).map((tab) => {
              const label =
                tab === "ALL"
                  ? "All"
                  : tab === "daily"
                  ? "Daily"
                  : tab === "weekly"
                  ? "Weekly Sprints"
                  : "Semester Milestones";
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-3 py-1.5 rounded-md font-label-md text-label-md transition-all text-[12px]",
                    activeTab === tab
                      ? "bg-surface-container-high text-on-surface font-semibold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Subject Filter Dropdown */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-surface-container-low text-on-surface font-label-md text-[12px] px-3 py-2 rounded-lg border border-white/[0.04] focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Subjects</option>
            <option value="CS401">CS401 Distributed Systems</option>
            <option value="CS450">CS450 Operating Systems</option>
            <option value="CS320">CS320 Database Systems</option>
            <option value="MATH310">MATH310 Linear Algebra</option>
          </select>

          {/* Primary Modal Trigger Button */}
          <button
            onClick={() => {
              setEditingGoal(null);
              setIsNewGoalModalOpen(true);
            }}
            className="flex items-center gap-2 px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary font-label-md text-label-md font-semibold shadow-[0_0_20px_rgba(128,131,255,0.35)] transition-all text-[13px]"
          >
            <Plus className="w-4 h-4" />
            <span>New Goal</span>
            <kbd className="px-1.5 py-0.5 rounded bg-on-primary/20 text-on-primary font-mono-code text-[10px]">
              ⌘G
            </kbd>
          </button>
        </div>
      </section>

      {/* 2. Top Telemetry Row: 4 Metric Gauge Cards */}
      <GoalsTelemetry stats={telemetryStats} />

      {/* 3. Main Asymmetric Workspace Layout (7 cols Focus Checklist & Sprints / 5 cols Strategic & Contextual) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
        {/* LEFT COLUMN (7 Cols): Daily Micro-Goals & Weekly Sprints */}
        <div className="lg:col-span-7 space-y-space-lg">
          {/* Section 1: Daily Micro-Goals */}
          {(activeTab === "ALL" || activeTab === "daily") && (
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-space-sm">
                  <div className="w-2 h-6 rounded-full bg-primary" />
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight text-[18px]">
                    Daily Micro-Goals
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono-code text-[11px] font-medium border border-white/[0.04]">
                    Today
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-[12px]">
                  <Check className="w-4 h-4 text-tertiary" />
                  <span>Syncing Realtime</span>
                </div>
              </div>

              {filteredGoals.filter((g) => g.type === "daily").length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant bg-surface-container-low rounded-xl border border-white/[0.04] text-[13px]">
                  No daily goals for this filter. Click "+ New Goal" to register today's tasks!
                </div>
              ) : (
                filteredGoals
                  .filter((g) => g.type === "daily")
                  .map((goal) => (
                    <GoalCardDaily
                      key={goal.id}
                      goal={goal}
                      onToggleComplete={handleToggleComplete}
                      onEdit={(g) => {
                        setEditingGoal(g);
                        setIsNewGoalModalOpen(true);
                      }}
                      onDelete={handleDeleteGoal}
                      onUpdateProgress={(g) => setProgressGoal(g)}
                    />
                  ))
              )}
            </div>
          )}

          {/* Section 2: Weekly Sprints & Key Results */}
          {(activeTab === "ALL" || activeTab === "weekly") && (
            <div className="pt-space-md space-y-space-md">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-space-sm">
                  <div className="w-2 h-6 rounded-full bg-secondary" />
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight text-[18px]">
                    Weekly Sprints & Key Results
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono-code text-[11px] font-medium border border-white/[0.04]">
                    Week 8 Target
                  </span>
                </div>
              </div>

              {filteredGoals.filter((g) => g.type === "weekly").length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant bg-surface-container-low rounded-xl border border-white/[0.04] text-[13px]">
                  No weekly sprint goals found matching this filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-space-sm">
                  {filteredGoals
                    .filter((g) => g.type === "weekly")
                    .map((goal) => (
                      <GoalCardSprint
                        key={goal.id}
                        goal={goal}
                        onEdit={(g) => {
                          setEditingGoal(g);
                          setIsNewGoalModalOpen(true);
                        }}
                        onDelete={handleDeleteGoal}
                        onUpdateProgress={(g) => setProgressGoal(g)}
                        onToggleComplete={handleToggleComplete}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (5 Cols): Semester Strategic Goals */}
        <div className="lg:col-span-5 space-y-space-lg">
          {(activeTab === "ALL" || activeTab === "academic") && (
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-space-sm">
                  <div className="w-2 h-6 rounded-full bg-tertiary" />
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight text-[18px]">
                    Semester Strategic
                  </h2>
                </div>
                <span className="font-mono-code text-body-sm text-outline text-[12px]">
                  Spring '25
                </span>
              </div>

              {filteredGoals.filter((g) => g.type === "academic").length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant bg-surface-container-low rounded-xl border border-white/[0.04] text-[13px]">
                  No semester strategic milestones matching this filter.
                </div>
              ) : (
                filteredGoals
                  .filter((g) => g.type === "academic")
                  .map((goal) => (
                    <GoalCardStrategic
                      key={goal.id}
                      goal={goal}
                      onEdit={(g) => {
                        setEditingGoal(g);
                        setIsNewGoalModalOpen(true);
                      }}
                      onDelete={handleDeleteGoal}
                      onUpdateProgress={(g) => setProgressGoal(g)}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))
              )}
            </div>
          )}

          {/* Command Center Intelligence Banner */}
          <div className="relative rounded-xl overflow-hidden bg-surface-container-low border border-white/[0.04] p-space-md shadow-md">
            <div className="flex flex-col space-y-1">
              <span className="font-mono-code text-[10px] uppercase tracking-wider text-secondary font-semibold">
                Command Center Intelligence
              </span>
              <p className="font-headline-sm text-label-md text-on-surface font-medium text-[13px]">
                Next Milestone Review in 4 days with Academic Advisor
              </p>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                Optimal revision pacing maintained across CS401, CS450, and CS320. 78% overall velocity ensures on-time term completion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Modals */}
      <GoalModal
        isOpen={isNewGoalModalOpen}
        onClose={() => setIsNewGoalModalOpen(false)}
        onSave={handleSaveGoal}
        editingGoal={editingGoal}
      />

      <GoalProgressModal
        isOpen={!!progressGoal}
        onClose={() => setProgressGoal(null)}
        goal={progressGoal}
        onUpdate={handleUpdateProgress}
      />
    </div>
  );
}
