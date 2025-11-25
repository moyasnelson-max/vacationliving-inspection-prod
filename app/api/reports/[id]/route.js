import supabase from "../../../lib/supabase-client.js";

export async function GET(_, { params }) {
  const { id } = params;
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return Response.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error(`GET /reports/${id} error:`, err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { id } = params;
  try {
    const { error } = await supabase
      .from("reports")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(`DELETE /reports/${id} error:`, err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
