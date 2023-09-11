import { z } from "zod";
import { formQuerySchema, clientHomeSearchParamsSchema } from "./validation";
import { getServerHomeQuery } from "./utils";

export type FormQuery = z.infer<typeof formQuerySchema>;
export type ClientHomeSearchParams = z.infer<
  typeof clientHomeSearchParamsSchema
>;
export type ServerHomeQuery = ReturnType<typeof getServerHomeQuery>;
