import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { z } from "zod";
import { formQuerySchema, clientHomeSearchParamsSchema } from "./validation";
import { getServerHomeQuery } from "./utils";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
export type FormQuery = z.infer<typeof formQuerySchema>;
export type ClientHomeSearchParams = z.infer<
  typeof clientHomeSearchParamsSchema
>;
export type ServerHomeQuery = ReturnType<typeof getServerHomeQuery>;
