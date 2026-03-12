import { motion } from "framer-motion";
import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  index: number;
  isDeleting: boolean;
  isSelected: boolean;
  onDelete: (id: string) => void;
  onSelect: (todo: Todo) => void;
}

export const TodoItem = ({
  todo,
  index,
  isDeleting,
  isSelected,
  onDelete,
  onSelect,
}: Props) => {
  const getBg = () => {
    if (isDeleting) return "rgba(248,113,113,0.04)";
    if (isSelected) return "rgba(99,102,241,0.1)";
    return "rgba(255,255,255,0.025)";
  };

  const getBorderColor = () => {
    if (isDeleting) return "rgba(248,113,113,0.15)";
    if (isSelected) return "rgba(99,102,241,0.4)";
    return "rgba(255,255,255,0.06)";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{
        opacity: 0,
        x: 20,
        filter: "blur(4px)",
        height: 0,
        marginBottom: 0,
        padding: 0,
      }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => !isDeleting && onSelect(todo)}
      whileHover={
        !isDeleting && !isSelected
          ? {
              background: "rgba(99,102,241,0.06)",
              borderColor: "rgba(99,102,241,0.2)",
            }
          : {}
      }
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 18px",
        marginBottom: "8px",
        background: getBg(),
        border: "1px solid",
        borderColor: getBorderColor(),
        borderRadius: "10px",
        overflow: "hidden",
        cursor: isDeleting ? "default" : "pointer",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Selected left accent bar */}
      {isSelected && !isDeleting && (
        <motion.div
          layoutId="selected-bar"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: 0,
            top: "20%",
            height: "60%",
            width: "3px",
            background: "linear-gradient(180deg, #6366f1, #8b5cf6)",
            borderRadius: "0 3px 3px 0",
            transformOrigin: "center",
          }}
        />
      )}

      {/* Strikethrough progress bar */}
      {isDeleting && (
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: "1.5px",
            background: "linear-gradient(90deg, #f87171, #ef4444)",
            transform: "translateY(-50%)",
            zIndex: 2,
            boxShadow: "0 0 6px rgba(248,113,113,0.6)",
          }}
        />
      )}

      {/* Index number */}
      <motion.span
        animate={{ opacity: isDeleting ? 0.3 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          fontSize: "11px",
          color: isSelected ? "#6366f1" : "#2e2e45",
          minWidth: "20px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          position: "relative",
          zIndex: 1,
          transition: "color 0.2s",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Todo text */}
      <motion.span
        animate={{
          opacity: isDeleting ? 0.35 : 1,
          color: isDeleting ? "#f87171" : isSelected ? "#e8e8f0" : "#c8c8d8",
        }}
        transition={{ duration: 0.25 }}
        style={{
          flex: 1,
          fontSize: "14px",
          letterSpacing: "0.01em",
          lineHeight: 1.5,
          position: "relative",
          zIndex: 1,
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {todo.title}
      </motion.span>

      {/* Delete button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo._id);
        }}
        disabled={isDeleting}
        whileHover={!isDeleting ? { scale: 1.15 } : {}}
        whileTap={!isDeleting ? { scale: 0.9 } : {}}
        animate={{
          color: isDeleting ? "#ef4444" : "#2e2e45",
          rotate: isDeleting ? [0, -10, 10, -5, 5, 0] : 0,
        }}
        transition={
          isDeleting
            ? { rotate: { duration: 0.4, ease: "easeInOut" } }
            : { duration: 0.2 }
        }
        style={{
          background: "transparent",
          border: "none",
          cursor: isDeleting ? "not-allowed" : "pointer",
          fontSize: "18px",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          position: "relative",
          zIndex: 3,
        }}
        onMouseEnter={(e) => {
          if (!isDeleting)
            (e.currentTarget as HTMLElement).style.color = "#f87171";
        }}
        onMouseLeave={(e) => {
          if (!isDeleting)
            (e.currentTarget as HTMLElement).style.color = "#2e2e45";
        }}
      >
        {isDeleting ? (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
            style={{ display: "block", fontSize: "14px" }}
          >
            ✕
          </motion.span>
        ) : (
          "×"
        )}
      </motion.button>
    </motion.div>
  );
};
