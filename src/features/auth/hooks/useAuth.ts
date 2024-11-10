import { useAuthStore } from "@/stores/authStore";
import { clearAuth } from "@/utils/authUtils";
import { useState } from "react";
import { AuthApiRepository } from "../domain/repositories/AuthApiRepository";
import { notifications } from "@mantine/notifications";

const authRepository = new AuthApiRepository();

export const useAuth = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      await authRepository.login(payload);
      window.location.href = "/";
      notifications.show({
        title: "Berhasil",
        message: "Login berhasil",
      });
    } catch (error) {
      console.error(error);
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
    loading,
    handleLogin,
    setLoading,
  };
};
