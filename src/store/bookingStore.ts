import { create } from 'zustand';
import { VehicleData } from '@/app/(list-a-vehicle)/list-a-vehicle/types';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SearchParams {
  categoryId?: string | null;
  subCategoryId?: string | null;
  rentalDateFrom?: string | null;
  rentalDateTo?: string | null;
}

interface BookingStore {
  vehicleData: VehicleData | null;
  searchParams: SearchParams;
  setVehicleData: (data: VehicleData) => void;
  setSearchParams: (params: SearchParams) => void;
}

export const useBookingStore = create<BookingStore>()(
  persist((set) => ({
    vehicleData: null,
    searchParams: {
      categoryId: null,
      subCategoryId: null,
      rentalDateFrom: null,
      rentalDateTo: null,
    },
    setVehicleData: (data: VehicleData) => set({ vehicleData: data }),
    setSearchParams: (params: SearchParams) => set({ searchParams: params }),
  }), {
    name: 'vehicle-listing-data',
    storage: createJSONStorage(() => localStorage),
  })
); 
