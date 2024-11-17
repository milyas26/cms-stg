"use client";
import InkcraftTable from "@/components/InkcraftTable";
import { AdminUser } from "@/features/userManagement/domain/entities/AdminUser";
import useUserManagement from "@/features/userManagement/hooks/useUserManagement";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { ChevronDown, Plus } from "lucide-react";
import React from "react";

const UserManagementPage = () => {
  const { loading, getAllAdminUser, adminUsers } = useUserManagement();
  const columns = [
    {
      key: "fullname",
      title: "Name",
      render: (_: number, data: AdminUser) => {
        return (
          <Text fw={600} size="sm">
            {data.fullName}
          </Text>
        );
      },
    },
    {
      key: "roles",
      title: "Roles",
      width: "auto",
      render: (_: number, data: AdminUser) => {
        return (
          <Box>
            {data.roles.map((role, index) => (
              <Badge
                key={index}
                color="green"
                variant="light"
                radius="sm"
                size="lg"
                className="mr-2"
              >
                {role}
              </Badge>
            ))}
          </Box>
        );
      },
    },
    {
      key: "status",
      title: "Status",
      width: "auto",
      render: (_: number, data: AdminUser) => {
        return (
          <Badge
            color={data.status === "ACTIVE" ? "blue" : "gray"}
            variant="light"
            radius="sm"
            size="lg"
            className="mr-2"
          >
            {data.status}
          </Badge>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      width: "8%",
      render: (_: number, data: AdminUser) => {
        return (
          <ActionIcon
            variant="light"
            aria-label="Settings"
            onClick={() => null}
          >
            <ChevronDown size={20} />
          </ActionIcon>
        );
      },
    },
  ];

  React.useEffect(() => {
    getAllAdminUser();
  }, []);

  return (
    <Box className="space-y-4">
      <Group justify="space-between">
        <Title order={2}>Admin User</Title>
        <Button
          variant="filled"
          color="#0B192C"
          radius="sm"
          loading={loading}
          disabled={loading}
          leftSection={<Plus size={16} />}
        >
          Add User
        </Button>
      </Group>
      <InkcraftTable
        columns={columns}
        dataSource={adminUsers}
        loading={loading}
      />
    </Box>
  );
};

export default UserManagementPage;
