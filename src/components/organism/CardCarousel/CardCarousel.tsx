"use client";

import styles from "@/styles/components/organism/card-carousel/card-carousel.module.scss";
import React, { isValidElement, ReactElement, ReactNode } from "react";
import CardCarouselNavButton from "./_components/CardCarouselNavButton";
import { useCardCarousel } from "@/hooks/components/organism/CardCarousel";

interface CardCarouselProps {
  children: ReactNode;
}

const CardCarousel = ({ children }: CardCarouselProps) => {
  const {
    containerRef,
    firstElementRef,
    lastElementRef,
    carouselNavButtonLeftActive,
    carouselNavButtonRightActive,
    childrenArray,
    handleContainerLeftScroll,
    handleContainerRightScroll,
  } = useCardCarousel(children);
  return (
    <div className={styles.cardCarouselWrapper}>
      <CardCarouselNavButton
        position="left"
        onClick={handleContainerLeftScroll}
        showArrow={carouselNavButtonLeftActive}
      />

      <div className={styles.cardCarousel} ref={containerRef} role="list">
        {childrenArray.map((child, index) => {
          const isFirst = index === 0;
          const isLast = index === childrenArray.length - 1;

          if (!isValidElement(child)) return;

          if (isFirst) {
            // TODO: Fix correct type to refs
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return React.cloneElement(child as ReactElement<any>, {
              key: index,
              ref: firstElementRef,
              role: "listitem",
            });
          }

          if (isLast) {
            // TODO: Fix correct type to refs
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return React.cloneElement(child as ReactElement<any>, {
              key: index,
              ref: lastElementRef,
              role: "listitem",
            });
          }

          // TODO: Fix correct type to refs
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement(child as ReactElement<any>, {
            key: index,
            role: "listitem",
          });
        })}
      </div>

      <CardCarouselNavButton
        position="right"
        onClick={handleContainerRightScroll}
        showArrow={carouselNavButtonRightActive}
      />
    </div>
  );
};

export default CardCarousel;
