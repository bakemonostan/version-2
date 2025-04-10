"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/providers/ModalContext";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";

export default function BookingCompleteModal() {
  const { modalParams, closeModal } = useModal();
  const router = useRouter();
  const { resetBooking } = useBookingStore();
  
  const booking_id = modalParams?.["booking-complete-modal"]?.booking_id;
  const image = modalParams?.["booking-complete-modal"]?.image;

  const handleManageBookings = () => {
    router.push("/dashboard/bookings");
    resetBooking();
    closeModal();
  };

  const handleClose = () => {
    resetBooking();
  };

  return (
    <Modal
      id="booking-complete-modal"
      title="Booking Complete"
      className="modal-md"
      onClose={handleClose}>
      <div className="space-y-6">
        <div className="w-full border rounded-md">
          {image && <img src={image} alt="" className="w-full object-cover aspect-[2/1] rounded-md" />}
        </div>
        
        <div className="text-sm">
          <p className="text-2xl font-bold">We have received your booking!</p>
          <p>
            Booking ID <span className="font-bold">#{booking_id}</span>
          </p>
        </div>
        
        <div className="space-y-1">
          <p className="font-bold">Payment</p>
          <p>
            Amount will be automatically charged to your payment method. Ensure you have enough in your
            account to ensure your booking is confirmed.
          </p>
        </div>
        
        <div className="space-y-1">
          <p className="font-bold">Pick up instructions</p>
          <p>
            Pick up will be at my home, which I or my wife will come out to meet you to hand over keys. I
            will check drivers license, and match it up to the person who booked. I will also take a
            picture of your Drivers License.
          </p>
        </div>
        
        <div className="flex justify-start w-full">
          <Button onClick={handleManageBookings} className="w-max" variant="outline">
            Manage bookings
          </Button>
        </div>
      </div>
    </Modal>
  );
} 
