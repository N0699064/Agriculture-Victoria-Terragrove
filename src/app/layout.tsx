import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victoria Terragrove - Agricultural Investment Excellence",
  description: "Leading agricultural investment opportunities in Africa. Transform landscapes, grow wealth, and build sustainable futures with Victoria Terragrove.",
  keywords: "agricultural investment, Africa, Nigeria, sustainable farming, land investment, Victoria Terragrove",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}