import Head from "next/head";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import MainLayout from "@/layouts/MainLayout";

export default function CustomError() {
  return (
    <MainLayout>
      <Head>
        <title>Page not found | NextAni</title>
        <meta name="description" content="This page does not exist!" />
      </Head>
      <div className="mt-5 flex flex-col items-center gap-5 rounded-lg p-5 duration-300 bg-card">
        <h1 className="text-center text-9xl font-extrabold text-red">404</h1>
        <p className="font-semibold">Page not found!</p>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-slate-200 p-3 font-semibold duration-300 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700"
        >
          <FaHome /> Go back to homepage
        </Link>
      </div>
    </MainLayout>
  );
}
