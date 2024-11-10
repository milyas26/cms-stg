import { create } from "zustand";
import { EnrollmentListResponse } from "@/features/monetisaku/domain/entities/EnrollmentListResponse";
import { Enrollment } from "@/features/monetisaku/domain/entities/Enrollment";
import { WithdrawalListResponse } from "@/features/monetisaku/domain/entities/WithdrawalListResponse";
import { Withdrawal } from "@/features/monetisaku/domain/entities/Withdrawal";

interface MonetisakuState {
  enrollments: Enrollment[];
  enrollmentListPagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  setEnrollments: (enrollments: EnrollmentListResponse) => void;
  setEnrollmentListPagination: (pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  }) => void;

  withdrawals: Withdrawal[];
  withdrawalListPagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  setWithdrawals: (withdrawals: WithdrawalListResponse) => void;
  setWithdrawalListPagination: (pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  }) => void;
}

export const useMonetisakuStore = create<MonetisakuState>((set) => ({
  enrollments: [],
  enrollmentListPagination: {
    page: 1,
    perPage: 20,
    total: 0,
    totalPages: 0,
  },
  setEnrollments: (enrollments: EnrollmentListResponse) =>
    set({
      enrollments: enrollments.data,
      enrollmentListPagination: {
        page: Number(enrollments.page),
        perPage: Number(enrollments.perPage),
        total: enrollments.total,
        totalPages: enrollments.totalPages,
      },
    }),
  setEnrollmentListPagination: (pagination) =>
    set({ enrollmentListPagination: pagination }),

  withdrawals: [],
  withdrawalListPagination: {
    page: 1,
    perPage: 20,
    total: 0,
    totalPages: 0,
  },
  setWithdrawals: (withdrawals: WithdrawalListResponse) =>
    set({
      withdrawals: withdrawals.data,
      withdrawalListPagination: {
        page: Number(withdrawals.page),
        perPage: Number(withdrawals.perPage),
        total: withdrawals.total,
        totalPages: withdrawals.totalPages,
      },
    }),
  setWithdrawalListPagination: (pagination) =>
    set({ withdrawalListPagination: pagination }),
}));
