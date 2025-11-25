export default function GlassInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.65)",
        border: "1px solid rgba(200,163,109,0.35)",
        marginBottom: "16px",
        fontSize: "16px",
        outline: "none",
      }}
    />
  );
}
