"use client";
import "@mantine/core/styles.css";
import {
  AppShell,
  Avatar,
  Box,
  Burger,
  Button,
  Group,
  LoadingOverlay,
  Menu,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getToken, getUserData, isUserLoggedIn } from "@/utils/authUtils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import Sidebar from "@/components/Sidebar";
import { ChevronDown, LogOut, Settings } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure(true);
  const [isClient, setIsClient] = useState(false);
  const isLoggedIn = isUserLoggedIn();
  const user = getUserData();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!isLoggedIn) {
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

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: opened ? 300 : 0,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar color="grey">{opened && <Sidebar />}</AppShell.Navbar>
      <AppShell.Main className="pt-8 md:pt-4">
        <AppShell.Header h={60}>
          <Group h="100%" px="md" justify="space-between">
            <Burger opened={false} onClick={toggle} size="sm" />
            <Menu shadow="md">
              <Menu.Target>
                <Button
                  variant="transparent"
                  radius="md"
                  color="black"
                  size="sm"
                  leftSection={
                    <Avatar src="/logo/wacaku-default.png" size="sm" />
                  }
                  rightSection={<ChevronDown size={16} />}
                >
                  {user.fullName}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  <div>
                    <p>Signed in as</p>
                    <p>{user.email}</p>
                  </div>
                </Menu.Label>
                <Menu.Item
                  disabled
                  leftSection={
                    <Settings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Settings
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <LogOut style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </AppShell.Header>
        <Notifications position="top-center" autoClose={3000} />
        <Box className="pt-16">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
