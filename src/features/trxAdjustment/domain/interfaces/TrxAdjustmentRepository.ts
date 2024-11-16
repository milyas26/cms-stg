import { TrxAdjustment } from "../entities/TrxAdjustment";

export interface TrxAdjustmentRepository {
  getTrxAdjustment(): Promise<TrxAdjustment[]>;
}
