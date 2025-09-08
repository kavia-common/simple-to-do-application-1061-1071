"use client";
import React from "react";
import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * TodoList
 * Displays the list of todo items with consistent spacing.
 */
export function TodoList({
  todos,
  onChanged,
}: {
  todos: Todo[];
  onChanged?: () => void;
}) {
  if (!todos.length) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 mt-6">
        <div className="section-card p-8 text-center text-black/70">
          No todos yet. Add your first task above!
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-4 space-y-3">
      {todos.map((t) => (
        <TodoItem key={t._id} todo={t} onChanged={onChanged} />
      ))}
    </div>
  );
}
