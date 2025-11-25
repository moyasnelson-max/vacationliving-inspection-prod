"use client";

export default function GlassFloatingButton({ icon = "+", onClick }) {
  const styles = {
    wrapper: {
      position: "fixed",
      bottom: "26px",
      right: "22px",
      zIndex: 9999,
    },
    button: {
      height: "64px",
      width: "64px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.32)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      boxShadow:
        "0 8px 30px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)",
      border: "1px solid rgba(255,255,255,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      color: "#C8A36D",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={styles.button}
        onClick={onClick}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.92)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {icon}
      </div>
    </div>
  );
}
