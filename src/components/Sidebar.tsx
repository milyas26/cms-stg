import { useAuth } from "@/features/auth/hooks/useAuth";
import { Avatar, Box, Image, Text } from "@mantine/core";
import { Coins, IdCard, Layers } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { getUserData } from "@/utils/authUtils";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = getUserData();
  const menus = [
    {
      id: "dashboard",
      name: "User Management",
      desc: "Manage user and roles",
      childs: [
        {
          id: "user",
          name: "User Admin",
          href: "/dashboard/admin",
          icon: <IdCard size={20} />,
        },
      ],
    },
    {
      id: "cms",
      name: "CMS",
      desc: "Content Management System",
      childs: [
        {
          id: "banners",
          name: "Banners",
          href: "/cms/banner",
          icon: <Layers size={20} />,
        },
      ],
    },
    {
      id: "monetisaku",
      name: "Monetisaku",
      desc: "Monetisaku Management",
      childs: [
        {
          id: "enrollment",
          name: "Enrollment",
          href: "/monetisaku/enrollment",
          icon: <Coins size={20} />,
        },
        {
          id: "withdrawal",
          name: "Withdrawal",
          href: "/monetisaku/withdrawal",
          icon: <Coins size={20} />,
        },
      ],
    },
    {
      id: "transaction",
      name: "Transaction",
      desc: "Transaction Management",
      childs: [
        {
          id: "transaction-adjustment",
          name: "Transaction Adjustment",
          href: "/transaction/adjustment",
          icon: <Coins size={20} />,
        },
      ],
    },
  ];

  return (
    <Box className="overflow-y-auto text-white mt-2 relative h-screen space-y-4 px-4">
      <Box className="flex justify-between pt-2 items-center">
        <Image
          src="/logo/logo-wacaku-red.svg"
          alt="Norway fjords"
          w={150}
          className="mb-lg mx-auto"
        />
      </Box>
      <Box className="flex items-center justify-center flex-col pb-4">
        <Avatar radius="xl" size="lg" />
        <Text fw={600}>{user.fullName}</Text>
        <Text c="dimmed" size="sm">
          {user.email}
        </Text>
      </Box>
      {menus.map((item, key) => (
        <Box key={key} className="space-y-2">
          <Box>
            <Text fw={600} size="xs" tt="uppercase" px="md" c="indigo">
              {item.name}
            </Text>
            <Text size="xs" tt="capitalize" px="md" c="gray">
              {item.desc}
            </Text>
          </Box>
          <Box>
            {item.childs.map((child, key) => (
              <Box
                key={key}
                className={`mb-2 text-sm px-4 py-3 rounded-md hover:cursor-pointer hover:bg-white hover:bg-opacity-10 ${
                  pathname === child.href
                    ? "bg-white/10 text-white"
                    : "text-slate-300"
                }`}
                onClick={() => router.push(child.href)}
              >
                <div className="flex gap-3 cursor-pointer">
                  {child.icon}
                  {child.name}
                </div>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
