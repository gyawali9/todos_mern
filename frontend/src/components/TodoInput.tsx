import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onAdd: (text: string) => void;
  loading: boolean;
}

export const TodoInput = ({ onAdd, loading }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="What needs to be done?"
        style={{
          flex: 1,
          padding: "14px 18px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px",
          color: "#e8e8f0",
          fontSize: "14px",
          outline: "none",
          fontFamily: "inherit",
          letterSpacing: "0.01em",
          boxSizing: "border-box",
          transition: "border-color 0.2s, background 0.2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(99,102,241,0.5)";
          e.target.style.background = "rgba(99,102,241,0.06)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255,255,255,0.08)";
          e.target.style.background = "rgba(255,255,255,0.04)";
        }}
      />
      <motion.button
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: "14px 20px",
          background: text.trim()
            ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
            : "rgba(255,255,255,0.04)",
          border: "1px solid",
          borderColor: text.trim() ? "transparent" : "rgba(255,255,255,0.08)",
          borderRadius: "10px",
          color: text.trim() ? "#fff" : "#333",
          fontSize: "18px",
          cursor: text.trim() ? "pointer" : "not-allowed",
          fontFamily: "inherit",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "52px",
        }}
      >
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            style={{ display: "block" }}
          >
            ◌
          </motion.span>
        ) : (
          "+"
        )}
      </motion.button>
    </div>
  );
};
