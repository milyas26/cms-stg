import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import { SearchRepository } from "../interfaces/SearchRepository";
import { Search } from "../entities/Search";

export class SearchApiRepository implements SearchRepository {
  async getSearch(keyword: string): Promise<Search> {
    const response = await msapGuardedAccess.get(`/search?keyword=${keyword}`);
    return response.data.data;
  }
}
