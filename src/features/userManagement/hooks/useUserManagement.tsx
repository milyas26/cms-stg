import React from "react";
import { UserManagementApiRepository } from "../domain/repositories/UserManagementApiRepository";
import { notifications } from "@mantine/notifications";
import { useUserManagementStore } from "@/stores/userManagementStore";

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

  return {
    loading,
    getAllAdminUser,
    createUserManagement,
  };
};

export default useUserManagement;
