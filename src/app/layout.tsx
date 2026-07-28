import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Activity",
  description: "Panel en vivo de actividad de agentes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
