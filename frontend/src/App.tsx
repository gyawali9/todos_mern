import { useState } from "react";
import { motion } from "framer-motion";
import { Background } from "./components/Background";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { TodoDetail } from "./components/TodoDetail";
import { useTodos } from "./hooks/useTodos";
import type { Todo } from "./types/todo";
import "./styles/global.css";

function App() {
  const { todos, loading, deletingId, addTodo, deleteTodo } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleSelect = (todo: Todo) => {
    setSelectedTodo((prev) => (prev?._id === todo._id ? null : todo));
  };

  const handleClose = () => setSelectedTodo(null);

  const handleDelete = (id: string) => {
    if (selectedTodo?._id === id) setSelectedTodo(null);
    deleteTodo(id);
  };

  const isOpen = !!selectedTodo;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "60px 20px",
        overflow: "hidden",
      }}
    >
      <Background />

      {/* Fixed-width outer shell — never changes size, no layout shifts */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: isOpen ? "800px" : "600px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        {/* Left panel — slides left when detail opens */}
        <motion.div
          animate={{
            x: isOpen ? 0 : 0,
            width: isOpen ? "calc(100% - 388px)" : "100%",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0, minWidth: 0 }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: "40px" }}
          >
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "#6366f1",
                textTransform: "uppercase",
                fontWeight: 600,
                display: "block",
                marginBottom: "6px",
              }}
            >
              ◆ workspace
            </span>

            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 700,
                color: "#f0f0f5",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                fontFamily: "'DM Serif Display', Georgia, serif",
              }}
            >
              My Todos
            </h1>

            <p
              style={{
                color: "#444457",
                fontSize: "13px",
                marginTop: "8px",
                letterSpacing: "0.02em",
              }}
            >
              {todos.length === 0
                ? "Nothing yet. Add something."
                : `${todos.length} task${todos.length !== 1 ? "s" : ""} remaining`}
            </p>
          </motion.div>

          <TodoInput onAdd={addTodo} loading={loading} />
          <TodoList
            todos={todos}
            deletingId={deletingId}
            selectedId={selectedTodo?._id ?? null}
            onDelete={handleDelete}
            onSelect={handleSelect}
          />
        </motion.div>

        {/* Right panel — always in DOM, slides in/out via transform only */}
        <motion.div
          animate={{
            x: isOpen ? 0 : 60,
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "360px",
            visibility: isOpen ? "visible" : "hidden",
          }}
        >
          <TodoDetail todo={selectedTodo} onClose={handleClose} />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
