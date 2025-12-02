import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configuración de las fuentes Geist
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- METADATOS PERSONALIZADOS ---
export const metadata: Metadata = {
  title: "Wikipets 🐾 | Adopción y Cuidado",
  description: "La mejor comunidad para amantes de las mascotas. Adopta, aprende y comparte.",
  icons: {
    icon: "/logo.png", // Usará tu logo como favicon (asegúrate que esté en /public)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Cambiamos a español ("es") para buen SEO
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}