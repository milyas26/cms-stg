import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import { Enrollment } from "../entities/Enrollment";
import { MonetisakuRepository } from "../interfaces/MonetisakuRepository";
import { EnrollmentListResponse } from "../entities/EnrollmentListResponse";
import { WithdrawalListResponse } from "../entities/WithdrawalListResponse";
import { Withdrawal } from "../entities/Withdrawal";

export class MonetisakuApiRepository implements MonetisakuRepository {
  async getEnrollment(
    page: number,
    limit: number
  ): Promise<EnrollmentListResponse> {
    const response = await msapGuardedAccess.get(
      `monetisaku?limit=${limit}&page=${page}`
    );
    return response.data.data;
  }

  async getWithdrawals(
    page: number,
    limit: number
  ): Promise<WithdrawalListResponse> {
    const response = await msapGuardedAccess.get(
      `monetisaku/withdrawal?limit=${limit}&page=${page}`
    );
    return response.data.data;
  }

  async decideMonetisakuEnrollment(
    id: string,
    status: string,
    reason: string
  ): Promise<Enrollment> {
    const response = await msapGuardedAccess.patch(`monetisaku/${id}`, {
      status,
      reason,
    });
    return response.data.data;
  }

  async decideWithdrawal(
    id: string,
    status: string,
    reason: string
  ): Promise<Withdrawal> {
    const response = await msapGuardedAccess.patch(
      `monetisaku/withdrawal/${id}`,
      {
        status,
        reason,
      }
    );
    return response.data;
  }
}
