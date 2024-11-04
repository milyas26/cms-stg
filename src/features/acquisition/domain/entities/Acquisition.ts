import { BannerDefault } from "@/features/common/domain/constants/common.constants";
import { AcquisitionStatusEnum } from "../enums/acquisitionEnums";

export class Acquisition {
  constructor(
    public _id: string = "",
    public title: string = "",
    public url: string = "",
    public banner: string = BannerDefault,
    public price: number = 0,
    public totalParticipant: number = 0,
    public maxParticipant: number = 0,
    public status: AcquisitionStatusEnum = AcquisitionStatusEnum.DRAFT,
    public startDate: Date = new Date(),
    public description: string = ""
  ) {}
}
