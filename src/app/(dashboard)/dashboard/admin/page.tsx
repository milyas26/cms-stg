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
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { Pencil, Plus, Trash } from "lucide-react";
import React from "react";
import ModalAdminUser from "../component/ModalAdminUser";
import { useDisclosure } from "@mantine/hooks";
import { useUserManagementStore } from "@/stores/userManagementStore";

const UserManagementPage = () => {
  const { loading, getAllAdminUser, handleDeleteAdminUser } =
    useUserManagement();
  const { userAdmin } = useUserManagementStore();
  const [isOpenModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [selectedAdminUser, setSelectedAdminUser] =
    React.useState<AdminUser | null>(null);
  const [
    isOpenConfirmDelete,
    { open: openConfirmDelete, close: closeConfirmDelete },
  ] = useDisclosure(false);

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
            size="md"
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
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              radius="sm"
              size="md"
              onClick={() => {
                setSelectedAdminUser(data);
                openModal();
              }}
            >
              <Pencil size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              radius="sm"
              size="md"
              onClick={() => {
                setSelectedAdminUser(data);
                openConfirmDelete();
              }}
            >
              <Trash size={18} />
            </ActionIcon>
          </Group>
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
          onClick={openModal}
        >
          Add User
        </Button>
      </Group>
      <InkcraftTable
        columns={columns}
        dataSource={userAdmin}
        loading={loading}
      />

      <ModalAdminUser
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        adminUser={selectedAdminUser}
      />

      <Modal
        opened={isOpenConfirmDelete}
        onClose={closeConfirmDelete}
        withCloseButton={false}
        centered
      >
        <Box className="space-y-4 text-center">
          <Text fw="bold" size="md">
            Apakah anda yakin ingin menghapus user ini?
          </Text>
          <Group align="center" justify="space-between" grow wrap="nowrap">
            <Button
              variant="filled"
              color="rgb(11, 25, 44)"
              radius="sm"
              loading={loading}
              disabled={loading}
              fullWidth
              onClick={closeConfirmDelete}
            >
              Batal
            </Button>
            <Button
              variant="filled"
              color="red"
              radius="sm"
              loading={loading}
              disabled={loading}
              fullWidth
              onClick={() =>
                handleDeleteAdminUser(selectedAdminUser!, closeConfirmDelete)
              }
            >
              Hapus
            </Button>
          </Group>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserManagementPage;
