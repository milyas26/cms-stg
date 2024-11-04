import SidebarEbook from "@/components/SidebarEbook";
import SidebarPost from "@/components/SidebarPost";
import TopbarEbook from "@/components/TopbarEbook";
import TopbarPost from "@/components/TopbarPost";

export const sidebarMappings: { [key: string]: React.ComponentType<any> } = {
  "/post/editor": SidebarPost,
  "/ebook/single": SidebarEbook,
};

export const topbarMappings: { [key: string]: React.ComponentType<any> } = {
  "/post/editor": TopbarPost,
  "/ebook/single": TopbarEbook,
  "/main-mobile-menu": () => null,
};