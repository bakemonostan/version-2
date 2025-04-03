import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrencyToEuros, formatDate } from "@/utils/general";
import { Vehicle } from "@/types/dashboard";
import { useBookingStore } from "@/store/bookingStore";
import { differenceInDays } from "date-fns";

interface RentalSummaryCardProps {
  data: Vehicle;
  bookings?: {
    from: Date | string;
    to: Date | string;
  } | null;
  onOpenDateModal?: () => void;
  onBookingReview?: () => void;
  onCancelProcess?: () => void;
  rentalDuration?: number;
}

const RentalSummaryCard: React.FC<RentalSummaryCardProps> = ({
  data,
  bookings: propBookings,
  onOpenDateModal = () => {},
  onBookingReview = () => {},
  onCancelProcess = () => {},
  rentalDuration: propRentalDuration = 0,
}) => {
  const storeSearchParams = useBookingStore((state) => state.searchParams);
  const setSearchParams = useBookingStore((state) => state.setSearchParams);
  const [bookings, setBookings] = useState(propBookings);
  const [rentalDuration, setRentalDuration] = useState(propRentalDuration);

  useEffect(() => {
    // If bookings are passed as props, use those
    if (propBookings) {
      setBookings(propBookings);
      setRentalDuration(propRentalDuration);
    } 
    // Otherwise check the store for dates
    else if (storeSearchParams.rentalDateFrom && storeSearchParams.rentalDateTo) {
      const fromDate = new Date(storeSearchParams.rentalDateFrom);
      const toDate = new Date(storeSearchParams.rentalDateTo);
      
      if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
        setBookings({
          from: fromDate,
          to: toDate
        });
        
        const days = differenceInDays(toDate, fromDate);
        setRentalDuration(days > 0 ? days : 0);
      }
    } else {
      // Clear local state if nothing is in the store
      setBookings(null);
      setRentalDuration(0);
    }
  }, [propBookings, propRentalDuration, storeSearchParams]);

  const handleCancelProcess = () => {
    // Clear the booking information from local state
    setBookings(null);
    setRentalDuration(0);
    
    // Clear the booking information from the store
    setSearchParams({
      ...storeSearchParams,
      rentalDateFrom: null,
      rentalDateTo: null,
    });
    
    // Call the parent's onCancelProcess callback if provided
    onCancelProcess();
  };

  return (
    <div className="py-5">
      <div className="p-px rounded-xl bg-gradient-to-r from-[#FFCB4E] to-[#AD75E2]">
        <Card className="p-3 shadow-sm hover:shadow-md rounded-xl gap-1">
          <CardTitle className="text-left">
            <p className="text-lg font-bold uppercase">Rental Summary</p>
          </CardTitle>

          {!bookings ? (
            <CardDescription className="space-y-3 text-base">
              <div className="text-black">
                <p className="py-2 font-medium">Choose rental dates</p>
                <p 
                  onClick={onOpenDateModal}
                  className="flex items-center justify-between w-full p-2 rounded-md cursor-pointer bg-black/5">
                  <span className="underline">Add dates</span>
                  <span>
                    <Pencil className="size-5" />
                  </span>
                </p>
              </div>
              <div className="pb-5 space-y-2">
                <p className="flex items-center justify-between gap-1 font-bold text-black">
                  <span>Cost per day</span>
                  <span className="text-base font-medium">
                    {formatCurrencyToEuros(
                      Number(data?.rental_rate.daily_rate)
                    )}
                  </span>
                </p>
                <p className="flex items-center justify-between gap-1 font-bold text-black">
                  <span>Cleaning fee</span>
                  <span className="text-base font-medium">-</span>
                </p>
              </div>

              <div className="space-y-2 text-black">
                <p className="text-lg font-bold">Free Cancellation</p>
                <p className="text-base text-black/70">
                  Full refund if you cancel before -
                </p>
                <p className="text-lg font-bold">
                  Read more about cancelations
                </p>
              </div>
            </CardDescription>
          ) : (
            <CardDescription className="text-lg">
              <div className="text-black">
                <p className="py-2 font-medium">Chosen rental dates</p>
                <p
                  onClick={onOpenDateModal}
                  className="flex items-center justify-between w-full p-2 rounded-md cursor-pointer bg-black/5">
                  <span>
                    {formatDate(bookings?.from)} - {formatDate(bookings?.to)}
                  </span>
                  <span>
                    <Pencil className="size-5" />
                  </span>
                </p>
              </div>
              <div className="pb-5 space-y-2">
                <p className="flex items-center justify-between gap-1 font-bold text-black">
                  <span>Rental fee ({rentalDuration} days)</span>
                  <span className="text-base font-medium">
                    {formatCurrencyToEuros(
                      Number(data?.rental_rate.daily_rate) * rentalDuration
                    )}
                  </span>
                </p>
                <p className="flex items-center justify-between gap-1 font-bold text-black">
                  <span>Cleaning fee</span>
                  <span className="text-base font-medium">
                    {formatCurrencyToEuros(Number(data?.rental_rate.cleaning_fee || 0))}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between p-2 py-1 font-bold text-black rounded-md bg-black/5">
                <span>Total</span>
                <span>
                  {formatCurrencyToEuros(
                    (Number(data?.rental_rate.daily_rate) * rentalDuration) + 
                    Number(data?.rental_rate.cleaning_fee || 0)
                  )}
                </span>
              </div>

              <div className="space-y-2 text-black mt-3">
                <p className="text-lg font-bold">Free Cancellation</p>
                <p className="text-base text-black/70">
                  Full refund if you cancel before -
                </p>
                <p className="text-lg font-bold">
                  Read more about cancelations
                </p>
              </div>
            </CardDescription>
          )}

          <div className="flex flex-col gap-2 py-1 text-black">
            <Button
              className="font-bold rounded-full disabled:bg-gray-500"
              disabled={!bookings}
              onClick={onBookingReview}>
              Continue with booking
            </Button>
            {bookings && (
              <Button
                onClick={handleCancelProcess}
                className="font-bold rounded-full disabled:bg-gray-500"
                variant="outline">
                Cancel Process
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RentalSummaryCard;
