import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import { BannerRepository } from "../interfaces/BannerRepository";
import { Banner } from "../entities/Banner";

export class BannerApiRepository implements BannerRepository {
  async getBanners(): Promise<Banner[]> {
    const response = await msapGuardedAccess.get("/banners");
    return response.data.data;
  }
}
