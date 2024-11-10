import React from "react";
import { BannerApiRepository } from "../domain/repositories/BannerApiRepository";
import { useBannerStore } from "@/stores/bannerStore";

const bannerRepository = new BannerApiRepository();
const useBanner = () => {
  const [loading, setLoading] = React.useState(false);
  const { setBanners } = useBannerStore();
  const initialFetch = React.useRef({
    bannerList: false,
  });

  const getAllBanners = async () => {
    if (!initialFetch.current.bannerList) {
      setLoading(true);
      initialFetch.current.bannerList = true;
      try {
        const banners = await bannerRepository.getBanners();
        setBanners(banners);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    getAllBanners,
  };
};

export default useBanner;
