import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import msFile from "@/interceptors/msFile/msFileAccess";
import { BannerRepository } from "../interfaces/BannerRepository";
import { Banner } from "../entities/Banner";

export class BannerApiRepository implements BannerRepository {
  async getBanners(): Promise<Banner[]> {
    const response = await msapGuardedAccess.get("/banners");
    return response.data.data;
  }

  async uploadBanner(file: File): Promise<{ result: string }> {
    const response = await msFile.post("/private/upload/asset", file);
    return response.data;
  }
}
