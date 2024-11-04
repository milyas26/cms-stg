import { useRef, useState } from "react";
import { AcquisitionApiRepository } from "../domain/repositories/AcquisitionApiRepository";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { AcquisitionParticipantDetail } from "../domain/entities/AcquisitionParticipantDetail";
import { useAcquisitionStore } from "@/stores/acquisitionStore";

const acquisitionRepository = new AcquisitionApiRepository();

export const useAcquisitionParticipant = () => {
  const router = useRouter();
  const [detailAcquisitionParticipant, setDetailAcquisitionParticipant] =
    useState(new AcquisitionParticipantDetail());
  const { setParticipantPostList } = useAcquisitionStore();
  const [loading, setLoading] = useState(false);
  const initialFetch = useRef({
    acquisitionParticipantDetail: false,
    acquisitionPostList: false,
  });

  const getAcquisitionParticipantDetail = async (
    acquisitionId: string,
    participantId: string
  ) => {
    if (!initialFetch.current.acquisitionParticipantDetail) {
      try {
        setLoading(true);
        initialFetch.current.acquisitionParticipantDetail = true;
        const response =
          await acquisitionRepository.getDetailAcquisitionParticipant(
            acquisitionId,
            participantId
          );
        setDetailAcquisitionParticipant(response);
        getParticipantPostList(acquisitionId, participantId, null);
      } catch (error) {
        console.error(error);
        notifications.show({
          title: "Error",
          message: "Failed to get acquisition participant detail",
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getParticipantPostList = async (
    acquisitionId: string,
    participantId: string,
    isMonetized: boolean | null
  ) => {
    if (!initialFetch.current.acquisitionPostList) {
      try {
        setLoading(true);
        const response =
          await acquisitionRepository.getAcquisitionSubmittedPost(
            acquisitionId,
            participantId,
            isMonetized ?? null
          );
        setParticipantPostList(response);
      } catch (error) {
        console.error(error);
        notifications.show({
          title: "Error",
          message: "Failed to get participant post list",
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    initialFetch,
    getAcquisitionParticipantDetail,
    detailAcquisitionParticipant,
    loading,
    setLoading,
    getParticipantPostList,
  };
};
