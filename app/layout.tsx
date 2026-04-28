import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { DatabaseProvider } from "../context/DatabaseContext";
import { Navbar } from "../components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conadecafro - Portal WebGIS",
  description: "Plataforma orientada al desarrollo, visibilización y centralización de recursos de las comunidades afrodescendientes en Venezuela.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-gray-50 flex flex-col font-sans text-brand-black">
        <DatabaseProvider>
          <Navbar />
          <div className="flex-grow flex flex-col">
            {children}
          </div>
        </DatabaseProvider>
      </body>
    </html>
  );
}
