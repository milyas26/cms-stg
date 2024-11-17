"use client";
import InkcraftTable from "@/components/InkcraftTable";
import {
  getColorMonetisaku,
  ProccessStatusEnum,
  ProccessStatusEnumLabel,
} from "@/features/monetisaku/data/enums/monetisaku.enums";
import { Enrollment } from "@/features/monetisaku/domain/entities/Enrollment";
import useEnrollment from "@/features/monetisaku/hooks/useEnrollment";
import { useMonetisakuStore } from "@/stores/monetisakuStore";
import { dateTimeFormat } from "@/utils/commonUtils";
import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Pagination,
  Text,
  Title,
} from "@mantine/core";
import { ChevronDown } from "lucide-react";
import React from "react";
import ModalEnrollment from "../component/ModalEnrollment";
import { useDisclosure } from "@mantine/hooks";

const EnrollmentPage = () => {
  const { enrollments, enrollmentListPagination, setEnrollmentListPagination } =
    useMonetisakuStore();
  const { getAllEnrollment, loading, initialFetch } = useEnrollment();
  const [isOpenModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [selectedEnrollment, setSelectedEnrollment] =
    React.useState<Enrollment>({} as Enrollment);

  const columns = [
    {
      key: "user",
      title: "User",
      render: (_: number, enrollment: Enrollment) => {
        return (
          <Text fw={600} size="sm">
            {enrollment.user?.fullName}
          </Text>
        );
      },
    },
    {
      key: "title",
      title: "Title",
      width: "auto",
      render: (_: number, enrollment: Enrollment) => {
        return (
          <Text fw={600} size="sm">
            {enrollment.post?.title}
          </Text>
        );
      },
    },
    {
      key: "createdAt",
      title: "Applied At",
      width: "auto",
      render: (_: number, enrollment: Enrollment) => {
        return <Text size="sm">{dateTimeFormat(enrollment.createdAt)}</Text>;
      },
    },
    {
      key: "status",
      title: "Status",
      width: "auto",
      render: (_: number, data: Enrollment) => {
        return (
          <Badge
            variant="light"
            color={getColorMonetisaku(data.status)}
            size="md"
            radius="sm"
          >
            {
              ProccessStatusEnumLabel[
                (data.status as ProccessStatusEnum) ??
                  ProccessStatusEnum.PENDING
              ]
            }
          </Badge>
        );
      },
    },
    {
      key: "approverEmail",
      title: "Checker",
      width: "auto",
      render: (_: number, enrollment: Enrollment) => {
        return <Text size="sm">{enrollment.approverEmail}</Text>;
      },
    },
    {
      key: "action",
      title: "Action",
      width: "8%",
      render: (_: number, enrollment: Enrollment) => {
        return (
          <ActionIcon
            variant="light"
            aria-label="Settings"
            onClick={() => {
              setSelectedEnrollment(enrollment);
              openModal();
            }}
          >
            <ChevronDown size={20} />
          </ActionIcon>
        );
      },
    },
  ];

  React.useEffect(() => {
    getAllEnrollment(
      enrollmentListPagination.page,
      enrollmentListPagination.perPage
    );
  }, []);

  return (
    <Box className="space-y-4">
      <Group justify="space-between">
        <Title order={2}>Monetisaku</Title>
      </Group>
      <InkcraftTable
        columns={columns}
        dataSource={enrollments}
        loading={loading}
      />
      <Group justify="end">
        <Pagination
          total={Math.ceil(
            enrollmentListPagination.total / enrollmentListPagination.perPage
          )}
          value={enrollmentListPagination.page}
          onChange={(page: number) => {
            initialFetch.current.enrollmentList = false;
            setEnrollmentListPagination({
              ...enrollmentListPagination,
              page,
            });

            getAllEnrollment(page, enrollmentListPagination.perPage);
          }}
          mt="sm"
        />
      </Group>

      <ModalEnrollment
        closeModal={closeModal}
        isOpenModal={isOpenModal}
        loading={loading}
        enrollment={selectedEnrollment}
      />
    </Box>
  );
};

export default EnrollmentPage;
