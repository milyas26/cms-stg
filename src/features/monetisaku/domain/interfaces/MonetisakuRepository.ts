import { EnrollmentListResponse } from "../entities/EnrollmentListResponse";
import { WithdrawalListResponse } from "../entities/WithdrawalListResponse";

export interface MonetisakuRepository {
  getEnrollment(page: number, limit: number): Promise<EnrollmentListResponse>;
  getWithdrawals(page: number, limit: number): Promise<WithdrawalListResponse>;
}
