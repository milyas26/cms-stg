import { Enrollment } from "../entities/Enrollment";
import { EnrollmentListResponse } from "../entities/EnrollmentListResponse";
import { Withdrawal } from "../entities/Withdrawal";
import { WithdrawalListResponse } from "../entities/WithdrawalListResponse";

export interface MonetisakuRepository {
  getEnrollment(page: number, limit: number): Promise<EnrollmentListResponse>;
  getWithdrawals(page: number, limit: number): Promise<WithdrawalListResponse>;
  decideMonetisakuEnrollment(
    id: string,
    status: string,
    reason: string
  ): Promise<Enrollment>;
  decideWithdrawal(
    id: string,
    status: string,
    reason: string
  ): Promise<Withdrawal>;
}
