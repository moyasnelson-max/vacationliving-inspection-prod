export async function submitFinalReport(reportData) {
  const res = await fetch("/api/send-report", {
    method: "POST",
    body: JSON.stringify(reportData),
  });

  return await res.json();
}
