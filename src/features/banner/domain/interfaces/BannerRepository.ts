import { Banner } from "../entities/Banner";

export interface BannerRepository {
  getBanners(): Promise<Banner[]>;
}
