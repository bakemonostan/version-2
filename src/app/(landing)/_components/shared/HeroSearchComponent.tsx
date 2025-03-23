"use client";
import React from "react";
import { SelectInput } from "@/components/Form/FormFields";
import RangeDatePicker from "@/components/Form/DatePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  useCategories,
  useCategoryId,
  useGetSubcategoriesByCategoryId,
  useGetSubcategoryId,
} from "@/hooks/hooks";
import { formatDate } from "@/utils/general";
import {
  DEFAULT_FORM_VALUES,
  formSchema,
  FormValues,
} from "@/schemas/hero-search-component";

interface props extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

export default function HeroSearchComponent(props: props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  form.watch(["category", "subCatergory"]);
  const {categoryNames, isLoading} = useCategories();
  const categoryId = useCategoryId(form.getValues("category")!);
  const {subCategories,subcategoriesLoading } = useGetSubcategoriesByCategoryId(categoryId!);
  const subCategoryId = useGetSubcategoryId(
    categoryId!,
    form.getValues("subCatergory")!
  );

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", {
      category: categoryId,
      subCatergory: subCategoryId,
      rental_date_to: formatDate(data.rentalDates?.to),
      rental_date_from: formatDate(data.rentalDates?.from),
    });
  };

  return (
    <div className="mx-auto max-w-4xl" {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:block shadow-xl mx-auto rounded-2xl sm:rounded-full p-[1px] bg-gradient-to-r from-[#AD75E2] to-[#FFCB4E]"
        >
          <div className="sm:grid flex sm:items-center flex-col sm:grid-cols-12 p-4 sm:p-0.5 sm:pl-5 rounded-2xl gap-3 bg-white sm:rounded-full dark:bg-gray-900">
            <div className="relative sm:col-span-3">
              <SelectInput
                control={form.control}
                name="category"
                labelText="Category"
                disabled={isLoading}
                placeholder="Category"
                items={categoryNames || []}
              />
              <div className="hidden sm:block absolute top-0 -right-1 w-0.5 h-full bg-gray-200"></div>
            </div>
            <div className="relative sm:col-span-3">
              <SelectInput
                control={form.control}
                name="subCatergory"
                disabled={subcategoriesLoading}
                labelText="Sub Category"
                items={ subCategories || []}
                placeholder="Sub Category"
              />
              <div className="absolute hidden sm:block top-0 -right-1 w-0.5 h-full  bg-gray-200"></div>
            </div>
            <div className="relative sm:col-span-4">
              <RangeDatePicker
                control={form.control}
                name="rentalDates"
                label="Rental dates"
              />
            </div>
            <div className="relative flex items-center h-full col-span-2 p-0.5 pl-7">
              <Button
                type="submit"
                variant="cta"
                className="w-full h-full rounded-full"
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
