import { create } from "zustand";
import { User } from "../features/auth/domain/entities/User";
import { Banner } from "@/features/banner/domain/entities/Banner";

interface BannerState {
  banners: Banner[];
  setBanners: (banners: Banner[]) => void;
}

export const useBannerStore = create<BannerState>((set) => ({
  banners: [],
  setBanners: (banners: Banner[]) => set({ banners }),
}));
