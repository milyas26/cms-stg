import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import msFile from "@/interceptors/msFile/msFileAccess";
import { BannerRepository } from "../interfaces/BannerRepository";
import { Banner } from "../entities/Banner";
import { IRequestAddBanner } from "../../data/interfaces/banner.interfaces";

export class BannerApiRepository implements BannerRepository {
  async getBanners(): Promise<Banner[]> {
    const response = await msapGuardedAccess.get("/banners");
    return response.data.data;
  }

  async uploadBanner(file: File): Promise<{ result: string }> {
    const response = await msFile.post(
      "/private/upload/asset",
      {
        file,
        type: "BANNER",
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  async createBanner(payload: IRequestAddBanner): Promise<Banner> {
    const response = await msapGuardedAccess.post("/banner", payload);
    return response.data.data;
  }

  async deleteBanner(id: string): Promise<Banner> {
    const response = await msapGuardedAccess.delete(`/banner/${id}`);
    return response.data.data;
  }

  async deleteFileBanner(path: string): Promise<{ code: string }> {
    const response = await msFile.delete(`/private/upload/asset`, {
      data: {
        internal_path: path,
      },
    });
    return response.data;
  }
}
