import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const base = "btn";

const variantClass: Record<ButtonVariant, string> = {
  solid: "btn--primary",
  outline: "btn--outline",
  ghost: "btn--ghost",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "btn--sm",
  md: "btn--md",
  lg: "btn--lg",
};

export default function Button({ variant = "solid", size = "md", className, ...props }: Props) {
  const classes = [base, variantClass[variant], sizeClass[size], className].filter(Boolean).join(" ");
  return <button {...props} className={classes} />;
}


