import axios from "axios";
import type { Todo } from "../types/todo";

const BASE_URL = import.meta.env.VITE_BACKEND_API;
export const API = BASE_URL + "/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get<Todo[]>(API);
  return res.data;
};

export const createTodo = async (title: string): Promise<void> => {
  await axios.post(API, { title });
};

export const removeTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API}/${id}`);
};
