import { AdminUser } from "../entities/AdminUser";

export interface UserManagementRepository {
  getAllUserManagement(): Promise<AdminUser[]>;
}
