"use client";
import InkcraftTable from "@/components/InkcraftTable";
import { Banner } from "@/features/banner/domain/entities/Banner";
import useBanner from "@/features/banner/hooks/useBanner";
import { useBannerStore } from "@/stores/bannerStore";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Pencil, Plus, Trash } from "lucide-react";
import React from "react";
import ModalBanner from "./component/ModalBanner";

const BannerPage = () => {
  const { banners } = useBannerStore();
  const { getAllBanners, loading, handleDeleteBanner } = useBanner();
  const [isOpenModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [selectedBanner, setSelectedBanner] = React.useState<Banner | null>(
    null
  );
  const [
    isOpenConfirmDelete,
    { open: openConfirmDelete, close: closeConfirmDelete },
  ] = useDisclosure(false);

  const columns = [
    {
      key: "position",
      title: "Order",
      width: "10%",
      render: (_: number, banner: Banner) => {
        return <Text className="text-center">{banner.position}</Text>;
      },
    },
    {
      key: "image",
      title: "Image",
      width: "auto",
      render: (_: number, data: Banner) => {
        return (
          <Image
            radius="sm"
            src={data.bannerUrl}
            alt="banner"
            w={280}
            fallbackSrc="https://placehold.co/280x150?text=No+Image"
          />
        );
      },
    },
    {
      key: "targetUrl",
      title: "Target",
      width: "40%",
    },
    {
      key: "action",
      title: "Action",
      width: "8%",
      render: (_: number, data: Banner) => {
        return (
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              radius="sm"
              size="md"
              onClick={() => {
                setSelectedBanner(data);
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
                setSelectedBanner(data);
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
    getAllBanners();
  }, []);

  return (
    <Box className="space-y-4">
      <Group justify="space-between">
        <Title order={2}>Banner</Title>
        <Button
          variant="filled"
          color="#0B192C"
          radius="sm"
          loading={loading}
          disabled={loading}
          leftSection={<Plus size={16} />}
          onClick={openModal}
        >
          Create Banner
        </Button>
      </Group>
      <InkcraftTable columns={columns} dataSource={banners} loading={loading} />

      <ModalBanner
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        length={banners.length}
        selectedBanner={selectedBanner}
        setSelectedBanner={setSelectedBanner}
      />

      <Modal
        opened={isOpenConfirmDelete}
        onClose={closeConfirmDelete}
        withCloseButton={false}
        centered
      >
        <Box className="space-y-4 text-center">
          <Text fw="bold" size="md">
            Apakah anda yakin ingin menghapus banner ini?
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
                handleDeleteBanner(selectedBanner!, closeConfirmDelete)
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

export default BannerPage;
