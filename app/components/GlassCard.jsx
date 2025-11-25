"use client";
import { useState } from "react";
import Link from "next/link";
import GlassActionMenu from "./GlassActionMenu";

export default function GlassCard({ report }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="glass-card">
      {/* Header: Title + Menu */}
      <div className="glass-card-header">
        <h3 className="glass-card-title">{report.title}</h3>

        {/* Marriott Menu Dots */}
        <button 
          className="glass-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ⋯
        </button>

        {menuOpen && (
          <GlassActionMenu 
            id={report.id}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </div>

      {/* Body */}
      <p className="glass-card-details">{report.details}</p>

      {/* Footer */}
      <div className="glass-card-footer">
        <Link href={`/reports/${report.id}`} className="glass-button">
          View
        </Link>
      </div>
    </div>
  );
}
