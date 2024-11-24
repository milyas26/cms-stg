import { IRequestAddBanner } from "../../data/interfaces/banner.interfaces";
import { Banner } from "../entities/Banner";

export interface BannerRepository {
  getBanners(): Promise<Banner[]>;
  uploadBanner(file: File): Promise<{ result: string }>;
  createBanner(payload: IRequestAddBanner): Promise<Banner>;
  deleteBanner(id: string): Promise<Banner>;
  deleteFileBanner(path: string): Promise<{ code: string }>;
}
