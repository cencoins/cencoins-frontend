/** @type {import('next-i18next').UserConfig} */

module.exports = {
  // debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en"],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  fallbackLng: {
    default: ["ru"],
  },
  nonExplicitSupportedLngs: true,
  ns: "common",
  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */
  // saveMissing: false,
  // strictMode: true,
  // serializeConfig: false,
  // react: { useSuspense: false }
};
