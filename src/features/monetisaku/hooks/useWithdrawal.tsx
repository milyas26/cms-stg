import React from "react";
import { MonetisakuApiRepository } from "../domain/repositories/MonetisakuApiRepository";
import { useMonetisakuStore } from "@/stores/monetisakuStore";

const monetisakuRepository = new MonetisakuApiRepository();
const useWithdrawal = () => {
  const [loading, setLoading] = React.useState(false);
  const { setWithdrawals } = useMonetisakuStore();
  const initialFetch = React.useRef({
    withdrawalList: false,
  });

  const getAllWithdrawal = async (page: number, limit: number) => {
    if (!initialFetch.current.withdrawalList) {
      setLoading(true);
      initialFetch.current.withdrawalList = true;
      try {
        const withdrawal = await monetisakuRepository.getWithdrawals(
          page,
          limit
        );
        setWithdrawals(withdrawal);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    getAllWithdrawal,
    initialFetch,
  };
};

export default useWithdrawal;
