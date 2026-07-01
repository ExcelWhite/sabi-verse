import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SabiVerse — Know Your Projects",
  description:
    "Africa's engineering and resource projects, explained in African voice. Search, learn, understand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
