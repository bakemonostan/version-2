import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox, Slider, Switch, Textarea } from "@mantine/core";
import {
  CustomFormCheckboxProps,
  CustomFormFieldProps,
  CustomFormRadioProps,
  CustomFormSelectProps,
} from "./types";
import { FieldValues, Control, Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { PinInput } from "@mantine/core";
import classes from "../../app/pin-input.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type CustomFormSliderProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
};

export function TextInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  isTextArea = false,
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            {isTextArea ? (
              <Textarea
                {...field}
                placeholder={placeholder}
              />
            ) : (
              <Input
                className="shadow-none active:shadow-none focus:shadow-none rounded-sm"
                {...field}
                placeholder={placeholder}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectInput<T extends FieldValues = FieldValues>({
  name,
  control,
  items,
  labelText,
  placeholder,
  ...props
}: CustomFormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labelText}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={props.disabled}>
            <FormControl>
              <SelectTrigger className="w-full border-0 pl-0">
                <SelectValue placeholder={placeholder}>
                  {field.value}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem
                  key={item}
                  value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CheckboxInput<T extends FieldValues = FieldValues>({
  name,
  control,
  labelText,
}: CustomFormCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText}</FormLabel>
          <FormControl>
            <Checkbox {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function RadioInput<T extends FieldValues = FieldValues>({
  name,
  control,
  labelText,
  options,
}: CustomFormRadioProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}>
              {options.map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={option}
                  />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// switch case for the form fields
export function SwitchInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <Switch
              {...field}
              color="yellow.4"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// slider case for the form fields
export function SliderInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
}: CustomFormSliderProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <Slider
                value={field.value || defaultValue}
                onChange={field.onChange}
                min={min}
                max={max}
                step={step}
                color="yellow.4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{field.value || defaultValue}</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
interface PinInputComponentProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
}
export function PinInputComponent<T extends FieldValues = FieldValues>({
  name,
  control,
}: PinInputComponentProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <PinInput
              classNames={{
                pinInput: classes.pinInput,
              }}
              length={4}
              placeholder="*"
              {...field}
              size="xl"
              mx="auto"
              type="number"
              oneTimeCode
            />
          </FormControl>
          <FormMessage className="text-red-500 text-sm text-center font-medium" />
        </FormItem>
      )}
    />
  );
}
