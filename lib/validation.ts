import { z } from "zod";
import { catchHandler, getCurrentYear } from "./utils";

// ===== Homepage

export const pageSchema = z.coerce.number().positive(); // > 0;

export const searchSchema = z.string();

const serverSeasonSchema = z.enum(["WINTER", "SPRING", "SUMMER", "FALL"]);

const serverYearSchema = z.coerce
  .number()
  .min(1940)
  .max(getCurrentYear() + 1);

const clientSeasonSchema = serverSeasonSchema.or(z.literal("ALL"));

const clientYearSchema = serverYearSchema.or(z.literal("ALL"));

export const clientHomeSearchParamsSchema = z.object({
  pg: pageSchema.optional().catch((data) => catchHandler(data, pageSchema)),
  sr: searchSchema.optional().catch((data) => catchHandler(data, searchSchema)),
  ss: clientSeasonSchema
    .optional()
    .catch((data) => catchHandler(data, clientSeasonSchema)),
  yr: clientYearSchema
    .optional()
    .catch((data) => catchHandler(data, clientYearSchema)),
});

export const formQuerySchema = z.object({
  sr: searchSchema,
  ss: clientSeasonSchema,
  yr: clientYearSchema,
});

// ===== studio

const numberSchema = z.coerce.number().positive();
const defaultPageSchema = numberSchema.catch((e) => {
  if (Array.isArray(e.input)) {
    const res = (e.input as string[]).find(
      (input) => numberSchema.safeParse(input).success,
    );
    const num = numberSchema.safeParse(res);
    return num.success ? num.data : 1;
  } else {
    return 1;
  }
});

export const studioQuerySchema = z.object({
  id: numberSchema,
  pg: defaultPageSchema,
});

// ===== va

export const staffSchema = z.object({
  id: numberSchema,
  cp: defaultPageSchema,
  sp: defaultPageSchema,
});

// ===== anime

export const animeSchema = staffSchema;
export const themeSchema = z.object({
  data: z.object({
    openings: z.array(z.string()),
    endings: z.array(z.string()),
  }),
});
