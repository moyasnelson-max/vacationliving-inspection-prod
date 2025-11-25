// /app/pdf/PreviewPdf.jsx
'use client';

import { useEffect, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';

export default function PreviewPdf({ data }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function render() {
      const blob = await pdf(<PdfDocument {...data} />).toBlob();
      setUrl(URL.createObjectURL(blob));
    }
    render();
  }, [data]);

  return (
    <iframe
      src={url}
      style={{
        width: '100%',
        height: '90vh',
        border: '1px solid #ccc',
        borderRadius: 8
      }}
    />
  );
}
