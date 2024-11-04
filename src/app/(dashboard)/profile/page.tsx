"use client";

import React from "react";
import { useForm } from "@mantine/form";
import { getUser } from "@/utils/authUtils";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Grid,
  Group,
  Image,
  TextInput,
  Textarea,
} from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { User } from "@/features/auth/domain/entities/User";
import { notifications } from "@mantine/notifications";
import { PencilLine } from "lucide-react";
import { FileApiRepository } from "@/features/files/domain/repositories/FileApiRepository";
import { useTranslations } from "next-intl";

const fileRepository = new FileApiRepository();
const Profile = () => {
  const userData = getUser();
  const { getProfileUser, updateUser, loading, setLoading } = useAuth();
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const t = useTranslations("profile");
  const [uploadingPhoto, setUploadingPhoto] = React.useState(false);

  const schema = z.object({
    name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
    username: z
      .string()
      .min(8, { message: "Username minimal 8 karakter" })
      .regex(/^[a-zA-Z0-9._]+$/, {
        message:
          "Username hanya boleh menggunakan huruf, angka, garis bawah, dan titik",
      }),
    description: z.string().min(2, { message: "Deskripsi minimal 2 karakter" }),
    photoURL: z.string().min(2, { message: "URL foto minimal 2 karakter" }),
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: userData.fullName ?? "",
      username: userData.username ?? "",
      description: userData.biography ?? "",
      photoURL: userData ? userData.photoURL : "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const payload = {
        photoURL: values.photoURL,
        fullName: values.name,
        email: userData.email,
        username: values.username,
        phoneNumber: userData.phoneNumber || "",
        biography: values.description,
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth,
      };

      const resUpdate = await updateUser(payload as User);
      if (resUpdate) {
        const res = await getProfileUser();
        notifications.show({
          title: "Success",
          message: "Berhasil mengubah profile!",
        });
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", userData.username);

      try {
        setUploadingPhoto(true);
        const res = await fileRepository.updateProfilePhoto(formData);
        if (res.result) {
          form.setFieldValue("photoURL", res.result);
          notifications.show({
            title: "Success",
            message: "Berhasil mengubah foto profile!",
          });
        }
      } catch (error) {
        notifications.show({
          title: "Error",
          color: "red",
          message: "Gagal mengubah foto profile!",
        });
      } finally {
        setUploadingPhoto(false);
      }
    }
  };

  return (
    <Box className="relative">
      <div className="w-full h-40 md:h-56 bg-slate-300 flex items-center justify-center rounded-md">
        <p>IMAGE BANNER COMING SOON</p>
      </div>
      <div className="px-6 relative -top-16 md:top-0 md:flex gap-6 border-b border-slate-300 mb-4">
        <div className="relative md:-top-16 w-full md:w-fit flex items-center justify-center md:block">
          <div className="aspect-square cursor-pointer relative">
            <Image
              src={form.values.photoURL}
              alt={userData.username}
              fallbackSrc="/icons/profile_icon.svg"
              radius="100%"
              h={150}
              w={150}
              onClick={() => imageInputRef.current?.click()}
            />
            <ActionIcon
              variant="white"
              size="lg"
              radius="xl"
              style={{
                position: "absolute",
              }}
              className="absolute bottom-0 right-2"
              onClick={() => imageInputRef.current?.click()}
            >
              <PencilLine />
            </ActionIcon>
          </div>
          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            accept="image/png, image/jpeg, image/jpg"
            onChange={onChangeImage}
            disabled={uploadingPhoto || loading}
          />
        </div>
        <div className="py-4 md:pl-8 space-y-4">
          <div className="text-center md:text-left">
            <p className="text-red-600 capitalize">{userData?.role}</p>
            <p className="text-2xl font-bold">{userData?.fullName}</p>
            <p className="text-sm">@{userData?.username}</p>
          </div>
          <p className="text-slate-600 text-center md:text-left">
            {userData?.biography}
          </p>
        </div>
      </div>

      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="relative -top-16 md:top-0"
      >
        <Grid>
          <Grid.Col
            span={{
              xs: 12,
              md: 5,
            }}
            className="space-y-4"
          >
            <TextInput
              label={t("form.name")}
              size="md"
              placeholder={t("form.name-placeholder")}
              key={form.key("name")}
              disabled={uploadingPhoto || loading}
              {...form.getInputProps("name")}
            />
            <TextInput
              label={t("form.username")}
              size="md"
              placeholder={t("form.username-placeholder")}
              key={form.key("username")}
              disabled={uploadingPhoto || loading}
              {...form.getInputProps("username")}
            />
            <Textarea
              label={t("form.description")}
              size="md"
              rows={4}
              placeholder={t("form.description-placeholder")}
              key={form.key("description")}
              disabled={uploadingPhoto || loading}
              {...form.getInputProps("description")}
            />

            <Group align="center" justify="flex-end">
              <Button
                type="submit"
                loading={loading}
                disabled={uploadingPhoto || loading}
                color="#0B192C"
                className="min-w-[150px]"
              >
                {t("form.submit")}
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  );
};

export default Profile;
