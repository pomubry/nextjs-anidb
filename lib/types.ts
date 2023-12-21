import { z } from "zod";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import {
  formQuerySchema,
  clientHomeSearchParamsSchema,
  studioQuerySchema,
  staffSchema,
  animeSchema,
} from "./validation";
import { getServerHomeQuery } from "./utils";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type ObjectQuery = Record<string, unknown>;

// ===== Homepage

export type FormQuery = z.infer<typeof formQuerySchema>;
export type ClientHomeSearchParams = z.infer<
  typeof clientHomeSearchParamsSchema
>;
export type ServerHomeQuery = ReturnType<typeof getServerHomeQuery>;

// ===== Studio

export type StudioQuerySchemaType = z.infer<typeof studioQuerySchema>;

// ===== VA

export type StaffSchemaType = z.infer<typeof staffSchema>;

// ===== Anime

export type AnimeSchemaType = z.infer<typeof animeSchema>;
