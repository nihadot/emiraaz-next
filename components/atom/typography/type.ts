import { JSX } from "react";

export type TypographyVariant = "h1" | "h2" | "body" | "caption";

interface TypographyProps {
  tag?: keyof JSX.IntrinsicElements;
  variant?: TypographyVariant;
  text?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  role?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

export default TypographyProps;
