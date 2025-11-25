import sendEmail from "@/app/pdf/sendEmail";

export async function POST(req) {
  try {
    const data = await req.json();
    const result = await sendEmail(data);
    return Response.json(result, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
