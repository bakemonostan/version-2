"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";

interface CancelBookingProps {
  id: string;
}

export default function CancelBooking({ id }: CancelBookingProps) {
  const { isCancelModalOpen, toggleCancelModal, resetCancelBooking } = useBookingStore();

  const handleCancel = async () => {
    try {
      // Add the actual cancel booking API call here
      console.log("Cancelling booking: ", id);
      resetCancelBooking();
      // Show success toast or redirect
    } catch (error) {
      console.error("Error cancelling booking", error);
      // Show error toast
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      resetCancelBooking();
    };
  }, [resetCancelBooking]);

  return (
    <Dialog open={isCancelModalOpen} onOpenChange={toggleCancelModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>Cancel Booking</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 rounded-full"
            onClick={resetCancelBooking}
          >
            <X size={16} />
          </Button>
        </DialogHeader>
        <DialogDescription className="py-4">
          Are you sure you want to cancel this booking? This action cannot be undone.
        </DialogDescription>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={resetCancelBooking}>
            No, keep it
          </Button>
          <Button variant="default" onClick={handleCancel} className="bg-red-600 hover:bg-red-700">
            Yes, cancel booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
