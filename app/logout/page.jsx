"use client";

import { useEffect } from "react";
import { createIssue } from "@/app/issues/createIssue";

export default function LogoutPage() {
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      window.location.href = "/login";
    };

    logout();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#f6f0e8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        fontSize: "18px",
        color: "#444",
      }}
    >
      Signing out...
    </div>
  );
}
