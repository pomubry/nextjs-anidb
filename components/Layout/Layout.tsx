import Head from "next/head";
import { BiUpArrow } from "react-icons/bi";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta name="author" content="pomubry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between bg-slate-400/60 text-slate-800 transition dark:bg-slate-900/[.95] dark:text-slate-200">
        <Nav />

        <main>{children}</main>

        <Footer />

        <BiUpArrow
          aria-labelledby="Button to scroll back to the top of page"
          className="fixed bottom-5 right-5 h-10 w-10 cursor-pointer rounded-full border-2 border-purple-400 p-1.5 text-purple-500 duration-300 hover:bg-purple-400/30"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </div>
    </>
  );
}
