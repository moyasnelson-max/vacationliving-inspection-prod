export default function GlassButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "14px",
        background: "linear-gradient(135deg,#C8A36D,#AD8A56)",
        border: "none",
        borderRadius: "14px",
        color: "white",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(200,163,109,0.35)",
      }}
    >
      {children}
    </button>
  );
}
