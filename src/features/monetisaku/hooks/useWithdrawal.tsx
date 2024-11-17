import React from "react";
import { MonetisakuApiRepository } from "../domain/repositories/MonetisakuApiRepository";
import { useMonetisakuStore } from "@/stores/monetisakuStore";
import { notifications } from "@mantine/notifications";

const monetisakuRepository = new MonetisakuApiRepository();
const useWithdrawal = () => {
  const [loading, setLoading] = React.useState(false);
  const { setWithdrawals, withdrawalListPagination } = useMonetisakuStore();
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

  const handleDecideWithdrawal = async (
    id: string,
    status: string,
    reason: string,
    handleCloseModal: () => void
  ) => {
    setLoading(true);
    try {
      initialFetch.current.withdrawalList = false;
      const withdrawal = await monetisakuRepository.decideWithdrawal(
        id,
        status,
        reason
      );

      await getAllWithdrawal(
        withdrawalListPagination.page,
        withdrawalListPagination.perPage
      );
      if (withdrawal) {
        notifications.show({
          title: "Success",
          message: `Withdrawal has been ${status}`,
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update withdrawal",
        color: "red",
      });
      console.error(error);
    } finally {
      handleCloseModal();
      setLoading(false);
    }
  };

  return {
    loading,
    getAllWithdrawal,
    initialFetch,
    handleDecideWithdrawal,
  };
};

export default useWithdrawal;
