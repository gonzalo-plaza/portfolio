"use client";

import { animate, createScope, stagger, text } from "animejs";
import { useEffect, useRef } from "react";

export default function TitleAnimation() {
  const scope = useRef<any>(null);

  useEffect(() => {
    scope.current = createScope().add(() => {
      const { chars } = text.split(
        ".js-mainSectionDescription__titleAnimation",
        {
          words: false,
          chars: true,
        }
      );
      animate(chars, {
        // Property keyframes
        y: [
          { to: "-2.75rem", ease: "outExpo", duration: 600 },
          { to: 0, ease: "outBounce", duration: 800, delay: 100 },
        ],
        // Property specific parameters
        rotate: {
          from: "-1turn",
          delay: 0,
        },
        delay: stagger(50),
        ease: "inOutCirc",
        loopDelay: 1000,
        loop: 1,
      });
    });
  }, []);

  return <></>;
}
