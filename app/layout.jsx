import "./globals.css";

export const metadata = {
  title: "Vacation Living Inspection App",
  description: "Premium Inspection System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
