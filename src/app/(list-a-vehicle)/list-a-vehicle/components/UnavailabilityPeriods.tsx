"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/providers/ModalContext";
import { Button } from "@/components/ui/button";
import { useVehicleListingStore } from "../vehicleListingstore";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Custom styles for the calendar
const calendarStyles = {
  calendar: "p-3",
  caption: "flex justify-center pt-2 relative items-center mb-4",
  day: "h-8 w-8 p-0 font-normal bg-transparent hover:bg-black/5 focus:bg-black/5",
  day_selected: "!bg-primary !text-primary-foreground hover:!bg-primary/90 focus:!bg-primary/90",
  day_today: "!bg-transparent border border-primary/30 font-semibold",
  day_outside: "text-muted-foreground opacity-50 bg-transparent",
  day_disabled: "text-muted-foreground opacity-30 bg-transparent",
  table: "w-full border-collapse",
  head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] bg-transparent",
  cell: "relative p-0 text-center text-sm bg-transparent",
  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
}

const UnavailabilityFormSchema = z.object({
  from: z.date({
    required_error: "Start date is required.",
  }),
  to: z.date({
    required_error: "End date is required.",
  }),
}).refine(
  (data) => data.from < data.to,
  {
    message: "End date must be after start date.",
    path: ["to"],
  }
);

type FormValues = z.infer<typeof UnavailabilityFormSchema>;

export default function UnavailabilityPeriods() {
  const { closeModal } = useModal();
  const store = useVehicleListingStore();
  const [fromPopoverOpen, setFromPopoverOpen] = useState(false);
  const [toPopoverOpen, setToPopoverOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(UnavailabilityFormSchema),
    defaultValues: {
      from: undefined,
      to: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    const formValues = store.formFourValue || {};
    const blockedPeriods = formValues.blocked_period || [];
    
    const newPeriod = {
      from: format(data.from, 'yyyy/MM/dd'),
      to: format(data.to, 'yyyy/MM/dd'),
    };
    
    store.setFormFourValue({
      ...formValues,
      blocked_period: [...blockedPeriods, newPeriod],
    });
    
    closeModal();
  };

  return (
    <Modal
      id="unavailability-modal"
      title="Add Unavailability Period"
      className="modal-md"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
                <Popover open={fromPopoverOpen} onOpenChange={setFromPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a start date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="custom-calendar-wrapper">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          // Close the popover after selection
                          setFromPopoverOpen(false);
                        }}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        classNames={calendarStyles}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To</FormLabel>
                <Popover open={toPopoverOpen} onOpenChange={setToPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick an end date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="custom-calendar-wrapper">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          // Close the popover after selection
                          setToPopoverOpen(false);
                        }}
                        disabled={(date) => {
                          const fromDate = form.getValues("from");
                          return (
                            date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                            (fromDate ? date <= fromDate : false)
                          );
                        }}
                        initialFocus
                        classNames={calendarStyles}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4">
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      
      <style jsx global>{`
        /* Override Mantine styles for the calendar */
        .custom-calendar-wrapper .rdp {
          margin: 0;
        }
        
        .custom-calendar-wrapper .rdp-day {
          background-color: transparent !important;
          width: 32px;
          height: 32px;
          font-size: 0.875rem;
          border-radius: 4px;
        }
        
        .custom-calendar-wrapper .rdp-day:hover:not([disabled]) {
          background-color: rgba(0, 0, 0, 0.05) !important;
        }
        
        .custom-calendar-wrapper .rdp-day_selected {
          background-color: black !important;
          color: white !important;
        }
        
        .custom-calendar-wrapper .rdp-day_today {
          border: 1px solid rgba(0, 0, 0, 0.3);
          font-weight: 600;
        }
        
        .custom-calendar-wrapper .rdp-day_disabled {
          opacity: 0.3;
        }
        
        .custom-calendar-wrapper .rdp-head_cell {
          font-weight: 500;
          font-size: 0.75rem;
          color: rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </Modal>
  );
}

