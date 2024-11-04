import msUserGuardedClient from "@/interceptors/msUser/msUserGuardedAccess";
import { CommonRepository } from "../interfaces/CommonRepository";

export class CommonApiRepository implements CommonRepository {
  async getGenresFiction() {
    const response = await msUserGuardedClient.get("config/artwork/genre");
    return response.data.data;
  }
  async getGenresNonFiction() {
    const response = await msUserGuardedClient.get(
      "config/artwork/genre/non-fiction"
    );
    return response.data.data;
  }
  async getAgeRestriction() {
    const response = await msUserGuardedClient.get("config/age-restriction");
    return response.data.data;
  }
  async getCategory() {
    const response = await msUserGuardedClient.get("config/artwork/category");
    return response.data.data;
  }
  async getCopyright() {
    const response = await msUserGuardedClient.get("config/artwork/copyright");
    return response.data.data;
  }
}
