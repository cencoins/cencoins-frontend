import { useEffect, useState } from "react";

export const useDarkMode = (): [string, () => void, boolean] => {
  const [themeMode, setTheme] = useState("light");
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode: string) => {
    try {
      window.localStorage.setItem("themeMode", mode);
    } catch {
      /* do nothing */
    }
    setTheme(mode);
  };

  const themeToggler = (): void => {
    themeMode === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem("themeMode");
      localTheme ? setTheme(localTheme) : setMode("light");
    } catch {
      setMode("light");
    }

    setMountedComponent(true);
  }, []);

  return [themeMode, themeToggler, mountedComponent];
};
