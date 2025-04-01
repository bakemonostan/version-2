"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

// Global styles for the calendar
const calendarStyles = {
  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
  month: "space-y-4 w-full",
  caption: "flex justify-center pt-1 relative items-center",
  caption_label: "text-sm font-medium",
  nav: "space-x-1 flex items-center",
  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
  nav_button_previous: "absolute left-1",
  nav_button_next: "absolute right-1",
  table: "w-full border-collapse space-y-1",
  head_row: "flex w-full",
  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
  row: "flex w-full mt-2",
  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 flex-1",
  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 mx-auto",
  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  day_today: "bg-accent text-accent-foreground",
  day_outside: "text-muted-foreground opacity-50",
  day_disabled: "text-muted-foreground opacity-50",
  day_hidden: "invisible",
};

interface SingleDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  calendarClassName?: string;
  popoverContentClassName?: string;
  showFormMessage?: boolean;
}

export function SingleDatePicker<T extends FieldValues>({ 
  control, 
  name, 
  label, 
  placeholder,
  disabled,
  className,
  buttonClassName,
  calendarClassName,
  popoverContentClassName,
  showFormMessage = true
}: SingleDatePickerProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col w-full", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="outline"
                  className={cn(
                    "w-full text-left font-normal justify-start p-0",
                    !field.value && "text-muted-foreground",
                    buttonClassName
                  )}
                >
                  <div className="w-full text-left truncate">
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>{placeholder || "Select date"}</span>
                    )}
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn("w-auto min-w-[280px] p-0", popoverContentClassName)} align="start">
              <div className="p-3">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  initialFocus
                  className={calendarClassName}
                  classNames={calendarStyles}
                />
              </div>
            </PopoverContent>
          </Popover>
          {showFormMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
} 
