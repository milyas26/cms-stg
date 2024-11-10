"use client";
import InkcraftTable from "@/components/InkcraftTable";
import { Banner } from "@/features/banner/domain/entities/Banner";
import {
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

const EnrollmentPage = () => {
  const { enrollments, enrollmentListPagination, setEnrollmentListPagination } =
    useMonetisakuStore();
  const { getAllEnrollment, loading, initialFetch } = useEnrollment();
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
        const getColor = (status: string) => {
          switch (status) {
            case ProccessStatusEnum.APPROVED:
              return "green";
            case ProccessStatusEnum.APPROVED:
              return "orange";
            case ProccessStatusEnum.REJECTED:
              return "gray";
            default:
              return "yellow";
          }
        };

        return (
          <Badge
            variant="light"
            color={getColor(data.status)}
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
      render: (_: number, __: Banner) => {
        return (
          <ActionIcon variant="light" aria-label="Settings">
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
    </Box>
  );
};

export default EnrollmentPage;