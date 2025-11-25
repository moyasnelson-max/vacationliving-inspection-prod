"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createIssue } from "@/app/issues/createIssue";

export default function HouseInspectionPage() {
  const params = useParams();
  const houseId = params.houseId;

  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHouse = async () => {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .eq("id", houseId)
      .single();

    if (!error) setHouse(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchHouse();
  }, []);

  const goBack = () => (window.location.href = "/inspection");

  const goReports = () =>
    (window.location.href = `/reports?house=${houseId}`);

  const newInspection = () =>
    (window.location.href = `/reports/new?house=${houseId}`);

  return (
    <div className="page-container">
      <h1 className="vl-title">Property Inspection</h1>
      <p className="vl-subtitle">Details for this vacation home</p>

      <button onClick={goBack} style={{ marginBottom: "22px" }}>
        ← Back to Inspection Dashboard
      </button>

      {loading ? (
        <p>Loading property...</p>
      ) : !house ? (
        <p>Property not found.</p>
      ) : (
        <>
          <div className="card">
            <h2 style={{ marginBottom: "10px" }}>{house.name}</h2>

            <p style={{ color: "#555", marginBottom: "6px" }}>
              <strong>Address:</strong> {house.address || "N/A"}
            </p>

            <p style={{ color: "#555", marginBottom: "6px" }}>
              <strong>Owner:</strong> {house.owner || "N/A"}
            </p>

            <p style={{ color: "#777" }}>
              <strong>Description:</strong>{" "}
              {house.description || "No additional details."}
            </p>
          </div>

          <button onClick={goReports} style={{ marginBottom: "14px" }}>
            View Reports for this Property
          </button>

          <button onClick={newInspection}>
            + Start New Inspection
          </button>
        </>
      )}
    </div>
  );
}
