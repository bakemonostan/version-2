"use client";
import { TextInput } from "@/components/Form/FormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  postalCode: z
    .string({
      required_error: "Postal code is required",
    })
    .min(2, {
      message: "Postal code must be at least 2 characters",
    }),
});

type PostalCodeFormSchema = z.infer<typeof schema>;

export default function PostalCodeForm() {
  const form = useForm<PostalCodeFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      postalCode: "",
    },
  });

  const postalCode = form.watch("postalCode");
  const [debouncedPostalCode] = useDebouncedValue(postalCode, 2000);

  useEffect(() => {
    if (debouncedPostalCode) {
      console.log("Debounced postal code:", debouncedPostalCode);
    }
  }, [debouncedPostalCode]);

  const onSubmit = (values: PostalCodeFormSchema) => {
    console.log("Form submitted with:", values);
  };

  return (
    <div>
      <p className="header-6 font-extrabold uppercase pb-4">Vehicle Location</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[449px]">
          <TextInput
            label="Postal Code"
            placeholder="Enter your postal code"
            control={form.control}
            name="postalCode"
          />
          <div className="flex justify-start pt-4">
            <Button
              type="submit"
              variant="cta"
              disabled={!debouncedPostalCode}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
