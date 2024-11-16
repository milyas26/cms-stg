import React from "react";
import { TrxAdjustmentApiRepository } from "../domain/repositories/TrxAdjustmentApiRepository";
import { TrxAdjustment } from "../domain/entities/TrxAdjustment";

const trxAdjustmentRepository = new TrxAdjustmentApiRepository();
const useTrxAdjustment = () => {
  const [loading, setLoading] = React.useState(false);
  const [transactionAdjustments, setTransactionAdjustments] = React.useState<
    TrxAdjustment[]
  >([]);
  const initialFetch = React.useRef({
    adjutsmentList: false,
  });

  const getAllAdjustment = async () => {
    if (!initialFetch.current.adjutsmentList) {
      setLoading(true);
      initialFetch.current.adjutsmentList = true;
      try {
        const transactions = await trxAdjustmentRepository.getTrxAdjustment();
        setTransactionAdjustments(transactions);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    getAllAdjustment,
    transactionAdjustments,
  };
};

export default useTrxAdjustment;
