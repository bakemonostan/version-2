import { create } from 'zustand';
import { VehicleData } from '@/app/(list-a-vehicle)/list-a-vehicle/types';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BookingStore {
  vehicleData: VehicleData | null;
  setVehicleData: (data: VehicleData) => void;
}

export const useBookingStore = create<BookingStore>()(
  persist((set) => ({
    vehicleData: null,
    setVehicleData: (data: VehicleData) => set({ vehicleData: data }),
  }), {
    name: 'vehicle-listing-data',
    storage: createJSONStorage(() => localStorage),
  })
); 
