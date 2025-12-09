import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import "../styles/presentation.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const instrumentSans = Instrument_Sans({ 
  weight: ["400", "500", "600"],
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "Session 6: Applying the Magic Fertilizer - AI-Powered Workflow",
  description: "Supercharge your Web3 development process with AI-powered tools. Learn how to use AI for code generation, bug detection, and optimization in blockchain development. Workshop by Long \"Leo\" Pham from sqrDAO.",
  themeColor: "#0057ff",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Session 6: Applying the Magic Fertilizer - AI-Powered Workflow",
    description:
      "Supercharge your Web3 development process with AI-powered tools. Learn how to use AI for code generation, bug detection, and optimization in blockchain development. Workshop by Long \"Leo\" Pham from sqrDAO.",
    type: "website",
    url: "https://example.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Session 6: Applying the Magic Fertilizer - AI-Powered Workflow",
    description:
      "Supercharge your Web3 development process with AI-powered tools. Learn how to use AI for code generation, bug detection, and optimization in blockchain development. Workshop by Long \"Leo\" Pham from sqrDAO.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className} ${instrumentSans.variable}`}>
        <a href="#main-content" style={{ position: "absolute", left: -9999 }} className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
