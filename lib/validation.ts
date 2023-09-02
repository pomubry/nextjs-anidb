import { z } from "zod";
import { getCurrentSeason, getCurrentYear } from "./utils";

const pageSchema = z.coerce.number().positive();

const seasonSchema = z.enum(["WINTER", "SPRING", "SUMMER", "FALL", "ALL"]);

const yearSchema = z.union([
  z.literal("ALL"),
  z.coerce
    .number()
    .min(1940)
    .max(getCurrentYear() + 1),
]);

export const formQuerySchema = z.object({
  sr: z.string().catch(""),
  ss: seasonSchema.catch((e) => {
    if (Array.isArray(e.input)) {
      const res = (e.input as string[]).find(
        (input) => seasonSchema.safeParse(input).success
      );
      return res ? seasonSchema.parse(res) : getCurrentSeason();
    } else {
      return getCurrentSeason();
    }
  }),
  yr: yearSchema.catch((e) => {
    if (Array.isArray(e.input)) {
      const res = (e.input as string[]).find(
        (input) => yearSchema.safeParse(input).success
      );
      return res ? +res : getCurrentYear();
    } else {
      return getCurrentYear();
    }
  }),
});

export const homeQuerySchema = formQuerySchema.extend({
  pg: pageSchema.catch((e) => {
    if (Array.isArray(e.input)) {
      const res = (e.input as string[]).find(
        (input) => pageSchema.safeParse(input).success
      );
      return res ? +res : 1;
    } else {
      return 1;
    }
  }),
});
