import axios from "axios";
import type { Todo } from "../types/todo";

const API = import.meta.env.VITE_BACKEND_API;

export const fetchTodos = async () => {
  const res = await axios.get<Todo[]>(API);
  return res.data;
};

export const addTodo = async (text: string) => {
  const res = await axios.post<Todo>(API, { text });
  return res.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API}/${id}`);
};
