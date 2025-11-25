import supabase from "../../../../lib/supabase-client.js";

export async function GET(_, { params }) {
  const { id } = params;

  try {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("report_id", id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error(`GET /reports/${id}/items error:`, err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("items")
      .insert([{ ...body, report_id: id }])
      .select()
      .single();

    if (error) throw error;

    return Response.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error(`POST /reports/${id}/items error:`, err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
