import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tight?: boolean;
  className?: string;
};

export default function Section({ children, tight, className }: Props) {
  const classes = ["section", tight ? "section--tight" : undefined, className].filter(Boolean).join(" ");
  return (
    <section className={classes}>
      <div className="container">{children}</div>
    </section>
  );
}


