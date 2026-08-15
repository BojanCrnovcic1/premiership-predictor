import type { SidebarItemType } from "../../../../components/layout/AppSidebar";

export const matchSidebarItems: SidebarItemType[] = [
  {
    label: "Dashboard",
    path: "/match-predictor",
    icon: "🏠",
  },
  {
    label: "Predictions",
    path: "/match-predictor/predictions",
    icon: "⚽",
  },
  {
    label: "My Predictions",
    path: "/match-predictor/my-predictions",
    icon: "📝",
  },
  {
    label: "My Leagues",
    path: "/match-predictor/my-leagues",
    icon: "🏆",
  },
  {
    label: "Create League",
    path: "/match-predictor/create-league",
    icon: "➕",
  },
  {
    label: "Public Leagues",
    path: "/match-predictor/public-leagues",
    icon: "🌍",
  },
  {
    label: "Join League",
    path: "/match-predictor/join-league",
    icon: "🔑",
  },
  {
    label: "Global Ranking",
    path: "/match-predictor/global-ranking",
    icon: "🌐",
  },
];
