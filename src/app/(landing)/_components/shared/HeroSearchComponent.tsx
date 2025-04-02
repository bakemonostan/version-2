"use client";
import React from "react";
import { SelectInput } from "@/components/Form/FormFields";
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
import { SingleDatePicker } from "./SingleDatePicker";
import { usePathname, useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";

interface props extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

export default function HeroSearchComponent(props: props) {
  const pathname = usePathname();
  const router = useRouter();
  const setSearchParams = useBookingStore((state) => state.setSearchParams);
  const isAllVehiclesRoute = pathname.includes("/all-vehicles");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  form.watch(["category", "subCatergory"]);
  const { categoryNames, isLoading } = useCategories();
  const categoryId = useCategoryId(form.getValues("category")!);
  const { subCategories, subcategoriesLoading } =
    useGetSubcategoriesByCategoryId(categoryId!);
  const subCategoryId = useGetSubcategoryId(
    categoryId!,
    form.getValues("subCatergory")!
  );

  const onSubmit = (data: FormValues) => {
    // Save search params to the store
    setSearchParams({
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      rentalDateFrom: data.rentalDateFrom ? formatDate(data.rentalDateFrom) : null,
      rentalDateTo: data.rentalDateTo ? formatDate(data.rentalDateTo) : null,
    });
    
    // Redirect to all-vehicles page if not already there
    if (!isAllVehiclesRoute) {
      router.push("/all-vehicles");
    }
  };

  return (
    <div
      className={`mx-auto ${isAllVehiclesRoute ? "max-w-[1080px]" : "max-w-4xl"}`}
      {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:block shadow-xl mx-auto rounded-2xl sm:rounded-full p-[1px] bg-gradient-to-r from-[#AD75E2] to-[#FFCB4E] ">
          <div className="sm:grid flex sm:items-center flex-col sm:grid-cols-5 sm:p-0.5 sm:pl-5 sm:min-h-[4.375rem]
           rounded-2xl gap-3 bg-white sm:rounded-full dark:bg-gray-900">
            <div className="relative">
              <SelectInput
                control={form.control}
                name="category"
                labelText="Category"
                disabled={isLoading}
                placeholder="Category"
                triggerClassName="px-0 border-0 py-0 shadow-none"
                items={categoryNames || []}
              />
              <div className="hidden sm:block absolute top-0 -right-1 w-0.5 h-full bg-gray-200"></div>
            </div>
            <div className="relative">
              <SelectInput
                control={form.control}
                name="subCatergory"
                disabled={subcategoriesLoading}
                labelText="Sub Category"
                triggerClassName="px-0 border-0 py-0 shadow-none"
                items={subCategories || []}
                placeholder="Sub Category"
              />
              <div className="absolute hidden sm:block top-0 -right-1 w-0.5 h-full  bg-gray-200"></div>
            </div>
            <div className="relative">
              <div className="flex flex-col space-y-1 sm:space-y-0 sm:flex-row sm:space-x-2">
                <SingleDatePicker
                  control={form.control}
                  name="rentalDateFrom"
                  label="From"
                  placeholder="Start date"
                  placeholderClassName="px-0"
                  buttonClassName="text-left border-0 shadow-none hover:bg-transparent py-0  h-auto"
                  popoverContentClassName="z-[100]"
                />
              </div>
            </div>
            <div className="relative">
              <SingleDatePicker
                control={form.control}
                name="rentalDateTo"
                label="To"
                placeholderClassName="px-0"
                placeholder="End date"
                buttonClassName="text-left border-0 shadow-none hover:bg-transparent py-0  h-auto"
                popoverContentClassName="z-[100]"
              />
            </div>
            <div className="relative flex items-end justify-end h-full ">
              <Button
                type="submit"
                variant="cta"
                className="w-[6.25rem] h-full rounded-full">
                Search
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
