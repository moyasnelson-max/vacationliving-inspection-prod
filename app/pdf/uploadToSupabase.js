// /app/pdf/uploadToSupabase.js
import { uploadToSupabase } from '@/app/pdf/uploadToSupabase';

/**
 * Uploads a PDF Blob to Supabase Storage in the "reports" bucket.
 * The folder structure becomes:
 *    reports/{propertyId}/{timestamp}.pdf
 */

export async function uploadToSupabase({ pdfBlob, propertyId }) {
  try {
    if (!pdfBlob) throw new Error("PDF blob is missing");
    if (!propertyId) throw new Error("propertyId is missing");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = `${propertyId}/inspection-${timestamp}.pdf`;

    const { data, error } = await supabase.storage
      .from('reports')
      .upload(filePath, pdfBlob, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/pdf',
      });

    if (error) throw error;

    // Generate public URL
    const { data: publicData } = supabase.storage
      .from('reports')
      .getPublicUrl(filePath);

    return {
      ok: true,
      path: filePath,
      url: publicData.publicUrl
    };

  } catch (err) {
    return {
      ok: false,
      error: err.message
    };
  }
}
