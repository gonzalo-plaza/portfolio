"use client";

// TODO: Refactor to use Button atom component instead of native HTML button
// This will make it a proper molecule (Button atom + Icon)
import { useThemeStore } from "@/providers/theme-store-provider";
import { Paintbrush } from "lucide-react";

interface ThemeButtonProps {
  className: string;
}

const ThemeButton = ({ className }: ThemeButtonProps) => {
  const { updateTheme } = useThemeStore((state) => state);
  return (
    <button
      className={className}
      onClick={updateTheme}
      aria-label="Cambiar tema"
    >
      <Paintbrush />
    </button>
  );
};

ThemeButton.displayName = "ThemeButton";

export default ThemeButton;
