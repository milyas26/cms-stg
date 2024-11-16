export enum ProccessStatusEnum {
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const ProccessStatusEnumLabel: Record<ProccessStatusEnum, string> = {
  [ProccessStatusEnum.PENDING]: "Menunggu",
  [ProccessStatusEnum.PROCESSED]: "Diproses",
  [ProccessStatusEnum.APPROVED]: "Selesai",
  [ProccessStatusEnum.REJECTED]: "Ditolak",
};

export enum WithdrawalRequestStatusEnum {
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
  DONE = "DONE",
  REJECTED = "REJECTED",
}

export const WithdrawalRequestStatusEnumLabel: Record<
  WithdrawalRequestStatusEnum,
  string
> = {
  [WithdrawalRequestStatusEnum.PENDING]: "Menunggu",
  [WithdrawalRequestStatusEnum.PROCESSED]: "Diproses",
  [WithdrawalRequestStatusEnum.DONE]: "Selesai",
  [WithdrawalRequestStatusEnum.REJECTED]: "Ditolak",
};

export const getColorMonetisakuEnrollment = (status: string) => {
  switch (status) {
    case ProccessStatusEnum.APPROVED:
      return "green";
    case ProccessStatusEnum.PROCESSED:
      return "orange";
    case ProccessStatusEnum.REJECTED:
      return "gray";
    default:
      return "yellow";
  }
};

export enum IEnrollmentActionType {
  INITIAL = "",
  REJECT = "REJECTED",
  APPROVE = "APPROVED",
}