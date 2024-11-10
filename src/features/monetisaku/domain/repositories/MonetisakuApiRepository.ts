import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import { Enrollment } from "../entities/Enrollment";
import { MonetisakuRepository } from "../interfaces/MonetisakuRepository";
import { EnrollmentListResponse } from "../entities/EnrollmentListResponse";
import { WithdrawalListResponse } from "../entities/WithdrawalListResponse";

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
}
