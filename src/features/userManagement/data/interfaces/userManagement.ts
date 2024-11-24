interface CreateAdminUserPayload {
  fullName: string;
  email: string;
  rawPassword: string;
  roles: string[];
}

interface UpdateAdminUserPayload {
  email: string;
  fullName: string;
  roles: string[];
  status: string;
}
