import { FirebaseUser } from "../entities/FirebaseUser";
import { User } from "../entities/User";

export interface AuthRepository {
  loginWithGoogle(): Promise<FirebaseUser>;
  profileUser(): Promise<User>;
  updateUser(payload: User): Promise<User>;
}
