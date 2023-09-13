import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import type { ReactNode } from "react";

import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-200 text-slate-800 transition duration-300 dark:bg-slate-800 dark:text-slate-200">
      <Nav />

      <main>{children}</main>

      <Footer />

      <button
        aria-label="Scroll back to the top of page"
        className="fixed bottom-5 right-5 cursor-pointer rounded-lg text-5xl text-purple bg-purple-hover"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <MdOutlineKeyboardDoubleArrowUp />
      </button>
    </div>
  );
}
