import { NextResponse } from "next/server";

export async function POST(req) {
  return NextResponse.json({
    ok: true,
    message: "PDF generation and email sending will be implemented next.",
  });
}
