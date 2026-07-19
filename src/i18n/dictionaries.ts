import "server-only";

import type { Locale } from "./config";
import { i18n } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  (dictionaries[locale] ?? dictionaries[i18n.defaultLocale])();
