import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import msapPublic from "@/interceptors/msap/msapPublicAccess";
import { AuthRepository } from "../interfaces/AuthRepository";
import { User } from "../entities/User";
import { setToken } from "@/utils/authUtils";

export class AuthApiRepository implements AuthRepository {
  async login(payload: LoginPayload): Promise<User> {
    const response = await msapPublic.post("/admin/user/login", payload);
    setToken(response.data.data);
    return response.data.data;
  }
}
