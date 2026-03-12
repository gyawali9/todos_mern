import { AnimatePresence, motion } from "framer-motion";
import { TodoItem } from "./TodoItem";
import type { Todo } from "../types/todo";

interface Props {
  todos: Todo[];
  deletingId: string | null;
  selectedId: string | null;
  onDelete: (id: string) => void;
  onSelect: (todo: Todo) => void;
}

export const TodoList = ({
  todos,
  deletingId,
  selectedId,
  onDelete,
  onSelect,
}: Props) => {
  return (
    <>
      {todos.length > 0 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            marginBottom: "16px",
            transformOrigin: "left",
          }}
        />
      )}

      <AnimatePresence mode="popLayout">
        {todos.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#2a2a3a",
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ◇ &nbsp; all clear
          </motion.div>
        ) : (
          todos.map((todo, index) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              index={index}
              isDeleting={deletingId === todo._id}
              isSelected={selectedId === todo._id}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          ))
        )}
      </AnimatePresence>

      {todos.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: "center",
            color: "#1e1e2e",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: "32px",
          }}
        >
          press enter to add quickly
        </motion.p>
      )}
    </>
  );
};
