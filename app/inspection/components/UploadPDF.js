import { createClient } from "@supabase/supabase-js";

export async function uploadPDF(pdfBlob, propertyId) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const fileName = `report_${propertyId}_${Date.now()}.pdf`;

  const { data, error } = await supabase.storage
    .from("reports")
    .upload(`${propertyId}/${fileName}`, pdfBlob, {
      contentType: "application/pdf",
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("reports")
    .getPublicUrl(`${propertyId}/${fileName}`);

  return urlData.publicUrl;
}
