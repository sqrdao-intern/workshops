import Image from "next/image";

type Props = {
  logos: { src: string; alt: string; width?: number; height?: number }[];
};

export default function LogoRow({ logos }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", alignItems: "center" }}>
      {logos.map((logo) => (
        <div key={logo.alt} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.75rem", border: "1px solid var(--neutral-200)", borderRadius: "12px", background: "var(--neutral-0)" }}>
          <Image src={logo.src} alt={logo.alt} width={logo.width ?? 96} height={logo.height ?? 24} style={{ objectFit: "contain", filter: "grayscale(1)" }} />
        </div>
      ))}
      <style jsx>{`
        @media (min-width: 768px) {
          div { grid-template-columns: repeat(4, 1fr); }
        }
        @media (min-width: 1024px) {
          div { grid-template-columns: repeat(6, 1fr); }
        }
      `}</style>
    </div>
  );
}


