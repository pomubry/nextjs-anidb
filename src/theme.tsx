import React, { createContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IChildren, IContext } from "../lib/interface/interface";

export const ToggleThemeContext = createContext<IContext | null>(null);
const themeKey = "nextani-theme";

export default function ToggleTheme({ children }: IChildren) {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const theme = window.localStorage.getItem(themeKey);
    if (theme === "dark" || theme === "light") {
      setMode(theme);
    } else {
      window.localStorage.setItem(themeKey, "dark");
    }
  }, []);

  const toggleTheme = () => {
    setMode((mode) => (mode === "dark" ? "light" : "dark"));
    window.localStorage.setItem(themeKey, mode === "dark" ? "light" : "dark");
  };

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#181818" : "#e0e0e0",
          },
        },
      }),
    [mode]
  );

  return (
    <ToggleThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ToggleThemeContext.Provider>
  );
}
