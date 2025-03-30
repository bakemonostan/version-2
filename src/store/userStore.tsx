import { UserData } from "@/types/dashboard";
import { create } from "zustand";

interface UserStore {
  user: UserData | null;
  setUser: (user: UserData) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: UserData) => set({ user }),
}));
