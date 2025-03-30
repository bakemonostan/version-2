import { create } from 'zustand';

interface BookingStore {
  isCancelModalOpen: boolean;
  currentBookingId: string | null;
  toggleCancelModal: () => void;
  setCancelBooking: (id: string) => void;
  resetCancelBooking: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  isCancelModalOpen: false,
  currentBookingId: null,
  toggleCancelModal: () => set((state) => ({ isCancelModalOpen: !state.isCancelModalOpen })),
  setCancelBooking: (id: string) => set({ currentBookingId: id, isCancelModalOpen: true }),
  resetCancelBooking: () => set({ isCancelModalOpen: false, currentBookingId: null }),
})); 
