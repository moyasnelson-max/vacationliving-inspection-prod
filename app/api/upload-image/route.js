import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const form = await req.formData();

  const file = form.get("file");
  const reportId = form.get("reportId");
  const itemId = form.get("itemId");

  if (!file) return NextResponse.json({ error: "Missing file" }, { status: 400 });

  const filename = `${Date.now()}-${file.name}`;
  const path = `${reportId}/${itemId}/${filename}`;

  const { error: uploadError } = await supabase.storage
    .from("reports")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 400 });
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/reports/${path}`;

  const { error: dbError } = await supabase.from("report_files").insert({
    report_id: reportId,
    item_id: itemId,
    file_url: url,
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 400 });
  }

  return NextResponse.json({ url });
}
