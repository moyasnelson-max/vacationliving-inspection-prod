"use client";

import { useEffect, useState } from "react";
import { createIssue } from "@/app/issues/createIssue";

export default function InspectionMain() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session || null);
    };

    load();
  }, []);

  const goReports = () => {
    window.location.href = "/reports";
  };

  return (
    <div className="page-container">
      <h1 className="vl-title">Inspection Center</h1>
      <p className="vl-subtitle">
        Manage inspections, review reports, and enter new findings.
      </p>

      <div className="card">
        <h2 style={{ marginBottom: "10px" }}>Your Session</h2>

        {session ? (
          <>
            <p><strong>Email:</strong> {session.user.email}</p>
            <p style={{ marginTop: "4px" }}>
              <strong>Status:</strong> Logged in ✔
            </p>
          </>
        ) : (
          <p>No active session</p>
        )}
      </div>

      <button onClick={goReports}>Go to Reports</button>
    </div>
  );
}
