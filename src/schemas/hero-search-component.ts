import { z } from "zod";

export const formSchema = z.object({
  category: z.string().optional(),
  subCatergory: z.string().optional(),
  rentalDateFrom: z.date().optional().nullable(),
  rentalDateTo: z.date().optional().nullable(),
});

export type FormValues = z.infer<typeof formSchema>;

export const DEFAULT_FORM_VALUES: FormValues = {
  category: "",
  subCatergory: "",
  rentalDateFrom: null,
  rentalDateTo: null,
};
