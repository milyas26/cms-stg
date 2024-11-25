"use client";
import InkcraftTable from "@/components/InkcraftTable";
import { TrxAdjustment } from "@/features/trxAdjustment/domain/entities/TrxAdjustment";
import useTrxAdjustment from "@/features/trxAdjustment/hooks/useTrxAdjustment";
import { dateTimeFormat } from "@/utils/commonUtils";
import {
  Box,
  Button,
  Group,
  NumberFormatter,
  Text,
  Title,
} from "@mantine/core";
import { Plus } from "lucide-react";
import React from "react";

const AdjustmentPage = () => {
  const { loading, getAllAdjustment, transactionAdjustments } =
    useTrxAdjustment();
  const columns = [
    {
      key: "fullname",
      title: "User",
      render: (_: number, data: TrxAdjustment) => {
        return (
          <Text fw={600} size="sm" py="sm">
            {data.user?.fullName}
          </Text>
        );
      },
    },
    {
      key: "product",
      title: "Product",
      width: "auto",
      render: (_: number, data: TrxAdjustment) => {
        return <Text size="sm">{data.product?.name}</Text>;
      },
    },
    {
      key: "price",
      title: "Price",
      width: "auto",
      render: (_: number, data: TrxAdjustment) => {
        return (
          <NumberFormatter
            prefix="Rp"
            value={data.product?.price}
            thousandSeparator=","
            decimalSeparator="."
          />
        );
      },
    },
    {
      key: "number",
      title: "Transaction Number",
      width: "auto",
      render: (_: number, data: TrxAdjustment) => {
        return <Text size="sm">{data.transactionNumber}</Text>;
      },
    },
    {
      key: "submittedBy",
      title: "Submitted By",
      width: "auto",
      render: (_: number, data: TrxAdjustment) => {
        return <Text size="sm">{data.submittedBy}</Text>;
      },
    },
    {
      key: "createdAt",
      title: "Created At",
      width: "auto",
      render: (_: number, data: TrxAdjustment) => {
        return <Text size="sm">{dateTimeFormat(data.createdAt)}</Text>;
      },
    },
  ];

  React.useEffect(() => {
    getAllAdjustment();
  }, []);

  return (
    <Box className="space-y-4">
      <Group justify="space-between">
        <Title order={2}>Transaction Adjustment</Title>
        <Button
          variant="filled"
          color="#0B192C"
          radius="sm"
          loading={loading}
          disabled={loading}
          leftSection={<Plus size={16} />}
        >
          New Adjustment
        </Button>
      </Group>
      <InkcraftTable
        columns={columns}
        dataSource={transactionAdjustments}
        loading={loading}
      />
    </Box>
  );
};

export default AdjustmentPage;
