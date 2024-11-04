import { useAuth } from "@/features/auth/hooks/useAuth";
import { Box } from "@mantine/core";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@mantine/hooks";

interface ISidebarMenuProps {
  toggle: () => void;
}

const SidebarPublisher = ({ toggle }: ISidebarMenuProps) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const t = useTranslations("common");
  const mdMediaQuery = useMediaQuery("(min-width: 768px)");
  const menus = [
    {
      id: "analytics",
      name: t("menu.dashboard"),
      href: "/analytics",
      icon: "ic_dashboard.svg",
      type: "route",
    },
    {
      id: "jual_ebook",
      name: t("menu.sell-ebook"),
      href: "/ebook",
      icon: "ic_book.svg",
      type: "route",
    },
    {
      id: "acquisition",
      name: t("menu.acquisition"),
      href: "/acquisition",
      icon: "ic_acquisition.svg",
      type: "route",
    },
    {
      id: "bantuan",
      name: t("menu.help"),
      href: "https://support.wacaku.com/inkcraft-by-wacaku/tentang-inkcraft",
      icon: "ic_help.svg",
      type: "link",
    },
  ];

  const onClickMenu = (navigate: string, type: string) => {
    if (type === "link") return window.open(navigate, "_blank");
    router.push(navigate);
  };

  return (
    <Box className="overflow-y-auto text-white mt-2 relative h-screen">
      {menus.map((item, key) => (
        <Box
          className={`mb-2 text-md font-medium px-4 md:px-4 py-3 hover:cursor-pointer hover:bg-white hover:bg-opacity-10 ${
            pathname.startsWith(`${item.href}`) && "bg-white bg-opacity-10"
          }`}
          key={key}
          onClick={() => {
            onClickMenu(item.href, item.type);
            if (!mdMediaQuery) toggle();
          }}
        >
          <div className="flex gap-3">
            <Image
              alt={item.name}
              src={`/icons/${item.icon}`}
              width={20}
              height={20}
            />
            {item.name}
          </div>
        </Box>
      ))}
      <Box
        className={`md:hidden mb-2 text-md font-medium px-4 md:px-4 py-3 hover:cursor-pointer hover:bg-white hover:bg-opacity-10 ${
          pathname.startsWith(`/profile`) && "bg-white bg-opacity-10"
        }`}
        onClick={() => {
          onClickMenu("/profile", "route");
          if (!mdMediaQuery) toggle();
        }}
      >
        <div className="flex gap-3">
          <User height={20} width={20} />
          {t("menu.profile")}
        </div>
      </Box>
      <div
        className="mb-2 text-md font-medium px-4 md:px-4 py-3 hover:cursor-pointer hover:bg-red-600/15"
        onClick={logout}
      >
        <div className="flex gap-3 cursor-pointer text-red-600 font-bold">
          <LogOut height={20} width={20} />
          {t("menu.logout")}
        </div>
      </div>
      <Box className="absolute bottom-4 right-4">
        <LanguageSwitcher />
      </Box>
    </Box>
  );
};

export default SidebarPublisher;
