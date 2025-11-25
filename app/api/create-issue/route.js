import { createIssue } from "@/app/issues/createIssue";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await createIssue(body);
    return Response.json(result, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
