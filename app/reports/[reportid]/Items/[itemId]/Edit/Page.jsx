"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createIssue } from "@/app/issues/createIssue";

export default function EditItemPage() {
  const params = useParams();
  const reportId = params.reportid;
  const itemId = params.itemId;

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("ok");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing item
  const fetchItem = async () => {
    const { data, error } = await supabase
      .from("report_items")
      .select("*")
      .eq("id", itemId)
      .single();

    if (!error && data) {
      setTitle(data.title);
      setStatus(data.status);
      setNotes(data.notes || "");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const saveItem = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!title) {
      setError("Title is required");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("report_items")
      .update({
        title,
        status,
        notes,
      })
      .eq("id", itemId);

    if (error) {
      setError("Error saving item");
      setSaving(false);
      return;
    }

    window.location.href = `/reports/${reportId}`;
  };

  return (
    <div className="page-container">
      <h1 className="vl-title">Edit Item</h1>
      <p className="vl-subtitle">Modify details for this inspection item</p>

      {loading ? (
        <p>Loading item...</p>
      ) : (
        <form onSubmit={saveItem} style={{ marginTop: "20px" }}>
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

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
}
