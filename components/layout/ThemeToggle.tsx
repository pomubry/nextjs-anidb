import { useEffect, useState } from "react";
import { getAppTheme, setDarkMode, setLightMode } from "@/lib/utils";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  const toggleColorMode = () => {
    if (isDarkMode) {
      setLightMode();
      setIsDarkMode(false);
    } else {
      setDarkMode();
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    if (getAppTheme() === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  if (isDarkMode === null) return null;

  return (
    <button aria-label="Theme mode toggle" onClick={toggleColorMode}>
      {isDarkMode ? (
        <RiMoonClearFill className="text-xl" />
      ) : (
        <RiSunFill className="text-xl" />
      )}
    </button>
  );
};
export default ThemeToggle;
