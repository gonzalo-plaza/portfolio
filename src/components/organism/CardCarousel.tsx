import styles from "@/styles/components/organism/card-carousel.module.scss";
import { ArrowBigRight } from "lucide-react";
import { ReactNode } from "react";

interface CardCarouselProps {
  children: ReactNode;
}

const CardCarousel = ({ children }: CardCarouselProps) => {
  return (
    <div className={styles.cardCarouselWrapper}>
      <button className={styles.buttonArrow}>
        <ArrowBigRight />
      </button>

      <ul className={`${styles.cardCarousel} js-carousel-container`}>
        {children}
      </ul>
    </div>
  );
};

export default CardCarousel;
