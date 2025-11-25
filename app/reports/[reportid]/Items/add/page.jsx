"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { createIssue } from "@/app/issues/createIssue";

export default function AddItemPage() {
  const params = useParams();
  const reportId = params.reportid;

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("ok");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title) {
      setError("Title is required");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("report_items").insert([
      {
        report_id: reportId,
        title,
        status,
        notes,
      },
    ]);

    if (error) {
      setError("Error adding item");
      setLoading(false);
      return;
    }

    window.location.href = `/reports/${reportId}`;
  };

  return (
    <div className="page-container">
      <h1 className="vl-title">Add Item</h1>
      <p className="vl-subtitle">Attach a new inspection item to this report</p>

      <form onSubmit={addItem} style={{ marginTop: "20px" }}>
        {/* Title */}
        <input
          type="text"
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginBottom: "16px" }}
        >
          <option value="ok">OK</option>
          <option value="issue">Issue</option>
        </select>

        {/* Notes */}
        <textarea
          rows={4}
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Item"}
        </button>
      </form>
    </div>
  );
}
