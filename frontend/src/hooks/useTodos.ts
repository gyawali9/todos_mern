import { useEffect, useState } from "react";
import { fetchTodos, createTodo, removeTodo } from "../services/todoService";
import type { Todo } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  useEffect(() => {
    let cancelled = false;
    fetchTodos().then((data) => {
      if (!cancelled) setTodos(data);
    });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const addTodo = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    await createTodo(text);
    refresh();
    setLoading(false);
  };

  const deleteTodo = async (id: string) => {
    setDeletingId(id);
    // Run API call and animation delay in parallel
    // Animation is 0.9s — wait for both to finish before removing the card
    await Promise.all([
      removeTodo(id),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);
    setDeletingId(null);
    refresh();
  };

  return { todos, loading, deletingId, addTodo, deleteTodo };
};
