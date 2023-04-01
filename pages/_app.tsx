import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from "@tanstack/react-query";
import NProgress from "nprogress";

import Layout from "@/components/layout/Layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/globals.css";
import "@/styles/nprogress.css";

export const getInitialTheme = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export default function MyApp(
  props: AppProps<{ dehydratedState: DehydratedState }>
) {
  const [isMounted, setIsMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    if (!isMounted) {
      getInitialTheme();
      setIsMounted(true);
    }

    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    darkModePreference.addEventListener("change", getInitialTheme);

    return () =>
      darkModePreference.removeEventListener("change", getInitialTheme);
  }, [isMounted]);

  useEffect(() => {
    const progress = NProgress.configure({ showSpinner: false });

    const handleStart = () => {
      progress.start();
    };

    const handleStop = () => {
      progress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  if (!isMounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
