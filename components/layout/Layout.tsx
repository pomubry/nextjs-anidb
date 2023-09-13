import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-200 text-slate-800 transition duration-300 dark:bg-slate-800 dark:text-slate-200">
      <Nav />

      <main>{children}</main>

      <Footer />

      <MdOutlineKeyboardDoubleArrowUp
        aria-label="Button to scroll back to the top of page"
        className="fixed bottom-5 right-5 h-10 w-10 cursor-pointer rounded-lg text-purple bg-purple-hover"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}
