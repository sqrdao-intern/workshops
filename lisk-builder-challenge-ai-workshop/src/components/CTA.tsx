import Button from "./Button";

type Props = {
  title: string;
  subtitle?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export default function CTA({ title, subtitle, primary, secondary }: Props) {
  return (
    <div className="card" style={{ padding: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
      <div>
        <h3 style={{ marginBottom: "0.25rem" }}>{title}</h3>
        {subtitle && <p style={{ margin: 0, color: "var(--neutral-600)" }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <a href={primary.href}><Button>{primary.label}</Button></a>
        {secondary && (
          <a href={secondary.href}><Button variant="outline">{secondary.label}</Button></a>
        )}
      </div>
    </div>
  );
}


