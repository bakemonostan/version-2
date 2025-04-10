import { z } from "zod";

export const formSchema = z.object({
  category: z.string().optional(),
  subCatergory: z.string().optional(),
  rangeDate: z.object({
    from: z.date().optional().nullable(),
    to: z.date().optional().nullable(),
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export const DEFAULT_FORM_VALUES: FormValues = {
  category: "",
  subCatergory: "",
  rangeDate: {
    from: null,
    to: null,
  },
};
