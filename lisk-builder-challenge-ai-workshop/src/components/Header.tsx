"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { generatePresentationPDF } from "@/utils/pdfGenerator";

export default function Header() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      // Generate array of slide IDs (slide-1 through slide-11)
      const slideIds = Array.from({ length: 11 }, (_, i) => `slide-${i + 1}`);
      await generatePresentationPDF(slideIds, "presentation.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "#ffffff", /* absolute white */
      borderBottom: "1px solid var(--neutral-200)",
      backdropFilter: "saturate(180%) blur(8px)",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <Link href="/" aria-label="Home" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <Image src="/lisk.png" alt="Lisk" width={120} height={28} />
        </Link>
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            background: isGenerating ? "var(--neutral-200)" : "var(--brand-primary)",
            color: "#ffffff",
            border: "none",
            borderRadius: "var(--radius-md)",
            cursor: isGenerating ? "not-allowed" : "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
            transition: "all 0.2s ease",
            opacity: isGenerating ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isGenerating) {
              e.currentTarget.style.background = "var(--brand-primary-700)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isGenerating) {
              e.currentTarget.style.background = "var(--brand-primary)";
            }
          }}
          aria-label="Download presentation as PDF"
        >
          <FontAwesomeIcon icon={faDownload} />
          {isGenerating ? "Generating..." : "Download PDF"}
        </button>
      </div>
    </header>
  );
}


