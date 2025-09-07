import clsx from "clsx";
import React from "react";
import { AsChildProps, Slot } from "../utils/Slot";

type ButtonProps = AsChildProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
  style?: React.CSSProperties;
  className?: string;
};

const Button = ({ asChild, className, ...nativeProps }: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return <Comp className={clsx(className)} {...nativeProps} />;
};

export default Button;
