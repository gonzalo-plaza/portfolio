"use client";

import {
  hasItemDisappearedFromCenter,
  isItemEnteringFromBottom,
} from "@/utils/workExperienceUtils";
import { useEffect } from "react";

interface WorkExperieceActiveAnimationProps {
  itemActiveClass: string;
}

// TODO: Pending refactoring to find another approach and avoid using querySelector, and try to follow React's recommendations.

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
            isItemEnteringFromBottom(element, viewportCenter)
          ) {
            activeIndex = null;
            break;
          }

          const lastIndex = workExperienceItems.length - 1;

          if (
            index === lastIndex &&
            hasItemDisappearedFromCenter(element, viewportCenter)
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
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestAnimationFrameId)
        cancelAnimationFrame(requestAnimationFrameId);
    };
  }, []);

  return <></>;
};

export default WorkExperienceActiveAnimation;
