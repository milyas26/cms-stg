"use client";
import { EmptySVG } from "@/assets/icons/EmptySVG";
import { useAcquisition } from "@/features/acquisition/hooks/useAcquisition";
import { BannerDefault } from "@/features/common/domain/constants/common.constants";
import {
  eventStatusColors,
  eventStatusWords,
} from "@/features/event/domain/enums/eventEnums";
import { useAcquisitionStore } from "@/stores/acquisitionStore";
import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Input,
  Pagination,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const Acquisition = () => {
  const router = useRouter();
  const { getAcquisitionList, initialFetch, loading } = useAcquisition();
  const query = useRef<HTMLInputElement>(null);
  const mdMediaQuery = useMediaQuery("(min-width: 768px)");
  const t = useTranslations("acquisition");
  const {
    acquisitionList,
    acquisitionListPagination,
    setAcquisitionListPagination,
    clearParticipantList,
  } = useAcquisitionStore();

  useEffect(() => {
    if (!initialFetch.current.acquisitionList) {
      getAcquisitionList(
        acquisitionListPagination.page,
        acquisitionListPagination.perPage,
        acquisitionListPagination.query,
        acquisitionListPagination.status
      );
    }
  }, []);

  const handleSearchProgram = () => {
    initialFetch.current.acquisitionList = false;
    setAcquisitionListPagination({
      ...acquisitionListPagination,
      query: query.current?.value ?? "",
    });
    getAcquisitionList(
      acquisitionListPagination.page,
      acquisitionListPagination.perPage,
      query.current?.value ?? "",
      acquisitionListPagination.status
    );
  };

  return (
    <Box className="space-y-4">
      <Group className="gap-4" justify="space-between">
        <Title order={mdMediaQuery ? 2 : 3}>{t("title")}</Title>
        <Group gap="md">
          <Box className="hidden md:block">
            <Group className="border border-slate-300 px-2 py-0 rounded-md bg-slate-50">
              <Input
                variant="unstyled"
                placeholder={t("search-placeholder")}
                className="w-80"
                ref={query}
                disabled={loading}
                onKeyDown={(e) => e.key === "Enter" && handleSearchProgram()}
              />
              <Button
                variant="white"
                size="compact-sm"
                className="text-black"
                color="black"
                loading={loading}
                disabled={loading}
                onClick={handleSearchProgram}
              >
                {t("search")}
              </Button>
            </Group>
          </Box>
          <Button
            variant="filled"
            color="red"
            onClick={() => {
              clearParticipantList();
              router.push("/acquisition/new");
            }}
            loading={loading}
            disabled={loading}
          >
            {t("create-new-program")}
          </Button>
        </Group>
      </Group>
      <Box className="md:hidden">
        <Group className="border border-slate-300 px-2 py-0 rounded-md bg-slate-50">
          <Input
            variant="unstyled"
            placeholder={t("search-placeholder")}
            className="flex-1"
            ref={query}
            disabled={loading}
            onKeyDown={(e) => e.key === "Enter" && handleSearchProgram()}
          />
          <Button
            variant="white"
            size="compact-sm"
            className="text-black"
            color="black"
            loading={loading}
            disabled={loading}
            onClick={handleSearchProgram}
          >
            {t("search")}
          </Button>
        </Group>
      </Box>
      <Box>
        {loading ? (
          <Grid>
            {[...Array(4)].map((_, index) => (
              <Grid.Col span={{ xs: 12, base: 6, lg: 3 }} key={index}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Skeleton height={160} />
                  </Card.Section>
                  <Card.Section className="space-y-2 p-4">
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={30} width="100%" />
                    <Skeleton height={30} width="100%" />
                  </Card.Section>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Box>
            {!acquisitionList.length ? (
              <Box className="mx-auto max-w-md space-y-8 h-[80vh] flex items-center justify-center flex-col">
                <Card
                  shadow="sm"
                  className="text-center flex flex-col justify-center items-center space-y-2 bg-white"
                >
                  <Box className="flex items-center justify-center">
                    <EmptySVG />
                  </Box>
                  <Text c="gray" size="sm">
                    {t("desc-new-1")}{" "}
                    <a
                      href="https://support.wacaku.com/"
                      target="_blank"
                      className="text-blue-600 underline font-semibold"
                    >
                      {t("desc-new-2")}
                    </a>
                  </Text>
                </Card>
                <Text c="gray" className="mx-auto text-center" size="sm">
                  {t("desc-new-3")}{" "}
                  <span className="text-red-600 font-semibold">
                    {t("create-new-program")}
                  </span>{" "}
                  {t("desc-new-4")}
                </Text>
              </Box>
            ) : (
              <Grid>
                {acquisitionList.map((acquisition, i) => (
                  <Grid.Col span={{ xs: 12, base: 12, md: 6, lg: 3 }} key={i}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                      <Card.Section>
                        <Image
                          src={acquisition.banner}
                          height={160}
                          alt="acquisition"
                          className="aspect-[12/8]"
                          fallbackSrc={BannerDefault}
                        />
                      </Card.Section>
                      <Text
                        fw={600}
                        size="xl"
                        mt="md"
                        className="cursor-pointer min-h-12"
                        lineClamp={2}
                        lh={1.2}
                        onClick={() =>
                          router.push(`/acquisition/${acquisition._id}`)
                        }
                      >
                        {acquisition.title}
                      </Text>
                      <Group mt="sm" mb="xs" justify="space-between" gap={2}>
                        <Text size="sm">
                          {`${acquisition.totalParticipant}/${
                            Number(acquisition.maxParticipant) < 1
                              ? "∞"
                              : acquisition.maxParticipant
                          } ${t("participant")}`}
                        </Text>
                        <Badge
                          color={
                            eventStatusColors[
                              acquisition.status as keyof typeof eventStatusColors
                            ]
                          }
                          size="lg"
                          tt="none"
                          fw={500}
                        >
                          {
                            t(eventStatusWords[
                              acquisition.status as keyof typeof eventStatusWords
                            ])
                          }
                        </Badge>
                      </Group>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            )}
            <Group justify="end">
              <Pagination
                total={Math.ceil(
                  acquisitionListPagination.total /
                    acquisitionListPagination.perPage
                )}
                value={acquisitionListPagination.page}
                onChange={(page: number) => {
                  initialFetch.current.acquisitionList = false;
                  setAcquisitionListPagination({
                    ...acquisitionListPagination,
                    page,
                  });

                  getAcquisitionList(
                    page,
                    acquisitionListPagination.perPage,
                    acquisitionListPagination.query,
                    acquisitionListPagination.status
                  );
                }}
                mt="sm"
              />
            </Group>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Acquisition;
