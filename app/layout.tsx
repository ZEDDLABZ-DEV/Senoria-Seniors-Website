import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senoria Seniors — Building Smarter Care for the People Who Matter Most",
  description:
    "Senoria Seniors is building a platform to help families, caregivers, and care organizations stay connected through real-time care updates, intelligent alerts, and AI-powered insights. Currently in development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-800 antialiased">{children}</body>
    </html>
  );
}
