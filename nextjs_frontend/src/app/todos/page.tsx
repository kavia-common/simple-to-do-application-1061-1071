"use client";
import React, { useEffect, useMemo, useState } from "react";
import { TodoHeader } from "@/components/TodoHeader";
import { AddTodoForm } from "@/components/AddTodoForm";
import { TodoList } from "@/components/TodoList";
import { FilterTab, TodoFilters } from "@/components/TodoFilters";
import { listTodos } from "@/lib/api";
import { Todo } from "@/types/todo";

/**
 * PUBLIC_INTERFACE
 * TodosPage
 * Entry UI for todo CRUD: add, list, filter, update, delete.
 */
export default function TodosPage() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const filteredParams = useMemo(() => {
    const params: { q: string; completed?: boolean } = { q };
    if (filter === "active") params.completed = false;
    if (filter === "completed") params.completed = true;
    return params;
  }, [filter, q]);

  async function fetchTodos() {
    setLoading(true);
    setError(null);
    try {
      const res = await listTodos(filteredParams);
      setTodos(res.data || []);
    } catch (e) {
      const maybe: unknown = e;
      const message =
        typeof maybe === "object" && maybe !== null && "message" in maybe
          ? String((maybe as { message?: string }).message)
          : "Failed to load todos";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, q]);

  return (
    <main className="min-h-screen pb-16">
      <TodoHeader />
      <section className="w-full max-w-3xl mx-auto px-4">
        <div className="section-card p-3 md:p-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <input
              aria-label="Search todos"
              className="flex-1 border rounded px-3 py-2"
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <div className="todo-chip" aria-hidden>
                Pending
              </div>
              <div className="todo-chip" aria-hidden>
                In progress
              </div>
              <div className="todo-chip" aria-hidden>
                Completed
              </div>
            </div>
          </div>
        </div>
      </section>

      <TodoFilters value={filter} onChange={setFilter} />
      <AddTodoForm onCreated={fetchTodos} />

      {loading ? (
        <div className="w-full max-w-3xl mx-auto px-4 mt-6">
          <div className="section-card p-8 text-center">Loading...</div>
        </div>
      ) : error ? (
        <div className="w-full max-w-3xl mx-auto px-4 mt-6">
          <div className="section-card p-8 text-center text-red-600">Error: {error}</div>
        </div>
      ) : (
        <TodoList todos={todos} onChanged={fetchTodos} />
      )}
    </main>
  );
}
