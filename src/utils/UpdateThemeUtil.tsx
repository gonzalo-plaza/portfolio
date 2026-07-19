"use client";

import { useThemeStore } from "@/providers/theme-store-provider";
import { ReactNode, useEffect } from "react";

interface UpdateThemeUtilProps {
  children: ReactNode;
}

const UpdateThemeUtil = ({ children }: UpdateThemeUtilProps) => {
  const { theme } = useThemeStore((state) => state);

  useEffect(() => {
    // The theme attribute must live on <html> (not <body>): the main viewport
    // scrollbar is styled on <html>, and CSS custom properties only inherit
    // downward. Setting it on a descendant would never reach the scrollbar.
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
};

export default UpdateThemeUtil;
