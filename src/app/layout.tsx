import Link from "next/link";

import "../styles/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="relative min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
}