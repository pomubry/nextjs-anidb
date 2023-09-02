import { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

import ThemeToggle from "./ThemeToggle";

import navLinks from "@/lib/links/navLinks";

const LinksMobile = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="relative mx-2 min-[550px]:hidden">
      <GiHamburgerMenu
        className="cursor-pointer text-xl dark:text-slate-200"
        aria-label="Nav Options"
        onClick={() => setIsShown(true)}
      />
      <div
        onClick={() => setIsShown(false)}
        className={`${
          isShown ? "fixed" : "hidden"
        } animate-modalAnim inset-0 z-10 bg-slate-900/25 opacity-90 backdrop-blur`}
      ></div>
      <div
        className={`${
          isShown ? "absolute" : "hidden"
        } animate-navAnim right-0 z-20 flex w-max flex-col rounded-md bg-slate-200 py-2 dark:bg-slate-800 dark:text-slate-200`}
      >
        {navLinks.map((link) => (
          <a
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-center hover:bg-slate-300 focus:border-2 focus:border-purple-400 hover:dark:bg-slate-900"
            key={link.link}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

const LinksWeb = () => (
  <div className="hidden min-[550px]:block">
    {navLinks.map((link) => {
      return link.name === "Sign Up" ? (
        <a
          href={link.link}
          target="_blank"
          rel="nooopener noreferrer"
          key={link.link}
          className="mx-2 rounded-md bg-purple-300 p-2 font-bold text-slate-800"
        >
          {link.name}
        </a>
      ) : (
        <a
          href={link.link}
          target="_blank"
          rel="nooopener noreferrer"
          key={link.name}
          className="rounded-md p-2 font-semibold duration-300 hover:bg-purple-300 dark:text-slate-200 dark:hover:bg-slate-800/50"
        >
          {link.name}
        </a>
      );
    })}
  </div>
);

const Nav = () => {
  return (
    <div className="bg-slate-300 p-3 transition dark:bg-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center">
        <div className="flex-1">
          <Link href="/" shallow title="NextAni Homepage">
            <span className="text-5xl font-extrabold text-slate-800 dark:text-slate-200">
              N
            </span>
            <span className="inline-block -translate-x-[30%] text-5xl font-extrabold text-purple-400 dark:text-purple-300">
              A
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <LinksMobile />
          <LinksWeb />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};
export default Nav;
