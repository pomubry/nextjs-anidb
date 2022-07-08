import { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ToggleThemeContext = createContext();

export default function ToggleTheme({ children }) {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () => {
    setMode((mode) => (mode === "dark" ? "light" : "dark"));
  };

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
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
