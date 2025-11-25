"use client";

import { useState } from "react";
import { createIssue } from "@/app/issues/createIssue";

export default function NewReportPage() {
  const [propertyName, setPropertyName] = useState("");
  const [inspector, setInspector] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const createReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!propertyName) {
      setError("Property name is required");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("reports").insert([
      {
        property_name: propertyName,
        inspector: inspector || "Unknown",
        notes,
      },
    ]);

    if (error) {
      setError("Error creating report");
      setLoading(false);
      return;
    }

    window.location.href = "/reports";
  };

  return (
    <div className="page-container">
      <h1 className="vl-title">New Inspection Report</h1>
      <p className="vl-subtitle">Create a new report for a property</p>

      <form onSubmit={createReport} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Property Name"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Inspector Name"
          value={inspector}
          onChange={(e) => setInspector(e.target.value)}
        />

        <textarea
          placeholder="Notes (optional)"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Report"}
        </button>
      </form>
    </div>
  );
}
