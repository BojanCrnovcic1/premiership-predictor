import type { SidebarItemType } from "../../../../components/layout/AppSidebar";

export const adminSidebarItems: SidebarItemType[] = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: "🏠",
  },
  {
    label: "Actual Standings",
    path: "/admin/standings",
    icon: "📊",
  },
  {
    label: "Gameweeks & Matches",
    path: "/admin/gameweeks",
    icon: "⚽",
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: "👥",
  },
];
