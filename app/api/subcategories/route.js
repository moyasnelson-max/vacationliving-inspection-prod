import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category_id = searchParams.get("category_id");

  if (!category_id) {
    return NextResponse.json({ error: "Missing category_id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .eq("category_id", category_id)
    .order("name", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}
