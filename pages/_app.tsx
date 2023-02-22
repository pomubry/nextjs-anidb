import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
