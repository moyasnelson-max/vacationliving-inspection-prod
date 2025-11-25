import generatePDF from "@/app/pdf/generatePdf.jsx";

export async function POST(req) {
  try {
    const body = await req.json();
    const pdfBytes = await generatePDF(body);

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=inspection.pdf"
      }
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
