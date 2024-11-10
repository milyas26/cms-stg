import { Withdrawal } from "./Withdrawal";

export class WithdrawalListResponse {
  constructor(
    public data: Withdrawal[],
    public page: number = 1,
    public perPage: number = 10,
    public total: number = 0,
    public totalPages: number = 0
  ) {}
}
