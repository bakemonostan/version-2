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
import { usePathname, useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import RangeDatePicker from "@/components/Form/RangeDatePicker";

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
      rentalDateFrom: data.rangeDate.from
        ? formatDate(data.rangeDate.from)
        : null,
      rentalDateTo: data.rangeDate.to ? formatDate(data.rangeDate.to) : null,
    });

    // Redirect to all-vehicles page if not already there
    if (!isAllVehiclesRoute) {
      router.push("/all-vehicles");
    }
  };

  return (
    <div
      className={`mx-auto ${
        isAllVehiclesRoute ? "max-w-[1080px]" : "max-w-4xl"
      }`}
      {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:block shadow-xl mx-auto rounded-2xl sm:rounded-full p-[1px] bg-gradient-to-r from-[#AD75E2] to-[#FFCB4E] ">
          <div
            className="sm:grid flex sm:items-center flex-col sm:grid-cols-4
           rounded-2xl gap-3 bg-white sm:rounded-full ">
            <div className="grid grid-cols-3 col-span-3  px-4 gap-5 py-1">
              <div className="relative flex items-center px-2">
                <SelectInput
                  control={form.control}
                  name="category"
                  labelText="Category"
                  disabled={isLoading}
                  placeholder="Category"
                  triggerClassName=" px-0 border-0 py-0 shadow-none body-secondary"
                  items={categoryNames || []}
                />
                <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-1 w-0.5 h-3/4 bg-gray-200"></div>
              </div>
              <div className="relative flex items-center px-2 ">
                <SelectInput
                  control={form.control}
                  name="subCatergory"
                  disabled={subcategoriesLoading}
                  labelText="Sub Category"
                  triggerClassName=" px-0 border-0 py-0 shadow-none body-secondary"
                  items={subCategories || []}
                  placeholder="Sub Category"
                />
                <div className="absolute hidden sm:block top-1/2 -translate-y-1/2 -right-1 w-0.5 h-3/4  bg-gray-200"></div>
              </div>
              <div className="relative flex items-center px-2 w-full">
                <RangeDatePicker

                  control={form.control}
                  name="rangeDate"
                  label="Rental dates"
                  variant="unstyled"
                  placeholder="From - Until"
                />
              </div>
            </div>

            <div className="relative flex items-end justify-end h-full p-1">
              <Button
                type="submit"
                variant="cta"
                className="h-full rounded-full">
                Search
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
