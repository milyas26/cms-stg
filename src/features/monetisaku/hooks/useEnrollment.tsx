import React from "react";
import { MonetisakuApiRepository } from "../domain/repositories/MonetisakuApiRepository";
import { useMonetisakuStore } from "@/stores/monetisakuStore";
import { IEnrollmentActionType } from "../data/enums/monetisaku.enums";
import { notifications } from "@mantine/notifications";

const monetisakuRepository = new MonetisakuApiRepository();
const useEnrollment = () => {
  const [loading, setLoading] = React.useState(false);
  const { setEnrollments, enrollmentListPagination } = useMonetisakuStore();
  const initialFetch = React.useRef({
    enrollmentList: false,
  });

  const getAllEnrollment = async (page: number, limit: number) => {
    if (!initialFetch.current.enrollmentList) {
      setLoading(true);
      initialFetch.current.enrollmentList = true;
      try {
        const enrollments = await monetisakuRepository.getEnrollment(
          page,
          limit
        );
        setEnrollments(enrollments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDecideEnrollment = async (
    id: string,
    status: IEnrollmentActionType,
    reason: string,
    handleCloseModal: () => void
  ) => {
    setLoading(true);
    try {
      const res = await monetisakuRepository.decideMonetisakuEnrollment(
        id,
        status,
        reason
      );
      await getAllEnrollment(
        enrollmentListPagination.page,
        enrollmentListPagination.perPage
      );

      if (res) {
        notifications.show({
          title: "Success",
          message: "Enrollment has been updated",
        });
        handleCloseModal();
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update enrollment",
        color: "red",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getAllEnrollment,
    initialFetch,
    handleDecideEnrollment,
  };
};

export default useEnrollment;
