"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/providers/ModalContext";
import { Button } from "@/components/ui/button";
import { useVehicleListingStore } from "../vehicleListingstore";
import { format } from "date-fns";
import {  ChevronLeft, ChevronRight } from "lucide-react";
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

const calendarStyles = {
  root: "px-1 py-6 bg-[#FAFAFA] h-[21.875rem] max-w-[23.4375rem] flex  flex-col gap-5 rounded-3xl items-center" ,
  months: "relative w-[100%] h-full flex flex-col justify-between",
  month_grid: "w-[90%]",
  weekday: "text-[#9B9D9F] text-[14px] capitalize pb-3 font-normal",
  caption_label: "hidden",
  selected: " border-[#F8C421] ",
  month:
    "w-full text-center mx-auto flex justify-center items-center flex-col",
  day: "size-10 font-normal aria-selected:opacity-100 m-1 relative z-20 text-[14px] hover:bg-black/10 hover:rounded-full",
  day_button: "size-10 relative z-20",
  outside: "opacity-50 text-black/20",
};

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
  const [month, setMonth] = useState(new Date());

  const form = useForm<FormValues>({
    resolver: zodResolver(UnavailabilityFormSchema),
    defaultValues: {
      from: undefined,
      to: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    const blockedPeriods = store.formFourValue?.blocked_period || [];
    
    const newPeriod = {
      from: format(data.from, 'yyyy/MM/dd'),
      to: format(data.to, 'yyyy/MM/dd'),
    };
    
    store.setFormFourValue({
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
                <FormLabel className="text-black/80">From</FormLabel>
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
                          <span className="text-black/80 w-full">{format(field.value, "PPP")}</span>
                        ) : (
                          <span className="text-black/80 w-full">Pick a start date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="custom-calendar-wrapper">
                      <Calendar
                              onMonthChange={setMonth}
                              components={{
                                Nav: () => {
                                  return (
                                    <div className="flex justify-between items-center px-4">
                                      <button
                                        className="nav-button"
                                        onClick={() =>
                                          setMonth(new Date(month.getFullYear(), month.getMonth() - 1))
                                        }>
                                        <ChevronLeft />
                                      </button>
                                      <span className="body-2 font-medium text-black/80">
                                        {format(month, "MMMM yyyy")}
                                      </span>
                                      <button
                                        className="nav-button"
                                        onClick={() =>
                                          setMonth(new Date(month.getFullYear(), month.getMonth() + 1))
                                        }>
                                        <ChevronRight />
                                      </button>
                                    </div>
                                  );
                                },
                              }}
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
                          <span className="text-black/80 w-full">Pick an end date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="custom-calendar-wrapper">
                      <Calendar
                        onMonthChange={setMonth}
                        components={{
                          Nav: () => {
                            return (
                              <div className="flex justify-between items-center px-4">
                                <button
                                  className="nav-button"
                                  onClick={() =>
                                    setMonth(new Date(month.getFullYear(), month.getMonth() - 1))
                                  }>
                                  <ChevronLeft />
                                </button>
                                <span className="body-2 font-medium text-black/80">
                                  {format(month, "MMMM yyyy")}
                                </span>
                                <button
                                  className="nav-button"
                                  onClick={() =>
                                    setMonth(new Date(month.getFullYear(), month.getMonth() + 1))
                                  }>
                                  <ChevronRight />
                                </button>
                              </div>
                            );
                          },
                        }}
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

