import { BannerTypeEnum } from "@/features/banner/data/enums/banner.enum";
import {
  Autocomplete,
  Box,
  Button,
  Group,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import React from "react";
import { z } from "zod";

interface IModalBannerProps {
  isOpenModal: boolean;
  closeModal: () => void;
  loading: boolean;
  length?: number;
}

const ModalBanner = ({
  isOpenModal,
  closeModal,
  loading,
  length,
}: IModalBannerProps) => {
  const schema = z.object({
    position: z.number().int().min(0, "Posisi waajib diisi"),
    targetType: z.string().nonempty("Tipe Banner wajib diisi"),
    bannerUrl: z.string().nonempty("Banner wajib diisi"),
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      position: 0,
      targetType: "",
      bannerUrl: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values);

    // const payload = {
    //   position: 5,
    //   bannerUrl:
    //     "https://waca-dev-cdn.sgp1.cdn.digitaloceanspaces.com/asstes/banner/36985151-31b9-4efd-bf12-7b326d3365e7.jpg",
    //   extra: [ //for post
    //     {
    //       Key: "postId",
    //       Value: "6353c8d74bf5170f14ac6630",
    //     },
    //     {
    //       Key: "postTitle",
    //       Value: "In Another Place",
    //     },
    //     {
    //       Key: "username",
    //       Value: "clyanabanhg",
    //     },
    //   ],
    //   targetType: "BANNER_POST",
    //   targetUrl: "/post/in-another-place-6353c8d74bf5170f14ac6630",
    // };

    // extra user:
    // [
    //     {
    //         "Key": "userId",
    //         "Value": "63513afc89971e043311f077"
    //     },
    //     {
    //         "Key": "username",
    //         "Value": "anotherjy"
    //     },
    //     {
    //         "Key": "fullName",
    //         "Value": "another jy"
    //     }
    // ]

    // extra external link:
    // [
    //     {
    //         "Key": "url",
    //         "Value": "httpsd/iojiji"
    //     }
    // ]

    // extra topup: []
  };

  const bannerTypes = [
    {
      label: "Post",
      value: BannerTypeEnum.BANNER_POST,
    },
    {
      label: "User",
      value: BannerTypeEnum.BANNER_USER,
    },
    {
      label: "External Link",
      value: BannerTypeEnum.BANNER_EXTERNAL_LINK,
    },
    {
      label: "Top Up",
      value: BannerTypeEnum.BANNER_TOP_UP,
    },
  ];
  return (
    <Modal
      opened={isOpenModal}
      onClose={() => null}
      withCloseButton={false}
      centered
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box className="space-y-4">
          <input type="file" />
          <TextInput
            placeholder="Masukkan Posisi Banner"
            label="Position"
            withAsterisk
            key={form.key("position")}
            disabled={loading}
            {...form.getInputProps("position")}
          />
          <Select
            label="Type Target"
            placeholder="Pilih tipe banner"
            withAsterisk
            data={bannerTypes}
            disabled={loading}
            key={form.key("typeTarget")}
            {...form.getInputProps("typeTarget")}
          />
          <Autocomplete
            label="Your favorite library"
            placeholder="Pick value or enter anything"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
          <Group justify="flex-end" align="center" gap="sm">
            <Button
              variant="outline"
              color="rgb(11, 25, 44)"
              radius="xl"
              loading={loading}
              disabled={loading}
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              color="rgb(11, 25, 44)"
              radius="xl"
              loading={loading}
              disabled={loading}
              type="submit"
            >
              Create
            </Button>
          </Group>
        </Box>
      </form>
    </Modal>
  );
};

export default ModalBanner;
