import Link from "next/link";
import Links from "./Links";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="px-5 py-3 transition bg-card">
      <div className="mx-auto flex max-w-7xl items-center">
        <div className="flex-1">
          <Link href="/" shallow>
            <span className="text-5xl font-extrabold text-slate-800 duration-300 dark:text-slate-200">
              N
            </span>
            <span className="inline-block -translate-x-[30%] text-5xl font-extrabold text-purple">
              A
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Links />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
