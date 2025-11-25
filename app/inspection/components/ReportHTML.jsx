"use client";

export default function ReportHTML({ report }) {
  const {
    propertyName,
    inspectorEmail,
    reportDate,
    categories,
    issues,
    photos,
  } = report;

  return (
    <div
      id="report-container"
      style={{
        fontFamily: "Inter, sans-serif",
        padding: "32px",
        background: "#f8f6f1",
        color: "#1d1d1f",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "8px", color: "#C8A36D" }}>
        Inspection Report — {propertyName}
      </h1>

      <p style={{ fontSize: "14px", color: "#666" }}>
        <strong>Date:</strong> {reportDate}
        <br />
        <strong>Inspector:</strong> {inspectorEmail}
      </p>

      <hr style={{ margin: "20px 0", border: 0, borderTop: "1px solid #ccc" }} />

      <h2 style={{ color: "#C8A36D" }}>Inspection Details</h2>
      {categories?.map((cat, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#9C7C4D" }}>{cat.name}</h3>
          <p>{cat.notes}</p>
        </div>
      ))}

      <hr style={{ margin: "20px 0", border: 0, borderTop: "1px solid #ccc" }} />

      <h2 style={{ fontSize: "22px", color: "#C8A36D" }}>Issues Found</h2>
      {issues?.length === 0 ? (
        <p>No issues reported.</p>
      ) : (
        issues.map((issue, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <strong>{issue.category}</strong>: {issue.description}
          </div>
        ))
      )}

      <hr style={{ margin: "20px 0", border: 0, borderTop: "1px solid #ccc" }} />

      <h2 style={{ fontSize: "22px", color: "#C8A36D" }}>Photos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {photos?.map((url, i) => (
          <img
            key={i}
            src={url}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
}
