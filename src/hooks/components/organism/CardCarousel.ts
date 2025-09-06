import React, { ReactNode, useEffect, useRef, useState } from "react";

export const useCardCarousel = (children: ReactNode) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const firstElementRef = useRef<HTMLElement | null>(null);
  const lastElementRef = useRef<HTMLElement | null>(null);

  const [carouselNavButtonLeftActive, setCarouselNavButtonLeftActive] =
    useState<boolean>(false);
  const [carouselNavButtonRightActive, setCarouselNavButtonRightActive] =
    useState<boolean>(false);

  const childrenArray = React.Children.toArray(children);

  const handleContainerRightScroll = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft += 500;
  };
  const handleContainerLeftScroll = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft -= 500;
  };

  useEffect(() => {
    const container = containerRef.current;
    const firstElement = firstElementRef.current;
    const lastElement = lastElementRef.current;

    if (!container || !firstElement || !lastElement) {
      console.error(
        "Error loading carousel desktop logic, some element is not obtained"
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.target === firstElement)
            setCarouselNavButtonLeftActive(!entry.isIntersecting);

          if (entry.target === lastElement)
            setCarouselNavButtonRightActive(!entry.isIntersecting);
        });
      },
      {
        root: container,
        threshold: 1,
        rootMargin: "-10px",
      }
    );

    observer.observe(firstElement);
    observer.observe(lastElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    containerRef,
    firstElementRef,
    lastElementRef,
    carouselNavButtonLeftActive,
    carouselNavButtonRightActive,
    childrenArray,
    handleContainerRightScroll,
    handleContainerLeftScroll,
  };
};
