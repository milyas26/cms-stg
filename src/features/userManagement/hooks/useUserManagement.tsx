import React from "react";
import { UserManagementApiRepository } from "../domain/repositories/UserManagementApiRepository";
import { notifications } from "@mantine/notifications";
import { useUserManagementStore } from "@/stores/userManagementStore";
import { AdminUser } from "../domain/entities/AdminUser";

const userManagement = new UserManagementApiRepository();
const useUserManagement = () => {
  const [loading, setLoading] = React.useState(false);
  const { setUserAdmin } = useUserManagementStore();
  const initialFetch = React.useRef({
    adminUserList: false,
  });

  const getAllAdminUser = async () => {
    if (!initialFetch.current.adminUserList) {
      setLoading(true);
      initialFetch.current.adminUserList = true;
      try {
        const response = await userManagement.getAllUserManagement();
        setUserAdmin(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const createUserManagement = async (
    payload: CreateAdminUserPayload,
    closeModal: () => void
  ) => {
    setLoading(true);
    try {
      const adminUser = await userManagement.createUserManagement(payload);

      if (adminUser) {
        initialFetch.current.adminUserList = false;
        notifications.show({
          title: "Success",
          message: "User created successfully",
        });
        await getAllAdminUser();
        closeModal();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message:
          error.response?.data?.error?.message || "Failed to create user",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdminUser = async (
    user: AdminUser,
    closeConfirm: () => void
  ) => {
    setLoading(true);
    try {
      const response = await userManagement.deleteUserManagement(user.id);
      if (response) {
        initialFetch.current.adminUserList = false;
        notifications.show({
          title: "Success",
          message: "User deleted successfully",
        });
        await getAllAdminUser();
        closeConfirm();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message:
          error.response?.data?.error?.message || "Failed to delete user",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserManagement = async (
    payload: UpdateAdminUserPayload,
    closeModal: () => void
  ) => {
    setLoading(true);
    try {
      const adminUser = await userManagement.updateUserManagement(payload);

      if (adminUser) {
        initialFetch.current.adminUserList = false;
        notifications.show({
          title: "Success",
          message: "User updated successfully",
        });
        await getAllAdminUser();
        closeModal();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message:
          error.response?.data?.error?.message || "Failed to update user",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getAllAdminUser,
    createUserManagement,
    handleDeleteAdminUser,
    updateUserManagement,
  };
};

export default useUserManagement;
