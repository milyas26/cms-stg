import { Enrollment } from "./Enrollment";

export class EnrollmentListResponse {
  constructor(
    public data: Enrollment[],
    public page: number = 1,
    public perPage: number = 10,
    public total: number = 0,
    public totalPages: number = 0
  ) {}
}
