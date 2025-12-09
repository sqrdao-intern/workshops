"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#f8f8f8", borderTop: "1px solid var(--neutral-200)", marginTop: "var(--space-20, 5rem)" }}> {/* dusty white */}
      <div style={{ borderTop: "1px solid var(--neutral-200)", background: "#f8f8f8" }}> {/* dusty white */}
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.75rem", paddingBottom: "0.75rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <Image src="/lisk.png" alt="Lisk" width={168} height={39} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", lineHeight: 1.3 }}>
            <small style={{ color: "var(--neutral-600)" }}>
              © {new Date().getFullYear()} sqrDAO. All rights reserved.
            </small>
            <small style={{ color: "var(--neutral-800)", fontWeight: 600, marginTop: "0.15rem" }}>
              Not affiliated with Lisk. For event info only.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}


