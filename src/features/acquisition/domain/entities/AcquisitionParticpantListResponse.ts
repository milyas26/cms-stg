import { AcquisitionParticipant } from "./AcquisitionParticipant";

export class AcquisitionParticipantListResponse {
  constructor(
    public data: AcquisitionParticipant[],
    public page: number = 1,
    public perPage: number = 10,
    public total: number = 0,
    public totalPages: number = 0
  ) {}
}
