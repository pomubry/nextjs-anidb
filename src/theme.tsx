import React, { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IChildren, IContext } from "../lib/interface";

export const ToggleThemeContext = createContext<IContext | null>(null);

export default function ToggleTheme({ children }: IChildren) {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setMode((mode) => (mode === "dark" ? "light" : "dark"));
  };

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#181818" : "#fff",
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
