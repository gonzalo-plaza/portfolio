"use client";

import { useThemeStore } from "@/providers/theme-store-provider";
import { Paintbrush } from "lucide-react";

interface ThemeButtonProps {
  className: string;
}

const ThemeButton = ({ className }: ThemeButtonProps) => {
  const { updateTheme } = useThemeStore((state) => state);
  return (
    <button className={className} onClick={updateTheme}>
      <Paintbrush />
    </button>
  );
};

ThemeButton.displayName = "ThemeButton";

export default ThemeButton;
