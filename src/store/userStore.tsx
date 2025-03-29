// {
//     "data": {
//       "id": "string",
//       "legal_name": "string",
//       "address": "string",
//       "email": "string",
//       "telephone": "string",
//       "bio": "string",
//       "picture": "string",
//       "reviews": [
//         "string"
//       ],
//       "renter_identification": true,
//       "bank_verification": true
//     }
//   }





import { create } from "zustand";

interface User {
  id: string;
  legal_name: string;
  address: string;
  email: string;
  telephone: string;
  bio: string;
  picture: string;
  reviews: string[];
  renter_identification: boolean;
  bank_verification: boolean;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
