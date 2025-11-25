// /app/pdf/generatePdf.jsx
import { pdf } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';

export async function generatePdf({ propertyName, inspectorName, timestamp, sections }) {
  const doc = (
    <PdfDocument
      propertyName={propertyName}
      inspectorName={inspectorName}
      timestamp={timestamp}
      sections={sections}
    />
  );

  const blob = await pdf(doc).toBlob();
  return blob;
}
