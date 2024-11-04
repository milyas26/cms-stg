import { AgeRestriction } from "../domain/entities/AgeRestriction";
import { Category } from "../domain/entities/Category";
import { Copyright } from "../domain/entities/Copyright";
import { Genre } from "../domain/entities/Genre";
import { CommonRepository } from "../domain/interfaces/CommonRepository";

export class GetCopyright {
  constructor(private readonly commonRepository: CommonRepository) {}

  async run(): Promise<Copyright[]> {
    return this.commonRepository.getCopyright();
  }
}

export class GetAgeRestriction {
  constructor(private readonly commonRepository: CommonRepository) {}

  async run(): Promise<AgeRestriction[]> {
    return this.commonRepository.getAgeRestriction();
  }
}

export class GetCategory {
  constructor(private readonly commonRepository: CommonRepository) {}

  async run(): Promise<Category[]> {
    return this.commonRepository.getCategory();
  }
}

export class GetGenresFiction {
  constructor(private readonly commonRepository: CommonRepository) {}

  async run(): Promise<Genre[]> {
    return this.commonRepository.getGenresFiction();
  }
}

export class GetGenresNonFiction {
  constructor(private readonly commonRepository: CommonRepository) {}

  async run(): Promise<Genre[]> {
    return this.commonRepository.getGenresNonFiction();
  }
}
