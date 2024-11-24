import { Search } from "../entities/Search";

export interface SearchRepository {
  getSearch(keyword: string): Promise<Search>;
}
