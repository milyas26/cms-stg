import { Acquisition } from "../entities/Acquisition";
import { AcquisitionParticipantDetail } from "../entities/AcquisitionParticipantDetail";
import { AcquisitionParticipantListResponse } from "../entities/AcquisitionParticpantListResponse";
import { AcquisitionSubmittedPost } from "../entities/AcquisitionSubmittedPost";
import { AcquisitionStatusEnum } from "../enums/acquisitionEnums";
import { AcquisitionRepository } from "../interfaces/AcquisitionRepository";
import msUserGuardedClient from "@/interceptors/msUser/msUserGuardedAccess";

export class AcquisitionApiRepository implements AcquisitionRepository {
  async getAcquisitionList(
    page: number,
    limit: number,
    query: string,
    status: AcquisitionStatusEnum
  ): Promise<any> {
    let params = {
      page,
      limit,
      query,
      status,
    };
    const response = await msUserGuardedClient.get("publisher/acquisition", {
      params,
    });
    return response.data.data;
  }

  async submitAcquisition(payload: Acquisition): Promise<Acquisition> {
    const response = await msUserGuardedClient.post(
      "publisher/acquisition",
      payload
    );
    return response.data.data;
  }

  async getDetailAcquisition(id: string): Promise<Acquisition> {
    const response = await msUserGuardedClient.get(
      `publisher/acquisition/${id}`
    );
    return response.data.data;
  }

  async listAcquisitionParticipant(
    acquisitionId: string,
    page: number,
    limit: number,
    query: string
  ): Promise<AcquisitionParticipantListResponse> {
    let params = {
      page,
      limit,
      query,
    };
    const response = await msUserGuardedClient.get(
      `publisher/acquisition/${acquisitionId}/participants`,
      {
        params,
      }
    );
    return response.data.data;
  }

  async getDetailAcquisitionParticipant(
    acquisitionId: string,
    participantId: string
  ): Promise<AcquisitionParticipantDetail> {
    const response = await msUserGuardedClient.get(
      `publisher/acquisition/participant/detail`,
      {
        params: {
          acquisitionId,
          participantId,
        },
      }
    );
    return response.data.data;
  }

  async getAcquisitionSubmittedPost(
    acquisitionId: string,
    participantId: string,
    isMonetized: boolean | null
  ): Promise<AcquisitionSubmittedPost[]> {
    const response = await msUserGuardedClient.get(
      `publisher/acquisition/participant/posts`,
      {
        params: {
          acquisitionId,
          participantId,
          isMonetized,
        },
      }
    );
    return response.data.data;
  }

  async publishAcquisition(acquisitionId: string): Promise<Acquisition> {
    const response = await msUserGuardedClient.patch(
      `publisher/acquisition/${acquisitionId}/publish`
    );
    return response.data.data;
  }
}
