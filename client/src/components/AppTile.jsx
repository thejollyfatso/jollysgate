import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AppTile({ label, emoji, path }) {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);

  return (
    <button
      style={{ ...styles.tile, ...(pressed ? styles.tilePressed : {}) }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => {
        setPressed(false);
        navigate(path);
      }}
      onPointerLeave={() => setPressed(false)}
    >
      <span style={styles.emoji}>{emoji}</span>
      <span style={styles.label}>{label}</span>
    </button>
  );
}

const styles = {
  tile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "20px 12px",
    background: "#fff",
    border: "1px solid #E5E0D8",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "transform 0.1s, opacity 0.1s",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
  },
  tilePressed: {
    transform: "scale(0.96)",
    opacity: 0.85,
  },
  emoji: {
    fontSize: "36px",
    lineHeight: 1,
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#3D3530",
    textAlign: "center",
    lineHeight: 1.3,
  },
};
