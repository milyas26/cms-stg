"use client";
import InkcraftTable from "@/components/InkcraftTable";
import {
  getColorMonetisaku,
  getColorMonetisakuButton,
  WithdrawalConfirmLabel,
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
  Button,
  Group,
  Menu,
  Modal,
  NumberFormatter,
  Pagination,
  Text,
  Title,
} from "@mantine/core";
import { Ellipsis } from "lucide-react";
import React from "react";
import { useDisclosure } from "@mantine/hooks";

const WithdrawalPage = () => {
  const { withdrawals, withdrawalListPagination, setWithdrawalListPagination } =
    useMonetisakuStore();
  const [isOpenModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [confirmType, setConfirmType] =
    React.useState<WithdrawalRequestStatusEnum>(
      WithdrawalRequestStatusEnum.PENDING
    );
  const [selectedWithdrawal, setSelectedWithdrawal] =
    React.useState<Withdrawal>({} as Withdrawal);
  const { getAllWithdrawal, loading, initialFetch, handleDecideWithdrawal } =
    useWithdrawal();
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
      key: "destinationBank",
      title: "Bank Name",
      width: "auto",
      render: (_: number, withdrawal: Withdrawal) => {
        return <Text size="sm">{withdrawal.destinationBank}</Text>;
      },
    },
    {
      key: "destinationAccountNumber",
      title: "Bank No",
      width: "auto",
      render: (_: number, withdrawal: Withdrawal) => {
        return <Text size="sm">{withdrawal.destinationAccountNumber}</Text>;
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
        return (
          <Badge
            variant="light"
            color={getColorMonetisaku(data.status)}
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
      render: (_: number, withdrawal: Withdrawal) => {
        const isUnProcessed =
          withdrawal.status === WithdrawalRequestStatusEnum.PROCESSED ||
          withdrawal.status === WithdrawalRequestStatusEnum.PENDING;

        const handleClickMenu = (status: WithdrawalRequestStatusEnum) => {
          openModal();
          setConfirmType(status);
          setSelectedWithdrawal(withdrawal);
        };
        return (
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="light" aria-label="More">
                <Ellipsis />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="red"
                disabled={!isUnProcessed || loading}
                onClick={() =>
                  handleClickMenu(WithdrawalRequestStatusEnum.REJECTED)
                }
              >
                Reject
              </Menu.Item>
              <Menu.Item
                color="orange"
                disabled={
                  withdrawal.status !== WithdrawalRequestStatusEnum.PENDING ||
                  loading
                }
                onClick={() =>
                  handleClickMenu(WithdrawalRequestStatusEnum.PROCESSED)
                }
              >
                Process
              </Menu.Item>
              <Menu.Item
                color="indigo"
                disabled={!isUnProcessed || loading}
                onClick={() =>
                  handleClickMenu(WithdrawalRequestStatusEnum.APPROVED)
                }
              >
                Approve
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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

      <Modal
        opened={isOpenModal}
        onClose={closeModal}
        withCloseButton={false}
        centered
        size="sm"
      >
        <Box className="space-y-4">
          <Text size="lg" fw={500} className="text-center">
            Are you sure to{" "}
            {WithdrawalConfirmLabel[confirmType].toLocaleLowerCase()} this
            withdrawal?
          </Text>
          <Button
            variant="filled"
            color={getColorMonetisakuButton(confirmType)}
            radius="xl"
            fullWidth
            loading={loading}
            disabled={loading}
            type="button"
            onClick={() =>
              handleDecideWithdrawal(
                selectedWithdrawal._id,
                confirmType,
                "",
                closeModal
              )
            }
          >
            {WithdrawalConfirmLabel[confirmType]}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default WithdrawalPage;
