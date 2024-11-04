import { useAuthStore } from "@/stores/authStore";
import {
  GetProfile,
  LoginWithGoogle,
  UpdateUserProfile,
} from "../application/loginUser";
import { clearAuth } from "@/utils/authUtils";
import { useState } from "react";
import { AuthApiRepository } from "../domain/repositories/AuthApiRepository";
import { User } from "../domain/entities/User";
import { notifications } from "@mantine/notifications";

const authRepository = new AuthApiRepository();
const loginWithGoogle = new LoginWithGoogle(authRepository);
const getProfile = new GetProfile(authRepository);
const updateUserProfile = new UpdateUserProfile(authRepository);

export const useAuth = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const loginGoogle = async () => {
    try {
      setLoading(true);
      await loginWithGoogle.run();
      window.location.href = "/analytics";
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getProfileUser = async () => {
    try {
      setLoading(true);
      return getProfile.run();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (payload: User) => {
    try {
      setLoading(true);
      const data = await updateUserProfile.run(payload);
      return data;
    } catch (error: any) {
      const err = error.response.data;
      notifications.show({
        title: "Error",
        color: "red",
        message: err?.error?.message || "Gagal mengubah profile!",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    window.location.href = "/login";
  };

  return {
    user,
    logout,
    loginGoogle,
    loading,
    getProfileUser,
    updateUser,
    setLoading,
  };
};
