import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NProgress from "nprogress";

import Layout from "@/components/layout/Layout";

import "@/styles/globals.css";
import "@/styles/nprogress.css";

export default function MyApp(
  props: AppProps<{ dehydratedState: DehydratedState }>
) {
  const [queryClient] = useState(() => new QueryClient());
  const { Component, pageProps } = props;
  const router = useRouter();

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

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>NextAni Database</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
