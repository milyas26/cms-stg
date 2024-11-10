export class Withdrawal {
  constructor(
    public _id: string,
    public userId: string,
    public amount: number,
    public destinationBank: string,
    public destinationAccountName: string,
    public destinationAccountNumber: string,
    public status: string,
    public createdAt: string,
    public updatedAt: string
  ) {}
}
