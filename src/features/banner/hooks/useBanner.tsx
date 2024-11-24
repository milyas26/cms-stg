import React from "react";
import { BannerApiRepository } from "../domain/repositories/BannerApiRepository";
import { useBannerStore } from "@/stores/bannerStore";
import { BannerTypeEnum } from "../data/enums/banner.enum";
import urlHelper from "@/helper/urlHelper";
import { IRequestAddBanner } from "../data/interfaces/banner.interfaces";
import { notifications } from "@mantine/notifications";
import { Banner } from "../domain/entities/Banner";

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

  const getExtra = (
    selectTypeTarget: BannerTypeEnum,
    comboValue: any,
    values: any
  ) => {
    let extra: any = [];
    switch (selectTypeTarget) {
      case BannerTypeEnum.BANNER_POST:
        extra = [
          {
            Key: "postId",
            Value: comboValue._id,
          },
          {
            Key: "postTitle",
            Value: comboValue.title,
          },
          {
            Key: "username",
            Value: comboValue.author.username,
          },
        ];
        break;
      case BannerTypeEnum.BANNER_USER:
        extra = [
          {
            Key: "userId",
            Value: comboValue.id,
          },
          {
            Key: "username",
            Value: comboValue.username,
          },
          {
            Key: "fullName",
            Value: comboValue.fullName,
          },
        ];
        break;
      case BannerTypeEnum.BANNER_EXTERNAL_LINK:
        extra = [
          {
            Key: "url",
            Value: values.targetUrl,
          },
        ];
        break;
    }

    return extra;
  };

  const getTargetUrl = (
    selectTypeTarget: BannerTypeEnum,
    comboValue: any,
    values: any
  ) => {
    switch (selectTypeTarget) {
      case BannerTypeEnum.BANNER_POST:
        return urlHelper.generatePostUrl(comboValue._id, comboValue.title);
      case BannerTypeEnum.BANNER_EXTERNAL_LINK:
        return values.targetUrl;
      case BannerTypeEnum.BANNER_USER:
        return `/@${comboValue.username}`;
      default:
        return " ";
    }
  };

  const handleUploadBanner = async (file: File) => {
    try {
      setLoading(true);
      const response = await bannerRepository.uploadBanner(file);
      return response;
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error?.response?.data?.message || "Upload banner failed",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBanner = async (
    payload: IRequestAddBanner,
    closeModal: () => void
  ) => {
    try {
      setLoading(true);
      const response = await bannerRepository.createBanner(payload);
      if (response) {
        notifications.show({
          title: "Success",
          message: "Banner created successfully",
          color: "teal",
        });
        getAllBanners();
        closeModal();
      }
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBanner = async (
    banner: Banner,
    closeConfirm: () => void
  ) => {
    try {
      setLoading(true);
      const response = await bannerRepository.deleteBanner(banner.id);
      await bannerRepository.deleteFileBanner(banner.bannerUrl);
      if (response) {
        notifications.show({
          title: "Success",
          message: "Banner deleted successfully",
          color: "teal",
        });
        getAllBanners();
        closeConfirm();
      }
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getAllBanners,
    getExtra,
    getTargetUrl,
    handleUploadBanner,
    handleCreateBanner,
    handleDeleteBanner,
  };
};

export default useBanner;
