import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Smart Collaborative Logistics Platform - Mira Bhayandar",
  description: "Building sustainable and smart logistics for Mira Bhayandar through collaborative delivery planning, optimized routes, and reduced emissions.",
  keywords: ["logistics", "smart city", "Mira Bhayandar", "route optimization", "sustainable transport"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
