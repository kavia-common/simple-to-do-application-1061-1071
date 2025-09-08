"use client";
import React, { useState } from "react";
import { createTodo } from "@/lib/api";

/**
 * PUBLIC_INTERFACE
 * AddTodoForm
 * Form to add a new todo item, mapping minimal fields while allowing future expansion.
 */
export function AddTodoForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await createTodo({ title: title.trim(), description: description.trim() || undefined, completed: false, status: "pending" });
    setTitle("");
    setDescription("");
    onCreated?.();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-4 mt-4">
      <div className="section-card p-3 md:p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="New todo title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Todo title"
          />
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Todo description"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded text-white"
            style={{ background: "linear-gradient(180deg, var(--color-primary), var(--color-secondary))" }}
            aria-label="Add todo"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
