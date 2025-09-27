import { createStore } from "zustand/vanilla";

export type ThemeState = {
  theme: string;
};

export type ThemeActions = {
  updateTheme: () => void;
};

export type ThemeStore = ThemeState & ThemeActions;

const themesArray = ["main-theme", "blue", "green", "purple"];

export const defaultThemeState: ThemeState = {
  theme: "main-theme",
};

export const createThemeStore = (initState: ThemeState = defaultThemeState) => {
  return createStore<ThemeStore>()((set, get) => ({
    ...initState,
    updateTheme: () => {
      const state = get();
      const currentThemeIndex = themesArray.indexOf(state.theme);

      const indexResult = (currentThemeIndex + 1) % themesArray.length;

      set({
        theme: themesArray[indexResult],
      });
    },
  }));
};
