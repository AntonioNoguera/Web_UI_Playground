import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/enterAnimation">Acerca de</Link></li> 
            <li><Link href="/gestures">Gestos</Link></li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}