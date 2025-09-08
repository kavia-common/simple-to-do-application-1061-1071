"use client";
import React from "react";

export type FilterTab = "all" | "active" | "completed";

/**
 * PUBLIC_INTERFACE
 * TodoFilters
 * Tabbed filters inspired by the MyProfile profile-navbar underline design.
 */
export function TodoFilters({
  value,
  onChange,
}: {
  value: FilterTab;
  onChange: (v: FilterTab) => void;
}) {
  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <nav className="w-full max-w-3xl mx-auto px-4 mt-2" aria-label="Todo filters">
      <div className="grid grid-cols-3">
        {tabs.map((t) => {
          const active = value === t.key;
          return (
            <button
              key={t.key}
              className="flex flex-col items-center justify-center py-2"
              onClick={() => onChange(t.key)}
              aria-pressed={active}
            >
              <span className={`text-sm ${active ? "font-semibold" : "text-black/70"}`}>{t.label}</span>
              <span className={`nav-underline mt-1 w-full ${active ? "active" : ""}`} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
