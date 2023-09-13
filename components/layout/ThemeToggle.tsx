import { useEffect, useState, type ReactNode } from "react";
import * as Switch from "@radix-ui/react-switch";
import { Transition } from "@headlessui/react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

import { getAppTheme, setDarkMode, setLightMode } from "@/lib/utils";

function IconTransition({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      {children}
    </Transition>
  );
}

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  function toggleColorMode() {
    if (isDarkMode) {
      setLightMode();
      setIsDarkMode(false);
    } else {
      setDarkMode();
      setIsDarkMode(true);
    }
  }

  useEffect(() => {
    if (getAppTheme() === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  if (isDarkMode === null) {
    // Placeholder to avoid layout shift
    return <div className="ml-3 w-[42px]"></div>;
  }

  return (
    <form>
      <div className="flex items-center">
        <label className="hidden" htmlFor="theme-mode">
          Toggle dark mode
        </label>

        <Switch.Root
          className="relative h-[25px] w-[42px] cursor-pointer rounded-full bg-slate-200 shadow-md shadow-slate-500 duration-300 data-[state=checked]:bg-slate-800"
          id="theme-mode"
          checked={isDarkMode}
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
        >
          <Switch.Thumb
            className={`relative block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-purple-300 text-slate-900 transition-transform duration-300 will-change-transform data-[state=checked]:translate-x-[19px]`}
          >
            <IconTransition show={isDarkMode}>
              <RiMoonClearFill />
            </IconTransition>
            <IconTransition show={!isDarkMode}>
              <RiSunFill />
            </IconTransition>
          </Switch.Thumb>
        </Switch.Root>
      </div>
    </form>
  );
}
