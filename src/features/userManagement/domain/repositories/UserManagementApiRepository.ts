import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import { UserManagementRepository } from "../interfaces/UserManagementRepository";
import { AdminUser } from "../entities/AdminUser";
import { Roles } from "../entities/Roles";

export class UserManagementApiRepository implements UserManagementRepository {
  async getAllUserManagement(): Promise<AdminUser[]> {
    const response = await msapGuardedAccess.get("/admin/user");
    return response.data.data;
  }

  async createUserManagement(
    payload: CreateAdminUserPayload
  ): Promise<CreateAdminUserPayload> {
    await msapGuardedAccess.post("/admin/user", payload);
    return payload;
  }

  async getAllRoles(): Promise<Roles[]> {
    const response = await msapGuardedAccess.get("/admin/user-roles");
    return response.data.data;
  }
}
