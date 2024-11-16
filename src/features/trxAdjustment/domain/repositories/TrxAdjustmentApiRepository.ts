import msapGuardedAccess from "@/interceptors/msap/msapGuardedAccess";
import { TrxAdjustmentRepository } from "../interfaces/TrxAdjustmentRepository";
import { TrxAdjustment } from "../entities/TrxAdjustment";

export class TrxAdjustmentApiRepository implements TrxAdjustmentRepository {
  async getTrxAdjustment(): Promise<TrxAdjustment[]> {
    const response = await msapGuardedAccess.get("/transaction/adjustment");
    return response.data.data;
  }
}
