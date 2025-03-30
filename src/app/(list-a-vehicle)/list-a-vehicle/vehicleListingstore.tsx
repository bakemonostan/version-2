import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ListAVehicleStore {
  name: string;
  setName: (name: string) => void;
}

export const useVehicleListingStore = create<ListAVehicleStore>()(
  persist(
    (set) => ({
      name: "",
      setName: (name: string) => set({ name }),
    }),
    {
      name: "list-a-vehicle",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
