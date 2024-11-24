import React from "react";
import { UserManagementApiRepository } from "../domain/repositories/UserManagementApiRepository";

const userManagementRepository = new UserManagementApiRepository();
const useRoles = () => {
  const [roles, setRoles] = React.useState<{ label: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = React.useState(false);

  const handleGetRoles = async () => {
    if (roles.length > 0) return;
    setLoading(true);
    try {
      const roles = await userManagementRepository.getAllRoles();
      setRoles(roles.map((role) => ({ label: role.name, value: role.code })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    roles,
    loading,
    handleGetRoles,
  };
};

export default useRoles;
