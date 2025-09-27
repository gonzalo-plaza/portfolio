"use client";

import React, { ReactElement, useRef } from "react";

interface ThemeContextProps {
  children: React.ReactNode;
}

const ThemeContext = ({ children }: ThemeContextProps) => {
  const themeContainerRef = useRef(null);
  return (
    <>
      {React.cloneElement(children as ReactElement<any>, {
        ref: themeContainerRef,
      })}
    </>
  );
};

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
