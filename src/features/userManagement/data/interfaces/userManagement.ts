interface CreateAdminUserPayload {
  fullName: string;
  email: string;
  rawPassword: string;
  roles: string[];
}
