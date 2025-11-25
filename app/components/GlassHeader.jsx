import { useRouter } from "next/navigation";

export default function GlassHeader({ title }) {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "18px",
      }}
    >
      <button
        onClick={() => router.back()}
        style={{
          background: "none",
          border: "none",
          fontSize: "22px",
          marginRight: "12px",
          cursor: "pointer",
        }}
      >
        ←
      </button>

      <h1
        style={{
          fontSize: "24px",
          fontWeight: "600",
          margin: 0,
        }}
      >
        {title}
      </h1>
    </div>
  );
}
