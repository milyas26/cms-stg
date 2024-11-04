import { AgeRestriction } from "../entities/AgeRestriction";
import { Category } from "../entities/Category";
import { Copyright } from "../entities/Copyright";
import { Genre } from "../entities/Genre";

export interface CommonRepository {
  getCopyright(): Promise<Copyright[]>;
  getAgeRestriction(): Promise<AgeRestriction[]>;
  getCategory(): Promise<Category[]>;
  getGenresFiction(): Promise<Genre[]>;
  getGenresNonFiction(): Promise<Genre[]>;
}
