"use client";
import InkcraftTable from "@/components/InkcraftTable";
import { Banner } from "@/features/banner/domain/entities/Banner";
import {
  WithdrawalRequestStatusEnum,
  WithdrawalRequestStatusEnumLabel,
} from "@/features/monetisaku/data/enums/monetisaku.enums";
import { Withdrawal } from "@/features/monetisaku/domain/entities/Withdrawal";
import useWithdrawal from "@/features/monetisaku/hooks/useWithdrawal";
import { useMonetisakuStore } from "@/stores/monetisakuStore";
import { dateTimeFormat } from "@/utils/commonUtils";
import {
  ActionIcon,
  Badge,
  Box,
  Group,
  NumberFormatter,
  Pagination,
  Text,
  Title,
} from "@mantine/core";
import { ChevronDown } from "lucide-react";
import React from "react";

const WithdrawalPage = () => {
  const { withdrawals, withdrawalListPagination, setWithdrawalListPagination } =
    useMonetisakuStore();
  const { getAllWithdrawal, loading, initialFetch } = useWithdrawal();
  const columns = [
    {
      key: "fullname",
      title: "Full Name",
      render: (_: number, withdrawal: Withdrawal) => {
        return (
          <Text fw={600} size="sm">
            {withdrawal.destinationAccountName}
          </Text>
        );
      },
    },
    {
      key: "amount",
      title: "Amount",
      width: "auto",
      render: (_: number, withdrawal: Withdrawal) => {
        return (
          <NumberFormatter
            prefix="Rp"
            value={withdrawal.amount}
            thousandSeparator=","
            decimalSeparator="."
          />
        );
      },
    },
    {
      key: "createdAt",
      title: "Applied At",
      width: "auto",
      render: (_: number, withdrawal: Withdrawal) => {
        return <Text size="sm">{dateTimeFormat(withdrawal.createdAt)}</Text>;
      },
    },
    {
      key: "status",
      title: "Status",
      width: "auto",
      render: (_: number, data: Withdrawal) => {
        const getColor = (status: string) => {
          switch (status) {
            case WithdrawalRequestStatusEnum.DONE:
              return "green";
            case WithdrawalRequestStatusEnum.PROCESSED:
              return "orange";
            case WithdrawalRequestStatusEnum.REJECTED:
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
              WithdrawalRequestStatusEnumLabel[
                (data.status as WithdrawalRequestStatusEnum) ??
                  WithdrawalRequestStatusEnum.PENDING
              ]
            }
          </Badge>
        );
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
    getAllWithdrawal(
      withdrawalListPagination.page,
      withdrawalListPagination.perPage
    );
  }, []);

  return (
    <Box className="space-y-4">
      <Group justify="space-between">
        <Title order={2}>Withdrawal</Title>
      </Group>
      <InkcraftTable
        columns={columns}
        dataSource={withdrawals}
        loading={loading}
      />
      <Group justify="end">
        <Pagination
          total={Math.ceil(
            withdrawalListPagination.total / withdrawalListPagination.perPage
          )}
          value={withdrawalListPagination.page}
          onChange={(page: number) => {
            initialFetch.current.withdrawalList = false;
            setWithdrawalListPagination({
              ...withdrawalListPagination,
              page,
            });

            getAllWithdrawal(page, withdrawalListPagination.perPage);
          }}
          mt="sm"
        />
      </Group>
    </Box>
  );
};

export default WithdrawalPage;
