import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();
  const { reportId, categoryId, subcategoryId, notes, status } = body;

  const { data, error } = await supabase.rpc("add_report_item", {
    report_id: reportId,
    category_id: categoryId,
    subcategory_id: subcategoryId,
    notes,
    status,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ item_id: data });
}
