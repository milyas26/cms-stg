import { AdminUser } from "../entities/AdminUser";
import { Roles } from "../entities/Roles";

export interface UserManagementRepository {
  getAllUserManagement(): Promise<AdminUser[]>;
  createUserManagement(
    payload: CreateAdminUserPayload
  ): Promise<CreateAdminUserPayload>;
  getAllRoles(): Promise<Roles[]>;
  deleteUserManagement(id: string): Promise<{ id: string }>;
  updateUserManagement(
    payload: UpdateAdminUserPayload
  ): Promise<UpdateAdminUserPayload>;
}
