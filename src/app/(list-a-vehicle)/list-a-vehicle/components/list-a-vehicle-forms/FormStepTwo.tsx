import MultistepFormButtons from "./MultistepFormButtons";
import { useVehicleListingStore } from "../../vehicleListingstore";
import { useForm } from "react-hook-form";
import {
  FormStepTwoSchema,
  FormStepTwoSchemaType,
} from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectInput, TextInput, RadioInput } from "@/components/Form/FormFields";
import { 
  ConditionEnum, 
  TechnicalSpecifications, 
  PhysicalAttributes, 
  SpecialFeatures, 
  radioOptions 
} from "@/app/(list-a-vehicle)/form/form.content";
import { useVehicleDropdowns } from "@/hooks/useVehicleDropdowns";
import DynamicFormFields from "./DynamicFormFields";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { handlePost } from "@/utils/general";

// Define interface for vehicle feature item
interface VehicleFeatureItem {
  id: string;
  name: string;
}

export default function FormStepTwo() {
  const { setCurrentStep, selectedSubCategory, setFormTwoValue, formTwoValue, listingId } = useVehicleListingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    vehicleFeatures, 
    loadingEquippedWith, 
    equippedWith, 
    camperCheckboxes, 
    foodTruckCheckboxes,
    caravanCheckboxes 
  } = useVehicleDropdowns({
    loadEquippedWith: true
  });
  
  const { mutate } = useMutation({
    mutationKey: ['add vehicle specification'],
    mutationFn: (data: FormStepTwoSchemaType) => {
      const submissionData = { ...data };
      
      if (submissionData.equipped_with) {
        const equippedWithString = JSON.stringify(submissionData.equipped_with as Record<string, string[]>);
        return handlePost(`/vehicle/specification/${listingId}`, { ...submissionData, equipped_with: equippedWithString });
      }
      
      return handlePost(`/vehicle/specification/${listingId}`, submissionData);
    },
    onSuccess: () => {
      toast.success('Vehicle specifications saved successfully');
      setCurrentStep(3);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save vehicle specifications. Please try again.');
    }
  });
  
  // Convert boolean values to strings for radio inputs
  const prepareDefaultValues = () => {
    const defaultValues: Partial<FormStepTwoSchemaType> = {
      ...formTwoValue,
      vehicle_features: formTwoValue.vehicle_features || [],
      equipped_with: formTwoValue.equipped_with || {}
    };

    // List of fields that need to be converted from boolean to string
    const booleanFields = [
      'front_seat', 
      'back_seat', 
      'fire_extinguisher', 
      'mot', 
      'insurance', 
      'light_brake_tires'
    ] as const;

    // Convert boolean values to strings for radio inputs
    booleanFields.forEach(field => {
      if (defaultValues[field] !== undefined) {
        (defaultValues as Record<string, string | boolean | string[] | Record<string, string[]> | number | undefined>)[field] = defaultValues[field] === true ? 'true' : 'false';
      }
    });

    return defaultValues;
  };
  
  const form = useForm<FormStepTwoSchemaType>({
    resolver: zodResolver(FormStepTwoSchema),
    defaultValues: prepareDefaultValues()
  });
  
  // Update form values when formTwoValue changes
  useEffect(() => {
    const values = prepareDefaultValues();
    Object.keys(values).forEach(key => {
      if (values[key as keyof FormStepTwoSchemaType] !== undefined) {
        form.setValue(key as keyof FormStepTwoSchemaType, values[key as keyof FormStepTwoSchemaType]);
      }
    });
  }, [formTwoValue, form.setValue]);
  
  const onSubmit = async (data: FormStepTwoSchemaType) => {
    try {
      setIsSubmitting(true);
      setFormTwoValue(data);
      mutate(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save vehicle specifications. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="space-y-2.5 mb-8">
        <p className="header-l font-bold">More about your vehicle</p>
        <p className="body-2 text-black/80 ">
          It becomes 5x easier to find your vehicle when you tell us more!
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <p className="text-heading-6 font-extrabold mb-4 uppercase text-black/80">
              Technical specifications
            </p>
            <div className="grid grid-cols-4 gap-4 pb-8 border-b border-black/10">
              <SelectInput
                className="col-span-1 truncate"
                name="condition"
                control={form.control}
                labelText="Condition"
                items={ConditionEnum.options}
                placeholder={"-Select one-"}
              />
              {TechnicalSpecifications.map((item) => (
                <SelectInput
                  key={item.label}
                  labelText={item.label}
                  items={item.items}
                  name={item.name as keyof FormStepTwoSchemaType}
                  control={form.control}
                  placeholder={"-Select one-"}
                />
              ))}
              <TextInput
                name="engine_horsepower"
                control={form.control}
                label="Engine horsepower"
                placeholder="Enter engine horsepower"
              />
            </div>
          </div>
          <div>
            <p className="text-heading-6 font-extrabold mb-4 uppercase text-black/80 pt-8">
              Physical Attributes
            </p>
            <div className="grid grid-cols-4 gap-4 pb-8 border-b border-black/10">
              {PhysicalAttributes.map((item) => (
                <SelectInput
                  key={item.label}
                  labelText={item.label}
                  items={item.items}
                  name={item.name as keyof FormStepTwoSchemaType}
                  control={form.control}
                  placeholder={"-Select one-"}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-heading-6 leading-heading-6 font-extrabold mb-4 uppercase text-black/80 pt-8">
              Special Features
            </p>
            <div className="space-y-8 pb-8 border-b border-black/10">
              {SpecialFeatures.map((item, index, array) => {
                // Check if this item should be grouped with the next one
                if (item.groupWithNext) {
                  return (
                    <div key={item.name} className="flex gap-24">
                      <RadioInput
                        name={item.name as keyof FormStepTwoSchemaType}
                        control={form.control}
                        labelText={item.label}
                        options={radioOptions}
                      />
                      <RadioInput
                        name={array[index + 1].name as keyof FormStepTwoSchemaType}
                        control={form.control}
                        labelText={array[index + 1].label}
                        options={radioOptions}
                      />
                    </div>
                  );
                } 
                else if (index > 0 && array[index - 1].groupWithNext) {
                  return null;
                }
                // Render a standalone radio input
                else {
                  return (
                    <div key={item.name}>
                      <RadioInput
                        name={item.name as keyof FormStepTwoSchemaType}
                        control={form.control}
                        labelText={item.label}
                        options={radioOptions}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Vehicle Features Section (Top) */}
          <div className="py-3 pb-5">
            <p className="text-heading-6 font-extrabold mb-4 uppercase text-black/80">
              Vehicle Features
            </p>
            
            <div>
              {vehicleFeatures?.data?.data && (
                <FormField
                  control={form.control}
                  name="vehicle_features"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                        {vehicleFeatures.data.data.map((item: VehicleFeatureItem) => (
                          <FormControl key={item.id}>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={item.id}
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={() => {
                                  const updatedFeatures = field.value?.includes(item.id)
                                    ? field.value.filter((id: string) => id !== item.id)
                                    : [...(field.value || []), item.id];
                                  field.onChange(updatedFeatures);
                                }}
                              />
                              <FormLabel 
                                htmlFor={item.id}
                                className="cursor-pointer"
                              >
                                {item.name}
                              </FormLabel>
                            </div>
                          </FormControl>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
          
          {/* Equipped With Features Section (Bottom) */}
          {loadingEquippedWith && (
            <div className="flex justify-center py-4">Loading features...</div>
          )}
          
          {equippedWith && ['Camper', 'Caravan', 'Food Truck'].includes(selectedSubCategory || '') ? (
            <div className="py-3 pb-5">
              <p className="text-heading-6 font-extrabold mb-4 uppercase text-black/80">
                {selectedSubCategory} Equipment
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedSubCategory === 'Camper' && camperCheckboxes.map((input) => (
                  <DynamicFormFields
                    key={input.equipment_type}
                    title={input.title}
                    fields={input.items}
                    equipment_type={input.equipment_type}
                  />
                ))}
                
                {selectedSubCategory === 'Caravan' && caravanCheckboxes.map((input) => (
                  <DynamicFormFields
                    key={input.equipment_type}
                    title={input.title}
                    fields={input.items}
                    equipment_type={input.equipment_type}
                  />
                ))}
                
                {selectedSubCategory === 'Food Truck' && foodTruckCheckboxes.map((input) => (
                  <DynamicFormFields
                    key={input.equipment_type}
                    title={input.title}
                    fields={input.items}
                    equipment_type={input.equipment_type}
                  />
                ))}
              </div>
            </div>
          ) : null}
                   
          <div className="mt-6">
            <MultistepFormButtons
              currentStep={2}
              totalSteps={6}
              isSubmitting={isSubmitting}
              onBackClick={() => {
                setCurrentStep(1);
              }}
              onContinueClick={form.handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
