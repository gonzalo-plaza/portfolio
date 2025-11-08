"use client";

import styles from "@/styles/components/organism/card-carousel/card-carousel.module.scss";
import React, { isValidElement, ReactElement, ReactNode } from "react";
import CardCarouselNavButton from "./_components/CardCarouselNavButton";
import { useCardCarousel } from "@/hooks/components/organism/CardCarousel";
import Button from "@/components/atoms/Button";

interface CardCarouselProps {
  children: ReactNode;
  carouselName: string;
  carouselId: string;
}

const CardCarousel = ({ children, carouselName, carouselId }: CardCarouselProps) => {
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
      <Button asChild screenReader>
        <a href={`#skip-${carouselId}-section`}>Saltar {carouselName || "sección"}</a>
      </Button>
      <CardCarouselNavButton
        position="left"
        onClick={handleContainerLeftScroll}
        showArrow={carouselNavButtonLeftActive}
      />

      <section className={styles.cardCarousel} ref={containerRef}>
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
            });
          }

          if (isLast) {
            // TODO: Fix correct type to refs
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return React.cloneElement(child as ReactElement<any>, {
              key: index,
              ref: lastElementRef,
            });
          }

          // TODO: Fix correct type to refs
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement(child as ReactElement<any>, {
            key: index,
          });
        })}
      </section>

      <CardCarouselNavButton
        position="right"
        onClick={handleContainerRightScroll}
        showArrow={carouselNavButtonRightActive}
      />
      <span id={`skip-${carouselId}-section`} className="visibly-hidden" tabIndex={-1}>Fin de {carouselName || 'sección'}</span>
    </div>
  );
};

export default CardCarousel;
