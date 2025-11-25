import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const inspector_email = body.inspector_email;
    const property_id = body.property_id;
    const data = body.data;

    if (!inspector_email || !property_id || !data) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Llama a la Edge Function
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-report`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({
          inspector_email,
          property_id,
          data,
        }),
      }
    );

    const result = await resp.json();

    if (!resp.ok) {
      return NextResponse.json(
        { error: result.error || "Failed in send-report function" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
