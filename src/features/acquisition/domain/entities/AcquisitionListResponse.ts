import { Acquisition } from "./Acquisition";

export class AcquisitionListResponse {
  constructor(
    public data: Acquisition[],
    public page: number = 1,
    public perPage: number = 10,
    public total: number = 0,
    public totalPages: number = 0
  ) {}
}
