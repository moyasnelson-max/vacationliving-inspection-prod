"use client";

import { useEffect } from "react";
import { createIssue } from "@/app/issues/createIssue";

export default function HomePage() {
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        window.location.href = "/reports";
      } else {
        window.location.href = "/login";
      }
    };

    checkSession();
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      background: "#f6f0e8",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Inter, sans-serif",
      fontSize: "18px",
      color: "#444",
    }}>
      Loading...
    </div>
  );
}
