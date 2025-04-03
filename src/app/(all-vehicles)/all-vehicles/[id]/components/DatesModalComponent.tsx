"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/providers/ModalContext";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, differenceInDays } from "date-fns";
import { useBookingStore } from "@/store/bookingStore";
import { toast } from "sonner";
import { DatePicker } from "./DatePicker";

// Form schema for date validation
const DateFormSchema = z
  .object({
    from: z.date({
      required_error: "Start date is required",
    }),
    to: z.date({
      required_error: "End date is required",
    }),
  })
  .refine((data) => data.from < data.to, {
    message: "End date must be after start date",
    path: ["to"],
  });

type DateFormValues = z.infer<typeof DateFormSchema>;

export default function DatesModalComponent() {
  const { closeModal, modalParams } = useModal();
  const setSearchParams = useBookingStore((state) => state.setSearchParams);

  // Extract the parameters from modalParams
  const params = modalParams?.["dates-modal"];
  const unavailability = params?.unavailability || [];
  const minDays = params?.minDays || 1;
  const maxDays = params?.maxDays || 30;
  const advanceNotice = params?.advanceNotice || 1;

  const form = useForm<DateFormValues>({
    resolver: zodResolver(DateFormSchema),
    defaultValues: {
      from: undefined,
      to: undefined,
    },
  });

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const onSubmit = (values: DateFormValues) => {
    const startDate = new Date(values.from);
    const endDate = new Date(values.to);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      toast.error("Invalid Dates", {
        description: "Please select valid dates",
      });
      return;
    }
    const durationInDays = differenceInDays(endDate, startDate);

    if (durationInDays < minDays) {
      toast.error("Invalid Duration", {
        description: `Minimum booking duration is ${minDays} days`,
      });
      return;
    }
    if (durationInDays > maxDays) {
      toast.error("Invalid Duration", {
        description: `Maximum booking duration is ${maxDays} days`,
      });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysUntilBooking = differenceInDays(startDate, today);

    if (daysUntilBooking < advanceNotice) {
      toast.error("Invalid Start Date", {
        description: `Bookings must be made at least ${advanceNotice} day(s) in advance`,
      });
      return;
    }

    const isOverlapping = unavailability.some((period) => {
      try {
        const unavailableStart = new Date(period.from);
        const unavailableEnd = new Date(period.to);

        if (
          isNaN(unavailableStart.getTime()) ||
          isNaN(unavailableEnd.getTime())
        ) {
          console.error("Invalid unavailable period:", period);
          return false;
        }

        unavailableStart.setHours(0, 0, 0, 0);
        unavailableEnd.setHours(0, 0, 0, 0);
        const compareStartDate = new Date(startDate).setHours(0, 0, 0, 0);
        const compareEndDate = new Date(endDate).setHours(0, 0, 0, 0);

        const startInUnavailable =
          compareStartDate >= unavailableStart.getTime() &&
          compareStartDate <= unavailableEnd.getTime();
        const endInUnavailable =
          compareEndDate >= unavailableStart.getTime() &&
          compareEndDate <= unavailableEnd.getTime();
        const spanningUnavailable =
          compareStartDate <= unavailableStart.getTime() &&
          compareEndDate >= unavailableEnd.getTime();

        return startInUnavailable || endInUnavailable || spanningUnavailable;
      } catch (error) {
        console.error("Error checking date overlap:", error);
        return false;
      }
    });

    if (isOverlapping) {
      toast.error("Date Conflict", {
        description:
          "Please pick days that are not within the unavailable period",
      });
      return;
    }

    try {
      const formattedPeriod = {
        rentalDateFrom: format(values.from, "yyyy/MM/dd"),
        rentalDateTo: format(values.to, "yyyy/MM/dd"),
      };

      setSearchParams(formattedPeriod);
      closeModal();
    } catch (error) {
      console.error("Error setting booking:", error);
      toast.error("Error", {
        description: "Failed to set booking dates",
      });
    }
  };

  const isFromDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      unavailability.some((period) => {
        const start = new Date(period.from);
        const end = new Date(period.to);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return date >= start && date <= end;
      }) || date < today
    );
  };

  const isToDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fromDate = form.getValues("from");

    if (!fromDate) return true;

    return (
      unavailability.some((period) => {
        const start = new Date(period.from);
        const end = new Date(period.to);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return date >= start && date <= end;
      }) ||
      date <= fromDate ||
      date < today
    );
  };

  return (
    <Modal
      id="dates-modal"
      title="Select Booking Dates"
      className="modal-md">
      <div className="space-y-6">
        <div>
          <p>The vehicle will be unavailable between the dates below</p>
          <ul className="space-y-2 mt-2">
            {unavailability.map((period, index) => (
              <li
                key={index}
                className="font-bold text-[#DBA806]">
                {formatDate(period.from)} - {formatDate(period.to)}
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1">
            <p>
              Maximum trip duration:{" "}
              <span className="font-bold text-[#DBA806]">{maxDays}</span> days
            </p>
            <p>
              Minimum trip duration:{" "}
              <span className="font-bold text-[#DBA806]">{minDays}</span> days
            </p>
            <p>
              Advance notice:{" "}
              <span className="font-bold text-[#DBA806]">{advanceNotice}</span>{" "}
              day
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5">
            <FormField
              control={form.control}
              name="from"
              render={() => (
                <DatePicker
                  control={form.control}
                  name="from"
                  label="From"
                  placeholder="Start date"
                  buttonClassName="h-10 p-1 border"
                  disabledDays={isFromDateDisabled}
                />
              )}
            />

            <FormField
              control={form.control}
              name="to"
              render={() => (
                <DatePicker
                  control={form.control}
                  name="to"
                  label="To"
                  placeholder="End date"
                  buttonClassName="h-10 p-1 border"
                  disabledDays={isToDateDisabled}
                />
              )}
            />

            <Button
              type="submit"
              className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
