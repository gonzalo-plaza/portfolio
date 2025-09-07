import clsx from "clsx";
import React from "react";
import { AsChildProps, Slot } from "../utils/Slot";

import styles from "@/styles/components/atoms/button.module.scss";

type ButtonProps = AsChildProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
};

const Button = ({
  asChild,
  className,
  disabled,
  ...nativeProps
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={clsx(
        styles.button,
        { [styles.isDisabled]: disabled },
        className
      )}
      {...nativeProps}
    />
  );
};

export default Button;
