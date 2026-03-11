import { useEffect, useState } from "react";
import axios from "axios";

import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const API = import.meta.env.VITE_BACKEND_API;

  const addTodo = async () => {
    if (!text) return;

    await axios.post(API, { text });
    setText("");

    const res = await axios.get<Todo[]>(API);
    setTodos(res.data);
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`${API}/${id}`);

    const res = await axios.get<Todo[]>(API);
    setTodos(res.data);
  };

  useEffect(() => {
    const loadTodos = async () => {
      const res = await axios.get<Todo[]>(API);
      setTodos(res.data);
    };

    loadTodos();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Todo App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
