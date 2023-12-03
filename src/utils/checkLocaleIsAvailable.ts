import { LANGUAGES } from "@/constants/LANGUAGES";

export const checkLocaleIsAvailable = (locale: string): boolean => {
  // @ts-ignore
  const localesAvailable = Object.keys(LANGUAGES).map((key) => LANGUAGES[key]);
  return localesAvailable.includes(locale);
};
