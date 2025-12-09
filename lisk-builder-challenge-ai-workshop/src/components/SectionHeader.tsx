type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeader({ eyebrow, title, subtitle, align = "left" }: Props) {
  return (
    <div style={{ textAlign: align }}>
      {eyebrow && (
        <div style={{
          display: "inline-block",
          padding: "0.25rem 0.6rem",
          borderRadius: "999px",
          background: "rgba(0,87,255,0.06)",
          color: "var(--brand-primary)",
          fontWeight: 600,
          marginBottom: "0.75rem",
        }}>{eyebrow}</div>
      )}
      <h2 style={{ marginBottom: "0.5rem" }}>{title}</h2>
      {subtitle && <p style={{ color: "var(--neutral-600)", maxWidth: 720, marginInline: align === "center" ? "auto" : undefined }}>{subtitle}</p>}
    </div>
  );
}


