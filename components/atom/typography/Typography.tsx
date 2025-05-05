import React from "react";
import clsx from "clsx";
import TypographyProps, { TypographyVariant } from "./type";

const variantClass: Record<TypographyVariant, string> = {
  h1: "text-base font-medium font-poppins sm:text-lg md:text-xl",
  h2: "text-3xl font-semibold",
  body: "text-base",
  caption: "text-sm text-gray-500",
};

const Typography: React.FC<TypographyProps> = ({
  tag,
  variant = "body",
  text,
  className,
  children,
  style,
  role,
  ariaLabel,
  ariaLabelledBy,
}) => {
  const Element = tag || (variant.startsWith("h") ? variant : "p");

  return React.createElement(
    Element,
    {
      className: clsx(variantClass[variant], className),
      style,
      role,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
    },
    <>
      {text}
      {children}
    </>
  );
};

export default Typography;
