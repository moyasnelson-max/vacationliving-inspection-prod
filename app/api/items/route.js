import supabase from "@/app/lib/supabase-client";

export async function POST(req) {
  try {
    const body = await req.json();

    const { data, error } = await supabase.from("items").insert(body);

    if (error) {
      console.error("Error inserting item:", error);
      return Response.json({ error: "Error saving item" }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
