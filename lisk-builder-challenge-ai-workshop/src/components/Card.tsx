import { ReactNode } from "react";

type Props = {
  title?: string;
  children?: ReactNode;
  href?: string;
};

export default function Card({ title, children, href }: Props) {
  const content = (
    <div className="card" style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", transition: "transform var(--duration-fast) var(--ease-standard)", cursor: href ? "pointer" : undefined }}>
      {title && <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>}
      {children}
    </div>
  );
  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }
  return content;
}


