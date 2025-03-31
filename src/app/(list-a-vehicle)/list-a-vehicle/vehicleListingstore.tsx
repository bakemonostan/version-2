import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AddressData } from "./utils/addressUtils";

interface ListAVehicleStore {
  name: string;
  toggleMap: boolean;
  postal_code: string;
  address: AddressData;
  setName: (name: string) => void;
  setPostalCode: (postal_code: string) => void;
  setAddress: (address: AddressData) => void;
  setToggleMap: (toggleMap: boolean) => void;
  resetStore: () => void;
}

export const useVehicleListingStore = create<ListAVehicleStore>()(
  persist(
    (set) => ({
      name: "",
      postal_code: "",
      address: {
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      },
      toggleMap: false,
      setName: (name: string) => set({ name }),
      setPostalCode: (postal_code: string) => set({ postal_code }),
      setAddress: (address: AddressData) => set({ address }),
        setToggleMap: (toggleMap: boolean) => set({ toggleMap }),
      resetStore: () => set({
        name: "",
        postal_code: "",
        address: {
          street: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
        },
        toggleMap: false,
      }),
    }),
    {
      name: "list-a-vehicle",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
