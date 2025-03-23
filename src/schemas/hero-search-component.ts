import { z } from "zod";

export const formSchema = z.object({
  category: z.string().optional(),
  subCatergory: z.string().optional(),
  rentalDates: z
    .object({
      from: z.date().optional().nullable(),
      to: z.date().optional().nullable(),
    })
    .optional(),
});

export type FormValues = z.infer<typeof formSchema>;


export const DEFAULT_FORM_VALUES: FormValues = {
  category: "",
  subCatergory: "",
  rentalDates: {
    from: null,
    to: null,
  },
};