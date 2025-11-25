"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

export default function CreateItemModal({ open, onClose, reportId }) {
  if (!open) return null;

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [notes, setNotes] = useState("");
  const [severity, setSeverity] = useState("normal");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------------
  // LOAD CATEGORIES
  // ----------------------------------------------------------
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      setCategories(data || []);
    }
    load();
  }, []);

  // LOAD SUBCATEGORIES BASED ON CATEGORY
  const loadSubcats = async (id) => {
    const { data } = await supabase
      .from("subcategories")
      .select("*")
      .eq("category_id", id)
      .order("name");

    setSubcategories(data || []);
  };

  // ----------------------------------------------------------
  // UPLOAD IMAGE
  // ----------------------------------------------------------
  const uploadImage = async (file, itemId) => {
    if (!file) return null;

    const filename = `item_${itemId}_${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("reports")
      .upload(filename, file);

    if (uploadError) return null;

    const { data: urlData } = supabase.storage
      .from("reports")
      .getPublicUrl(filename);

    return urlData.publicUrl;
  };

  // ----------------------------------------------------------
  // SUBMIT
  // ----------------------------------------------------------
  const handleCreate = async () => {
    try {
      setLoading(true);

      const { data: item, error } = await supabase
        .from("report_items")
        .insert([
          {
            report_id: reportId,
            category_id: categoryId,
            subcategory_id: subcategoryId,
            notes,
            severity,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const imageUrl = await uploadImage(image, item.id);

      if (imageUrl) {
        await supabase
          .from("report_items")
          .update({ image_url: imageUrl })
          .eq("id", item.id);
      }

      onClose();
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  // ----------------------------------------------------------
  // UI GLASS PREMIUM
  // ----------------------------------------------------------

  return (
    <>
      {/* BACKDROP */}
      <div style={backdrop} onClick={onClose}></div>

      {/* SHEET */}
      <div style={sheet}>
        <h2 style={title}>Add Item</h2>

        {/* CATEGORY */}
        <label style={label}>Category</label>
        <select
          style={input}
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            loadSubcats(e.target.value);
          }}
        >
          <option value="">Select...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* SUBCATEGORY */}
        <label style={label}>Subcategory</label>
        <select
          style={input}
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
        >
          <option value="">Select...</option>
          {subcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* SEVERITY */}
        <label style={label}>Severity</label>
        <select
          style={input}
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="attention">Attention</option>
          <option value="critical">Critical</option>
        </select>

        {/* NOTES */}
        <label style={label}>Notes</label>
        <textarea
          style={textarea}
          rows={4}
          placeholder="Describe the issue..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* IMAGE */}
        <label style={label}>Image</label>
        <input
          type="file"
          accept="image/*"
          style={input}
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* SAVE */}
        <button
          style={goldBtn}
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Item"}
        </button>
      </div>
    </>
  );
}

// ----------------------------------------------------------
// GLASS UI STYLES
// ----------------------------------------------------------

const backdrop = {
  position: "fixed",
  inset: 0,
  backdropFilter: "blur(12px)",
  background: "rgba(0,0,0,0.35)",
  zIndex: 20,
};

const sheet = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "24px",
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(16px)",
  borderTopLeftRadius: "28px",
  borderTopRightRadius: "28px",
  boxShadow: "0 -8px 20px rgba(0,0,0,0.15)",
  animation: "slideUp 0.35s ease",
  zIndex: 30,
};

const title = {
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 20,
};

const label = {
  fontSize: 14,
  fontWeight: 500,
  marginTop: 14,
  marginBottom: 6,
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #DDD",
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(6px)",
};

const textarea = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #DDD",
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(6px)",
  resize: "none",
};

const goldBtn = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: 14,
  background: "linear-gradient(135deg,#C8A36D,#b69158)",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  fontSize: 16,
  marginTop: 22,
  cursor: "pointer",
};
