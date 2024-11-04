import { AcquisitionStatusEnum } from "@/features/acquisition/domain/enums/acquisitionEnums";
import { create } from "zustand";
import { AcquisitionListResponse } from "@/features/acquisition/domain/entities/AcquisitionListResponse";
import { Acquisition } from "@/features/acquisition/domain/entities/Acquisition";
import { AcquisitionParticipant } from "@/features/acquisition/domain/entities/AcquisitionParticipant";
import { AcquisitionParticipantListResponse } from "@/features/acquisition/domain/entities/AcquisitionParticpantListResponse";
import { AcquisitionSubmittedPost } from "@/features/acquisition/domain/entities/AcquisitionSubmittedPost";

interface AcquisitionState {
  acquisitionListPagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    query: string;
    status: AcquisitionStatusEnum;
  };
  acquisitionList: Acquisition[];
  acquisitionParticipantListPagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    query: string;
  };
  acquisitionParticipantList: AcquisitionParticipant[];
  participantPostList: AcquisitionSubmittedPost[];
  setParticipantPostList: (
    participantPostList: AcquisitionSubmittedPost[]
  ) => void;
  setAcquisitionList: (acquisitionList: AcquisitionListResponse) => void;
  setAcquisitionListPagination: (pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    query: string;
    status: AcquisitionStatusEnum;
  }) => void;
  setAcquisitionParticipantList: (
    acquisitionParticipantList: AcquisitionParticipantListResponse
  ) => void;
  setAcquisitionParticipantListPagination: (pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    query: string;
  }) => void;
  clearParticipantList: () => void;
}

export const useAcquisitionStore = create<AcquisitionState>((set) => ({
  acquisitionListPagination: {
    page: 1,
    perPage: 12,
    total: 0,
    totalPages: 0,
    query: "",
    status: AcquisitionStatusEnum.ALL,
  },
  acquisitionList: [],
  acquisitionParticipantListPagination: {
    page: 1,
    perPage: 20,
    total: 0,
    totalPages: 0,
    query: "",
  },
  acquisitionParticipantList: [],
  participantPostList: [],
  setAcquisitionList: (acquisitionList: AcquisitionListResponse) => {
    const { query, status } =
      useAcquisitionStore.getState().acquisitionListPagination;
    set({
      acquisitionList: acquisitionList.data,
      acquisitionListPagination: {
        page: acquisitionList.page,
        perPage: acquisitionList.perPage,
        total: acquisitionList.total,
        totalPages: acquisitionList.totalPages,
        query,
        status,
      },
    });
  },
  setAcquisitionListPagination: (pagination) =>
    set({ acquisitionListPagination: pagination }),
  setAcquisitionParticipantList: (
    acquisitionParticipantList: AcquisitionParticipantListResponse
  ) => {
    const { query } =
      useAcquisitionStore.getState().acquisitionParticipantListPagination;
    set({
      acquisitionParticipantList: acquisitionParticipantList.data,
      acquisitionParticipantListPagination: {
        page: acquisitionParticipantList.page,
        perPage: acquisitionParticipantList.perPage,
        total: acquisitionParticipantList.total,
        totalPages: acquisitionParticipantList.totalPages,
        query,
      },
    });
  },
  setAcquisitionParticipantListPagination: (pagination) =>
    set({ acquisitionParticipantListPagination: pagination }),
  setParticipantPostList: (participantPostList) => set({ participantPostList }),
  clearParticipantList: () => set({ acquisitionParticipantList: [] }),
}));
