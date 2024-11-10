"use client";
import InkcraftTable from "@/components/InkcraftTable";
import { Banner } from "@/features/banner/domain/entities/Banner";
import useBanner from "@/features/banner/hooks/useBanner";
import { useBannerStore } from "@/stores/bannerStore";
import { Box, Button, Group, Image, Text, Title } from "@mantine/core";
import React from "react";

const BannerPage = () => {
  const { banners } = useBannerStore();
  const { getAllBanners, loading } = useBanner();
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
          <Button
            variant="light"
            color="blue"
            radius="sm"
            size="xs"
            onClick={() => console.log(data)}
          >
            Edit
          </Button>
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
        >
          Create Banner
        </Button>
      </Group>
      <InkcraftTable columns={columns} dataSource={banners} loading={loading} />
    </Box>
  );
};

export default BannerPage;
