"use client";

import { useEffect, useState } from "react";

const isItemDisapearFromCenter = (item: Element, viewportCenter: number) => {
  const itemRect = item.getBoundingClientRect();
  const itemBottomDistance = itemRect.bottom - viewportCenter;
  const itemIsDisapearFromCenter = itemBottomDistance < 0;

  return itemIsDisapearFromCenter;
};

const isItemEnteringFromBotton = (item: Element, viewportCenter: number) => {
  const itemRect = item.getBoundingClientRect();
  const itemTopDistance = itemRect.top - viewportCenter;
  const firstItemIsEnteringFromBottom =
    itemTopDistance > 0 && itemTopDistance > 50;

  return firstItemIsEnteringFromBottom;
};

interface WorkExperieceActiveAnimationProps {
  itemActiveClass: string;
}

const WorkExperienceActiveAnimation = ({
  itemActiveClass,
}: WorkExperieceActiveAnimationProps) => {
  useEffect(() => {
    let activeIndex: number | null = null;
    let requestAnimationFrameId: number | null = null;
    const workExperienceItems = document.querySelectorAll(
      ".js-work-experience-item"
    );
    const handleScroll = () => {
      if (requestAnimationFrameId)
        cancelAnimationFrame(requestAnimationFrameId);

      requestAnimationFrameId = requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;

        let closestIndex: number | null = null;
        let closestDistance = Infinity;

        for (let index = 0; index < workExperienceItems.length; index++) {
          const element = workExperienceItems.item(index);
          if (!element) return;

          if (
            index === 0 &&
            isItemEnteringFromBotton(element, viewportCenter)
          ) {
            activeIndex = null;
            break;
          }

          const lastIndex = workExperienceItems.length - 1;

          if (
            index === lastIndex &&
            isItemDisapearFromCenter(element, viewportCenter)
          ) {
            activeIndex = null;
            break;
          }

          const rect = element.getBoundingClientRect();
          const elementCenter = (rect.top + rect.bottom) / 2;
          const distance = Math.abs(viewportCenter - elementCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }

        activeIndex = closestIndex;
      });

      workExperienceItems.forEach((item) => {
        const itemIndex = Number(item.getAttribute("data-index"));
        const isCurrentElement = itemIndex === activeIndex;
        if (isCurrentElement) {
          item.classList.add(itemActiveClass);
          return;
        }

        item.classList.remove(itemActiveClass);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // ejecutar al cargar

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestAnimationFrameId)
        cancelAnimationFrame(requestAnimationFrameId);
    };
  }, []);

  return <></>;
};

export default WorkExperienceActiveAnimation;
