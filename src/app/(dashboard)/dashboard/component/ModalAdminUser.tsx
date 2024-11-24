import { AdminUser } from "@/features/userManagement/domain/entities/AdminUser";
import useRoles from "@/features/userManagement/hooks/useRoles";
import useUserManagement from "@/features/userManagement/hooks/useUserManagement";
import {
  Box,
  Button,
  Group,
  Modal,
  MultiSelect,
  PasswordInput,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import React from "react";
import { z } from "zod";

interface IModalAdminUserProps {
  isOpenModal: boolean;
  closeModal: () => void;
  adminUser: AdminUser | null;
}

const ModalAdminUser = ({
  isOpenModal,
  closeModal,
  adminUser,
}: IModalAdminUserProps) => {
  const {
    loading: createLoading,
    createUserManagement,
    updateUserManagement,
  } = useUserManagement();
  const { loading: loadingRoles, handleGetRoles, roles } = useRoles();
  const [status, setStatus] = React.useState<"ACTIVE" | "INACTIVE">("INACTIVE");
  const schema = z.object({
    fullname: z.string().nonempty("Nama lengkap wajib diisi"),
    email: z.string().email("Email tidak valid"),
    password: adminUser
      ? z.string().optional()
      : z.string().nonempty("Password wajib diisi"),
    roles: z.array(z.string()).nonempty("Roles wajib diisi"),
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      roles: [],
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    if (!adminUser) {
      const payload = {
        fullName: values.fullname,
        email: values.email,
        rawPassword: values.password || "",
        roles: values.roles,
      };
      createUserManagement(payload, closeModal);
    } else {
      const payload = {
        email: values.email,
        fullName: values.fullname,
        roles: values.roles,
        status,
      };
      updateUserManagement(payload, closeModal);
    }
  };

  const handleCloseModal = () => {
    closeModal();
    form.reset();
  };

  React.useEffect(() => {
    if (isOpenModal) {
      handleGetRoles();

      if (adminUser) {
        form.setValues({
          fullname: adminUser.fullName,
          email: adminUser.email,
          roles: adminUser.roles as any,
        });

        setStatus(adminUser.status as "ACTIVE" | "INACTIVE");
      }
    }
  }, [isOpenModal]);
  return (
    <Modal
      opened={isOpenModal}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="lg"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values as any))}>
        <Box className="space-y-4">
          <TextInput
            label="Nama Lengkap"
            placeholder="Masukkan Nama Lengkap"
            withAsterisk
            key={form.key("fullname")}
            disabled={createLoading || loadingRoles}
            {...form.getInputProps("fullname")}
          />
          <TextInput
            label="Email"
            placeholder="Masukkan Email"
            withAsterisk
            key={form.key("email")}
            disabled={createLoading || loadingRoles}
            {...form.getInputProps("email")}
          />
          <MultiSelect
            label="Roles"
            placeholder="Pilih Roles"
            data={roles}
            withAsterisk
            key={form.key("roles")}
            multiple
            disabled={createLoading || loadingRoles}
            {...form.getInputProps("roles")}
          />
          {!adminUser ? (
            <PasswordInput
              label="Password"
              placeholder="Masukkan Password"
              withAsterisk
              key={form.key("password")}
              disabled={createLoading || loadingRoles}
              {...form.getInputProps("password")}
            />
          ) : (
            <Box>
              <Text size="sm" fw={500}>
                Status<span className="!text-red-500">*</span>
              </Text>
              <Switch
                label={
                  <span className="font-medium">{status.toUpperCase()}</span>
                }
                checked={Boolean(status === "ACTIVE")}
                disabled={createLoading || loadingRoles}
                onChange={() =>
                  setStatus(
                    Boolean(status === "ACTIVE") ? "INACTIVE" : "ACTIVE"
                  )
                }
              />
            </Box>
          )}

          <Group justify="flex-end" align="center" gap="xs">
            <Button
              variant="outline"
              color="rgb(11, 25, 44)"
              radius="xl"
              loading={createLoading || loadingRoles}
              disabled={createLoading || loadingRoles}
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button
              variant="filled"
              color="#0B192C"
              radius="xl"
              loading={createLoading || loadingRoles}
              disabled={createLoading || loadingRoles}
              type="submit"
            >
              {adminUser ? "Update" : "Create"}
            </Button>
          </Group>
        </Box>
      </form>
    </Modal>
  );
};

export default ModalAdminUser;
