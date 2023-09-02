import { z } from "zod";
import { formQuerySchema, homeQuerySchema } from "./validation";

export type FormQuery = z.infer<typeof formQuerySchema>;
export type HomeQuery = z.infer<typeof homeQuerySchema>;
