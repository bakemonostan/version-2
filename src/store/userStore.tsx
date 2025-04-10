import { DashboardData } from "@/contents/data";
import { UserData } from "@/types/dashboard";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: DashboardData | null;
  details: UserData | null;
  setUser: (user: DashboardData | null) => void;
  setDetails: (details: UserData | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      details: null,
      setUser: (user: DashboardData | null) => set({ user }),
      setDetails: (details: UserData | null) => set({ details }),
    }),
    {
      name: "user-store",
    }
  )
);
