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
  APPROVED = "APPROVED",
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
  [WithdrawalRequestStatusEnum.APPROVED]: "Disetujui",
};

export const WithdrawalConfirmLabel: Record<
  WithdrawalRequestStatusEnum,
  string
> = {
  [WithdrawalRequestStatusEnum.PROCESSED]: "Process",
  [WithdrawalRequestStatusEnum.DONE]: "Approve",
  [WithdrawalRequestStatusEnum.REJECTED]: "Reject",
  [WithdrawalRequestStatusEnum.PENDING]: "Pending",
  [WithdrawalRequestStatusEnum.APPROVED]: "Approved",
};

export const getColorMonetisaku = (status: string) => {
  switch (status) {
    case ProccessStatusEnum.APPROVED || WithdrawalRequestStatusEnum.DONE:
      return "green";
    case ProccessStatusEnum.PROCESSED:
      return "orange";
    case ProccessStatusEnum.REJECTED:
      return "gray";
    default:
      return "yellow";
  }
};

export const getColorMonetisakuButton = (status: string) => {
  switch (status) {
    case WithdrawalRequestStatusEnum.APPROVED:
      return "indigo";
    case ProccessStatusEnum.PROCESSED:
      return "orange";
    case ProccessStatusEnum.REJECTED:
      return "red";
    default:
      return "gray";
  }
};

export enum IEnrollmentActionType {
  INITIAL = "",
  REJECT = "REJECTED",
  APPROVE = "APPROVED",
}