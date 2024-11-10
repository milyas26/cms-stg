import { User } from "../entities/User";

export interface AuthRepository {
  login(payload: LoginPayload): Promise<User>;
}
