export class Roles {
  constructor(
    public readonly _id: string,
    public readonly name: string,
    public readonly code: string,
    public readonly permissions: string[],
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly __v: number,
    public readonly id: string
  ) {}
}
