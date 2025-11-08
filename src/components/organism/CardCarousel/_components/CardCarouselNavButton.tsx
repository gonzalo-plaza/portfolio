import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

import styles from "@/styles/components/organism/card-carousel/_components/card-carousel-nav-button.module.scss";
import clsx from "clsx";
import React, { forwardRef } from "react";

interface CardCarouselNavButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position: "right" | "left";
  showArrow: boolean;
}

const CardCarouselNavButton = forwardRef<
  HTMLButtonElement,
  CardCarouselNavButtonProps
>(({ position, className, showArrow = false, ...nativeProps }, ref) => {
  const isRight = position === "right";
  const isLeft = position === "left";
  return (
    <button
      {...nativeProps}
      ref={ref}
      className={clsx(className, styles.cardCarouselNavButton, {
        [styles.isRight]: isRight,
        [styles.isLeft]: isLeft,
        [styles.showArrow]: showArrow,
      })}
      tabIndex={-1}
      aria-hidden
    >
      {isLeft && <ArrowBigLeft />}
      {isRight && <ArrowBigRight />}
    </button>
  );
});

CardCarouselNavButton.displayName = "CardCarouselnavButton";

export default CardCarouselNavButton;
