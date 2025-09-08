"use client";
import React from "react";

/**
 * PUBLIC_INTERFACE
 * TodoHeader
 * A simple header inspired by the MyProfile top bar with a title and minimal action placeholders.
 */
export function TodoHeader() {
  return (
    <header className="w-full max-w-3xl mx-auto px-4 pt-6 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div aria-hidden className="w-6 h-6 rounded-full border border-black/80" />
          <h1 className="text-2xl font-semibold">My Todos</h1>
          <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-black text-white">
            v1
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Settings" className="w-6 h-6 rounded border border-black/20" />
        </div>
      </div>
    </header>
  );
}
