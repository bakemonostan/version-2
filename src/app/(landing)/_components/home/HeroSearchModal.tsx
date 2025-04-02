"use client";

import { Modal } from "@/components/ui/modal";
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
import { SingleDatePicker } from "../shared/SingleDatePicker";
import { useModal } from "@/providers/ModalContext";

export function HeroSearchModal() {
  const { closeModal } = useModal();
  
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
    console.log("Form data:", {
      category: categoryId,
      subCatergory: subCategoryId,
      rental_date_from: formatDate(data.rentalDateFrom),
      rental_date_to: formatDate(data.rentalDateTo),
    });
    closeModal(); // Close the modal on submission
  };

  return (
    <Modal id="hero-search-modal" title="Find Your Vehicle" className="!max-w-[500px] rounded-3xl">
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div>
                <SelectInput
                  control={form.control}
                  name="category"
                  labelText="Category"
                  disabled={isLoading}
                  placeholder="Category"
                  items={categoryNames || []}
                />
              </div>
              
              <div>
                <SelectInput
                  control={form.control}
                  name="subCatergory"
                  disabled={subcategoriesLoading}
                  labelText="Sub Category"
                  items={subCategories || []}
                  placeholder="Sub Category"
                />
              </div>
              
              <div>
                <SingleDatePicker
                  control={form.control}
                  name="rentalDateFrom"
                  label="From"
                  placeholder="Start date"
                  popoverContentClassName="z-[100]"
                />
              </div>
              
              <div>
                <SingleDatePicker
                  control={form.control}
                  name="rentalDateTo"
                  label="To"
                  placeholder="End date"
                  popoverContentClassName="z-[100]"
                />
              </div>
            </div>
            
            <Button
              type="submit"
              variant="cta"
              className="w-full rounded-full mt-6">
              Search
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
} 
