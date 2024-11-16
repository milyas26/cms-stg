export class TrxAdjustment {
  constructor(
    public readonly _id: string,
    public readonly user: {
      userId: string;
      email: string;
      fullName: string;
      username: string;
    },
    public readonly product: {
      productId: number;
      name: string;
      price: number;
      coin: number;
    },
    public readonly paymentMethod: string,
    public readonly transactionNumber: string,
    public readonly submittedBy: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly __v: number,
    public readonly id: string
  ) {}
}
