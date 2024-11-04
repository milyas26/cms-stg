import { useRef, useState } from "react";
import { AcquisitionApiRepository } from "../domain/repositories/AcquisitionApiRepository";
import { AcquisitionStatusEnum } from "../domain/enums/acquisitionEnums";
import { useAcquisitionStore } from "@/stores/acquisitionStore";
import { Acquisition } from "../domain/entities/Acquisition";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

const acquisitionRepository = new AcquisitionApiRepository();
export const useAcquisition = () => {
  const router = useRouter();
  const { setAcquisitionList, setAcquisitionParticipantList } =
    useAcquisitionStore();

  const [loading, setLoading] = useState(false);
  const initialFetch = useRef({
    acquisitionList: false,
  });

  const getAcquisitionList = async (
    page: number,
    limit: number,
    query: string,
    status: AcquisitionStatusEnum
  ) => {
    if (!initialFetch.current.acquisitionList) {
      try {
        setLoading(true);
        initialFetch.current.acquisitionList = true;
        const response = await acquisitionRepository.getAcquisitionList(
          page,
          limit,
          query,
          status
        );
        setAcquisitionList(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const submitAcquisition = async (payload: Acquisition) => {
    try {
      setLoading(true);
      const res = await acquisitionRepository.submitAcquisition(payload);
      if (res) {
        router.push("/acquisition");
        notifications.show({
          title: "Success",
          message: "Acquisition has been submitted",
          color: "teal",
        });
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Failed to submit acquisition",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDetailAcquisition = async (id: string) => {
    try {
      setLoading(true);
      const response = await acquisitionRepository.getDetailAcquisition(id);
      return response;
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Failed to get detail acquisition",
        color: "red",
      });
      return new Acquisition();
    } finally {
      setLoading(false);
    }
  };

  const listAcquisitionParticipant = async (
    acquisitionId: string,
    page: number,
    limit: number,
    query: string
  ) => {
    try {
      setLoading(true);
      const response = await acquisitionRepository.listAcquisitionParticipant(
        acquisitionId,
        page,
        limit,
        query
      );
      setAcquisitionParticipantList(response);
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Failed to get list acquisition participant",
        color: "red",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handlePublishAcquisition = async (
    id: string,
    closeConfirmPublish: () => void,
    setStatus: (status: AcquisitionStatusEnum) => void
  ) => {
    try {
      setLoading(true);
      const response = await acquisitionRepository.publishAcquisition(id);
      if (response) {
        notifications.show({
          title: "Success",
          message: "Acquisition has been published",
          color: "teal",
        });
        setStatus(AcquisitionStatusEnum.PUBLISHED);
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Failed to publish acquisition",
        color: "red",
      });
    } finally {
      setLoading(false);
      closeConfirmPublish();
    }
  };

  return {
    initialFetch,
    getAcquisitionList,
    loading,
    setLoading,
    submitAcquisition,
    getDetailAcquisition,
    listAcquisitionParticipant,
    handlePublishAcquisition,
  };
};
