"use client";
import React, { useState } from "react";
import { Todo, UpdateTodoBody } from "@/types/todo";
import { deleteTodo, updateTodo } from "@/lib/api";

/**
 * PUBLIC_INTERFACE
 * TodoItem
 * A single todo row inspired by MyProfile's clean cards and subtle chips.
 */
export function TodoItem({
  todo,
  onChanged,
}: {
  todo: Todo;
  onChanged?: () => void;
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description || "");

  async function toggleCompleted() {
    const body: UpdateTodoBody = { completed: !todo.completed, status: !todo.completed ? "completed" : "pending" };
    await updateTodo(todo._id, body);
    onChanged?.();
  }

  async function saveEdit() {
    const nextTitle = title.trim() || todo.title;
    const nextDesc = description.trim() || undefined;
    const body: UpdateTodoBody = { title: nextTitle, description: nextDesc };
    await updateTodo(todo._id, body);
    setEditing(false);
    onChanged?.();
  }

  async function remove() {
    await deleteTodo(todo._id);
    onChanged?.();
  }

  return (
    <div className="section-card p-3 md:p-4">
      <div className="flex items-start gap-3">
        <button
          onClick={toggleCompleted}
          aria-pressed={todo.completed}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as completed"}
          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${todo.completed ? "bg-black text-white" : ""}`}
          title="Toggle complete"
        >
          {todo.completed ? "✓" : ""}
        </button>

        <div className="flex-1">
          {editing ? (
            <div className="flex flex-col gap-2">
              <input
                className="border rounded px-2 py-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Edit title"
              />
              <input
                className="border rounded px-2 py-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-label="Edit description"
              />
            </div>
          ) : (
            <>
              <h3 className={`text-base font-medium ${todo.completed ? "line-through text-black/50" : ""}`}>{todo.title}</h3>
              {todo.description ? <p className={`text-sm mt-0.5 ${todo.completed ? "line-through text-black/50" : "text-black/70"}`}>{todo.description}</p> : null}
              <div className="mt-2 flex items-center gap-2">
                <span className="todo-chip" aria-label={`Status ${todo.status || (todo.completed ? "completed" : "pending")}`}>
                  <span className="w-2 h-2 rounded-full" style={{ background: todo.completed ? "var(--color-accent)" : "var(--color-primary)" }} />
                  {todo.status || (todo.completed ? "completed" : "pending")}
                </span>
                {todo.priority ? (
                  <span className="todo-chip" aria-label={`Priority ${todo.priority}`}>
                    Priority: {todo.priority}
                  </span>
                ) : null}
                {todo.dueDate ? (
                  <span className="todo-chip" aria-label={`Due ${new Date(todo.dueDate).toLocaleDateString()}`}>
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button onClick={saveEdit} className="px-2 py-1 rounded text-white" style={{ background: "var(--color-accent)" }}>
                Save
              </button>
              <button onClick={() => setEditing(false)} className="px-2 py-1 rounded border">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="px-2 py-1 rounded border" aria-label="Edit todo">
                Edit
              </button>
              <button onClick={remove} className="px-2 py-1 rounded border border-red-500 text-red-600" aria-label="Delete todo">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
