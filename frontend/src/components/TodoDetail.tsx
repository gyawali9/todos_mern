import { motion, AnimatePresence } from "framer-motion";
import type { Todo } from "../types/todo";

interface Props {
  todo: Todo | null;
  onClose: () => void;
}

export const TodoDetail = ({ todo, onClose }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        minHeight: "320px",
      }}
    >
      {/* Glow accent top-right */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "160px",
          height: "160px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />

      {/* Content switches smoothly when selected todo changes */}
      <AnimatePresence mode="wait">
        {todo && (
          <motion.div
            key={todo._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  color: "#6366f1",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                ◆ task detail
              </span>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                  color: "#555570",
                  cursor: "pointer",
                  fontSize: "16px",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                ×
              </motion.button>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)",
                marginBottom: "24px",
                transformOrigin: "left",
              }}
            />

            {/* Title */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "#333350",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Title
              </p>
              <p
                style={{
                  fontSize: "18px",
                  color: "#e8e8f0",
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                {todo.title}
              </p>
            </div>

            {/* Task ID */}
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "#333350",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Task ID
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#2e2e50",
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                  wordBreak: "break-all",
                  lineHeight: 1.6,
                }}
              >
                {todo._id}
              </p>
            </div>

            {/* Created */}
            {todo.createdAt && (
              <div style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#333350",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Created
                </p>
                <p style={{ fontSize: "13px", color: "#555570" }}>
                  {new Date(todo.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}

            {/* Status badge */}
            <div style={{ marginTop: "32px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "100px",
                  fontSize: "11px",
                  color: "#6366f1",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#6366f1",
                    display: "inline-block",
                  }}
                />
                pending
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
