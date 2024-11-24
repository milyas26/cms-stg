import { create } from "zustand";
import { AdminUser } from "@/features/userManagement/domain/entities/AdminUser";

interface UserManagementState {
  userAdmin: AdminUser[];
  setUserAdmin: (userAdmin: AdminUser[]) => void;
}

export const useUserManagementStore = create<UserManagementState>((set) => ({
  userAdmin: [],
  setUserAdmin: (userAdmin: AdminUser[]) => set({ userAdmin }),
}));
