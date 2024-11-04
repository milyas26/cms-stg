import { FirebaseUser } from "../domain/entities/FirebaseUser";
import { User } from "../domain/entities/User";
import { AuthRepository } from "../domain/interfaces/AuthRepository";

export class LoginWithGoogle {
  constructor(private readonly authRepository: AuthRepository) {}

  async run(): Promise<FirebaseUser> {
    return this.authRepository.loginWithGoogle();
  }
}

export class GetProfile {
  constructor(private readonly authRepository: AuthRepository) {}

  async run(): Promise<User> {
    return this.authRepository.profileUser();
  }
}

export class UpdateUserProfile {
  constructor(private readonly authRepository: AuthRepository) {}

  async run(payload: User): Promise<User> {
    return this.authRepository.updateUser(payload);
  }
}
