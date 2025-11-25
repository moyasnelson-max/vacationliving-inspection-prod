"use client";

import { useEffect, useState } from "react";
import { createIssue } from "@/app/issues/createIssue";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setReports(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const goToNewReport = () => {
    window.location.href = "/reports/new";
  };

  const openReport = (id) => {
    window.location.href = `/reports/${id}`;
  };

  return (
    <div className="page-container">
      <h1 className="vl-title">Inspection Reports</h1>
      <p className="vl-subtitle">Review, update, or create new inspections</p>

      {/* NEW REPORT BUTTON */}
      <button onClick={goToNewReport} style={{ marginBottom: "22px" }}>
        + New Report
      </button>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div>
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="card"
              onClick={() => openReport(rep.id)}
              style={{
                cursor: "pointer",
                transition: "0.25s",
              }}
            >
              <h3 style={{ marginBottom: "6px" }}>{rep.property_name}</h3>
              <p style={{ marginBottom: "6px", color: "#555" }}>
                {rep.created_at
                  ? new Date(rep.created_at).toLocaleString()
                  : "No date"}
              </p>
              <p style={{ fontSize: "14px", color: "#777" }}>
                Tap to view report →
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
