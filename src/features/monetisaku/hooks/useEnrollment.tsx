import React from "react";
import { MonetisakuApiRepository } from "../domain/repositories/MonetisakuApiRepository";
import { useMonetisakuStore } from "@/stores/monetisakuStore";

const monetisakuRepository = new MonetisakuApiRepository();
const useEnrollment = () => {
  const [loading, setLoading] = React.useState(false);
  const { setEnrollments } = useMonetisakuStore();
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

  return {
    loading,
    getAllEnrollment,
    initialFetch,
  };
};

export default useEnrollment;
