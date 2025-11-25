// /app/pdf/PdfDocument.jsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  title: {
    fontSize: 22,
    marginBottom: 6,
    color: '#C8A36D'
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#7A7A7A'
  },
  section: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    border: '1px solid #DDD'
  },
  heading: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333'
  },
  text: {
    fontSize: 12,
    color: '#444',
    lineHeight: 1.4
  }
});

export default function PdfDocument({ propertyName, inspectorName, timestamp, sections }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <Text style={styles.title}>Inspection Report — {propertyName}</Text>
        <Text style={styles.subtitle}>{timestamp}</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Inspector</Text>
          <Text style={styles.text}>{inspectorName}</Text>
        </View>

        {sections?.map((sec, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.heading}>{sec.heading}</Text>
            <Text style={styles.text}>{sec.body}</Text>
          </View>
        ))}

      </Page>
    </Document>
  );
}
