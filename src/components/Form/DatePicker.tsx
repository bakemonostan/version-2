"use client";
import { DatePickerInput } from "@mantine/dates";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import classes from "./styles/RangeDatePicker.module.css";
import { Control, FieldValues, Path } from "react-hook-form";

type CustomDatepickerProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  placeholder?: string;
};

export default function RangeDatePicker<T extends FieldValues>({
  control,
  name,
  label = "Date Range",
  placeholder,
}: CustomDatepickerProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DatePickerInput
              label={label}
              classNames={classes}
              variant="unstyled"
              type="range"
              valueFormat="YYYY MMM DD"
              value={[field.value.from || null, field.value.to || null]}
              onChange={(value) => {
                field.onChange({ from: value[0], to: value[1] });
              }}
              placeholder={
                placeholder || "Rental dates Start -  Rental date end"
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
