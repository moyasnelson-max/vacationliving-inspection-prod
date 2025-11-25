import supabase from "@/app/lib/supabase-client";

export async function POST(req) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("items")
      .insert(body)
      .select("*")
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
