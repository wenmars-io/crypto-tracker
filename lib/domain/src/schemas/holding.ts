import { Holding } from "../types";
import { z } from "zod";

export const holdingSchem: z.ZodType<Holding> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  cryptoId: z.string(),
  quantity: z.number().positive(),
  purchaseDate: z.coerce.date().optional(),
  purchasePrice: z.number().optional(),
});
