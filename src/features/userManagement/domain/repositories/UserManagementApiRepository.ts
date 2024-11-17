import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import { UserManagementRepository } from "../interfaces/UserManagementRepository";
import { AdminUser } from "../entities/AdminUser";

export class UserManagementApiRepository implements UserManagementRepository {
  async getAllUserManagement(): Promise<AdminUser[]> {
    const response = await msapGuardedAccess.get("/admin/user");
    return response.data.data;
  }
}
