import { z } from "zod";
import { catchHandler, getCurrentYear } from "./utils";

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
