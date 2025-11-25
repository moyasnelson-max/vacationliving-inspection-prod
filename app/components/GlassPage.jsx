"use client";

export default function GlassPage({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: "linear-gradient(180deg,#F7F3EC,#EAE3D8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
