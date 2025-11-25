"use client";

import html2pdf from "html2pdf.js";

export default async function GeneratePDF() {
  const element = document.getElementById("report-container");

  const opts = {
    margin: 0.5,
    filename: `inspection_${Date.now()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  const pdfBlob = await html2pdf().set(opts).from(element).outputPdf("blob");

  return pdfBlob;
}
