"use client";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Box,
  Button,
  Card,
  Group,
  Image,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import React from "react";
import { z } from "zod";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const schema = z.object({
    email: z.string().email("Email yang anda masukkan tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    handleLogin(values);
  };

  return (
    <Box className="h-screen flex items-center justify-center">
      <Card shadow="sm" padding="lg" radius="md" withBorder w={480}>
        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
          <Group align="center" justify="center">
            <Image
              src="/logo/logo-wacaku-black.svg"
              alt="Norway fjords"
              w={250}
              className="mb-lg"
            />
          </Group>
          <Box className="text-center">
            <Text fw={600} className="!text-2xl">
              Sign In
            </Text>
            <Text size="sm" c="dimmed">
              Login CMS dengan akun Wacaku
            </Text>
          </Box>

          <TextInput
            placeholder="Masukkan email anda"
            label="Email"
            size="md"
            key={form.key("email")}
            disabled={loading}
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Masukkan password anda"
            size="md"
            key={form.key("password")}
            disabled={loading}
            {...form.getInputProps("password")}
          />

          <Button
            color="blue"
            fullWidth
            mt="md"
            radius="sm"
            size="md"
            type="submit"
            disabled={loading}
          >
            Sign In
            {loading && (
              <LoaderCircle className="animate-spin font-semibold text-lg ml-2" />
            )}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default Login;
