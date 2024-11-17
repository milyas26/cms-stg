export class AdminUser {
  constructor(
    public readonly _id: string,
    public readonly fullName: string,
    public readonly email: string,
    public readonly status: string,
    public readonly roles: string[],
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly __v: number,
    public readonly id: string
  ) {}
}
