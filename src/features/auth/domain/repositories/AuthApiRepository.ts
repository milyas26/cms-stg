import msUserGuardedClient from "@/interceptors/msUser/msUserGuardedAccess";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebaseConfig";
import { setRefreshToken, setToken } from "@/utils/authUtils";
import msUserPublicAPI from "@/interceptors/msUser/msUserPublicAccess";
import { setLocalStorage } from "@/utils/commonUtils";
import { AuthRepository } from "../interfaces/AuthRepository";
import { FirebaseUser } from "../entities/FirebaseUser";
import { User } from "../entities/User";

export class AuthApiRepository implements AuthRepository {
  async loginSocial(
    payload: FirebaseUser
  ): Promise<{ token: string; refreshToken: string }> {
    const response = await msUserPublicAPI.post("/users/social-login", payload);

    const { token, refreshToken } = response.data.data;
    setToken(token);
    setRefreshToken(refreshToken);

    return response.data;
  }

  async profileUser(): Promise<User> {
    const response = await msUserGuardedClient.get("/user/detail/me");
    setLocalStorage("user", response.data.data);
    return response.data.data;
  }

  async loginWithGoogle(): Promise<FirebaseUser> {
    googleProvider.setCustomParameters({ prompt: "select_account" });
    const userCredential = await signInWithPopup(auth, googleProvider);

    const user = userCredential.user;
    const payload = new FirebaseUser(
      user.uid,
      await user.getIdToken(),
      user.displayName as string,
      user.photoURL as string,
      user.email as string
    );

    await this.loginSocial(payload);
    await this.profileUser();

    return payload;
  }

  async updateUser(payload: User): Promise<User> {
    const response = await msUserGuardedClient.patch("/user/update", payload);

    return response.data.data;
  }

  async refreshAccessToken(payload: any) {
    const response: any = await msUserGuardedClient.post(
      "/auth/refresh",
      payload
    );
    return response.data;
  }
}
