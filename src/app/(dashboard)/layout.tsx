"use client";
import "@mantine/core/styles.css";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Group,
  Image,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { getUser } from "@/utils/authUtils";
import { RoleEnum } from "@/features/auth/domain/enum/auth.enum";
import SidebarWriter from "@/components/SidebarWriter";
import SidebarPublisher from "@/components/SidebarPublisher";
import { usePathname, useRouter } from "next/navigation";
import { sidebarMappings, topbarMappings } from "@/utils/sidebarMapping";
import React, { useEffect, useState } from "react";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { ChevronLeft, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpened, { toggle }] = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const user = getUser();
  const router = useRouter();
  const pathname = usePathname();
  const matchesMediaQuery = useMediaQuery("(min-width: 768px)");
  const t = useTranslations("common");

  const excludeNav = ["/ebook/bulk"];

  const normalizePath = (path: string) => {
    return path.replace(/\/$/, "");
  };

  const normalizedPathname = normalizePath(pathname);

  const SidebarComponent = Object.keys(sidebarMappings).find((sidebarPath) =>
    normalizedPathname.startsWith(normalizePath(sidebarPath))
  );

  const TopbarCompponent = Object.keys(topbarMappings).find((topbarPath) =>
    normalizedPathname.startsWith(normalizePath(topbarPath))
  );

  const SidebarMenu =
    user?.role === RoleEnum.PUBLISHER ? SidebarPublisher : SidebarWriter;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!user) {
    router.push("/login");
    return (
      <Box className="flex items-center justify-center h-screen">
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 1 }}
        />
      </Box>
    );
  }

  const menuMode = localStorage.getItem("menuMode");

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: excludeNav.includes(pathname)
          ? 0
          : desktopOpened || mobileOpened
          ? 300
          : 50,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Box className="md:hidden bg-[#0B192C] py-3 px-4">
          {TopbarCompponent ? (
            React.createElement(topbarMappings[TopbarCompponent], {
              toggle,
            })
          ) : (
            <Box>
              {false ? (
                <Group align="center" gap="sm">
                  <ActionIcon
                    variant="transparent"
                    aria-label="Menu"
                    onClick={() => router.push("/main-mobile-menu")}
                    color="white"
                  >
                    <ChevronLeft />
                  </ActionIcon>
                  <Text c="white">{t("back-to-main-menu")}</Text>
                </Group>
              ) : (
                <Group align="center" justify="space-between">
                  <Image src="/logo/pena-white.svg" alt="inkcraft" w={100} />
                  {!excludeNav.includes(pathname) && (
                    <ActionIcon
                      variant="transparent"
                      aria-label="Menu"
                      onClick={toggle}
                      color="white"
                    >
                      <Menu />
                    </ActionIcon>
                  )}
                </Group>
              )}
            </Box>
          )}
        </Box>
      </AppShell.Header>
      {!excludeNav.includes(pathname) && (
        <AppShell.Navbar color="grey">
          {SidebarComponent ? (
            React.createElement(sidebarMappings[SidebarComponent], {
              toggleSidebar: matchesMediaQuery ? toggleDesktop : toggle,
              sidebarOpened: matchesMediaQuery ? desktopOpened : mobileOpened,
            })
          ) : (
            <>
              <Box className="flex justify-between pt-2 items-center" p="md">
                <Image
                  src="/logo/pena-white.svg"
                  alt="inkcraft"
                  className="!w-[100px]"
                />
                <Box className="hidden md:block">
                  <Avatar
                    radius="xl"
                    src={user.photoURL}
                    alt={user.fullName}
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => router.push("/profile")}
                  />
                </Box>
                <Box className="block md:hidden">
                  <ActionIcon
                    variant="transparent"
                    aria-label="Menu"
                    onClick={toggle}
                    color="white"
                  >
                    <X />
                  </ActionIcon>
                </Box>
              </Box>
              <SidebarMenu
                toggle={matchesMediaQuery ? toggleDesktop : toggle}
              />
            </>
          )}
        </AppShell.Navbar>
      )}
      <AppShell.Main className="pt-8 md:pt-4">
        <Notifications position="top-center" autoClose={3000} />
        <Box className="pt-14 md:pt-0">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
