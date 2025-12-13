"use client";

import React, { ReactElement, useRef } from "react";

interface ThemeContextProps {
  children: React.ReactNode;
}

const ThemeContext = ({ children }: ThemeContextProps) => {
  const themeContainerRef = useRef(null);
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

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
