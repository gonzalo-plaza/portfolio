"use client";

import { useThemeStore } from "@/providers/theme-store-provider";
import React, { ReactElement, ReactNode, useEffect, useRef } from "react";

interface UpdateThemeUtilProps {
  children: ReactNode;
}

const UpdateThemeUtil = ({ children }: UpdateThemeUtilProps) => {
  const themeContainerRef = useRef<HTMLElement | null>(null);
  const { theme } = useThemeStore((state) => state);

  useEffect(() => {
    const themeContainer = themeContainerRef.current;

    themeContainer?.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      {
        // TODO - Fix correct type for refs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.cloneElement(children as ReactElement<any>, {
          ref: themeContainerRef,
        })
      }
    </>
  );
};

export default UpdateThemeUtil;
