import uploadToSupabase from "@/app/pdf/uploadToSupabase";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const response = await uploadToSupabase(formData);

    return Response.json(response, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
