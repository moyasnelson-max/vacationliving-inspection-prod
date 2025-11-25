"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GlassActionMenu({ id, onClose }) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function deleteReport() {
    const res = await fetch(`/api/reports/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
      onClose();
    }
  }

  return (
    <div className="glass-action-menu">
      {!confirmDelete ? (
        <>
          <button
            className="glass-menu-item"
            onClick={() => router.push(`/reports/${id}/edit`)}
          >
            ✏️ Edit
          </button>

          <button
            className="glass-menu-item glass-delete"
            onClick={() => setConfirmDelete(true)}
          >
            🗑 Delete
          </button>

          <button className="glass-menu-item" onClick={onClose}>
            ✖ Close
          </button>
        </>
      ) : (
        <>
          <div className="glass-confirm-text">
            Confirm delete?
          </div>

          <button 
            className="glass-menu-item glass-delete-strong"
            onClick={deleteReport}
          >
            Yes, delete
          </button>

          <button 
            className="glass-menu-item"
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
