import type { Metadata } from "next";
import "./globals.css";
import ClientRootWrapper from "@/components/layout/ClientRootWrapper";

export const metadata: Metadata = {
  title: "Smart Collaborative Logistics Platform",
  description:
    "Shared logistics platform enabling grouped deliveries, route optimization, and multi-stakeholder coordination across Mumbai.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientRootWrapper>{children}</ClientRootWrapper>
      </body>
    </html>
  );
}
