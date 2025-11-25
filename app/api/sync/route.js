export async function POST(req) {
  try {
    const body = await req.json();

    return new Response(
      JSON.stringify({
        ok: true,
        received: body,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
