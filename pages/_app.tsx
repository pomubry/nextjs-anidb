import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NProgress from "nprogress";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@/styles/nprogress.css";
import type { NextPageWithLayout } from "@/lib/types";

type ExtendedAppProps = AppProps<{ dehydratedState: DehydratedState }>;

type AppPropsWithLayout = ExtendedAppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp(props: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const { Component, pageProps } = props;
  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page) => page);

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

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Head>
          <meta name="author" content="pomubry" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </HydrationBoundary>
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>,
  );
}
