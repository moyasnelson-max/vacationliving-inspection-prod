"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createIssue } from "@/app/issues/createIssue";

export default function ReportDetailsPage() {
  const params = useParams();
  const reportId = params.reportid;

  const [report, setReport] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch report + items
  const fetchData = async () => {
    const { data: rep, error: repError } = await supabase
      .from("reports")
      .select("*")
      .eq("id", reportId)
      .single();

    const { data: itemList, error: itemError } = await supabase
      .from("report_items")
      .select("*")
      .eq("report_id", reportId)
      .order("created_at", { ascending: false });

    if (!repError) setReport(rep);
    if (!itemError) setItems(itemList || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goBack = () => (window.location.href = "/reports");
  const addItem = () => (window.location.href = `/reports/${reportId}/items/add`);
  const openItem = (id) =>
    (window.location.href = `/reports/${reportId}/items/${id}/edit`);

  return (
    <div className="page-container">
      <h1 className="vl-title">Report Details</h1>
      <p className="vl-subtitle">Full inspection overview</p>

      <button onClick={goBack} style={{ marginBottom: "22px" }}>
        ← Back to Reports
      </button>

      {loading ? (
        <p>Loading report...</p>
      ) : !report ? (
        <p>Report not found.</p>
      ) : (
        <>
          {/* Report card */}
          <div className="card">
            <h2 style={{ marginBottom: "8px" }}>{report.property_name}</h2>
            <p style={{ marginBottom: "4px" }}>
              <strong>Inspector:</strong> {report.inspector || "Unknown"}
            </p>
            <p style={{ marginBottom: "12px" }}>
              <strong>Date:</strong>{" "}
              {report.created_at
                ? new Date(report.created_at).toLocaleString()
                : "No date"}
            </p>

            {report.notes && (
              <p style={{ color: "#555", marginTop: "10px" }}>
                <strong>Notes:</strong> {report.notes}
              </p>
            )}
          </div>

          {/* Add Item Button */}
          <button onClick={addItem} style={{ marginBottom: "25px" }}>
            + Add Item
          </button>

          <h3 style={{ marginBottom: "12px" }}>Items</h3>

          {/* Items list */}
          {items.length === 0 ? (
            <p>No items added yet.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => openItem(item.id)}
              >
                <h4 style={{ marginBottom: "4px" }}>{item.title}</h4>
                <p style={{ color: "#666" }}>
                  Status:{" "}
                  <strong
                    style={{
                      color:
                        item.status === "ok"
                          ? "#3a7f2b"
                          : item.status === "issue"
                          ? "#b02c2c"
                          : "#555",
                    }}
                  >
                    {item.status.toUpperCase()}
                  </strong>
                </p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
