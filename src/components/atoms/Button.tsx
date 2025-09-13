import clsx from "clsx";
import React from "react";
import { AsChildProps, Slot } from "../utils/Slot";

import styles from "@/styles/components/atoms/button.module.scss";

type ButtonProps = AsChildProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
  style?: React.CSSProperties;
  className?: string;
  buttonDisabledWrapperClassName?: string;
  disabled?: boolean;
};

const Button = ({
  asChild,
  className,
  buttonDisabledWrapperClassName,
  disabled,
  ...nativeProps
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <>
      {disabled ? (
        <span
          className={clsx(
            styles.disabled,
            buttonDisabledWrapperClassName ?? null
          )}
        >
          <Comp
            className={clsx(
              styles.button,
              { [styles.isDisabled]: disabled },
              className
            )}
            {...nativeProps}
          />
        </span>
      ) : (
        <Comp
          className={clsx(
            styles.button,
            { [styles.isDisabled]: disabled },
            className
          )}
          {...nativeProps}
        />
      )}
    </>
  );
};

export default Button;
