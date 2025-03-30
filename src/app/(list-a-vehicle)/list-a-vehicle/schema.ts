import { z } from "zod";

export const AddressSchema = z.object({
  street: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State/Region is required" }),
  postal_code: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export type AddressSchemaType = z.infer<typeof AddressSchema>;
