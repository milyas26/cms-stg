import { Acquisition } from "../entities/Acquisition";
import { AcquisitionListResponse } from "../entities/AcquisitionListResponse";
import { AcquisitionParticipantDetail } from "../entities/AcquisitionParticipantDetail";
import { AcquisitionParticipantListResponse } from "../entities/AcquisitionParticpantListResponse";
import { AcquisitionSubmittedPost } from "../entities/AcquisitionSubmittedPost";
import { AcquisitionStatusEnum } from "../enums/acquisitionEnums";

export interface AcquisitionRepository {
  getAcquisitionList(
    page: number,
    limit: number,
    query: string,
    status: AcquisitionStatusEnum
  ): Promise<AcquisitionListResponse>;
  submitAcquisition(payload: Acquisition): Promise<Acquisition>;
  getDetailAcquisition(id: string): Promise<Acquisition>;
  listAcquisitionParticipant(
    acquisitionId: string,
    page: number,
    limit: number,
    query: string
  ): Promise<AcquisitionParticipantListResponse>;
  getDetailAcquisitionParticipant(
    acquisitionId: string,
    participantId: string
  ): Promise<AcquisitionParticipantDetail>;
  getAcquisitionSubmittedPost(
    acquisitionId: string,
    participantId: string,
    isMonetized: boolean
  ): Promise<AcquisitionSubmittedPost[]>;
  publishAcquisition(acquisitionId: string): Promise<Acquisition>;
}
