import React from "react";
import { UserManagementApiRepository } from "../domain/repositories/UserManagementApiRepository";
import { AdminUser } from "../domain/entities/AdminUser";

const userManagement = new UserManagementApiRepository();
const useUserManagement = () => {
  const [loading, setLoading] = React.useState(false);
  const [adminUsers, setAdminUsers] = React.useState<AdminUser[]>([]);
  const initialFetch = React.useRef({
    adminUserList: false,
  });

  const getAllAdminUser = async () => {
    if (!initialFetch.current.adminUserList) {
      setLoading(true);
      initialFetch.current.adminUserList = true;
      try {
        const transactions = await userManagement.getAllUserManagement();
        setAdminUsers(transactions);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    getAllAdminUser,
    adminUsers,
  };
};

export default useUserManagement;
