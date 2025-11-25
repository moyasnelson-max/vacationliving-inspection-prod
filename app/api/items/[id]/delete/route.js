import supabase from "@/app/lib/supabase-client";

export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(`DELETE /items/${id}/delete error:`, err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
