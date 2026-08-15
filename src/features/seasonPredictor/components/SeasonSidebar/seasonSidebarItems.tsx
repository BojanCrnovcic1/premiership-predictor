import type { SidebarItemType } from "../../../../components/layout/AppSidebar/types";

export const seasonSidebarItems: SidebarItemType[] = [
  {
    label: "Dashboard",
    path: "/season-predictor",
    icon: "🏠",
  },
  {
    label: "Create Prediction",
    path: "/season-predictor/create-prediction",
    icon: "📊",
  },
  {
    label: "My Prediction",
    path: "/season-predictor/my-prediction",
    icon: "📝",
  },
  {
    label: "My Leagues",
    path: "/season-predictor/my-leagues",
    icon: "🏆",
  },
  {
    label: "Create League",
    path: "/season-predictor/create-league",
    icon: "➕",
  },
  {
    label: "Public Leagues",
    path: "/season-predictor/public-leagues",
    icon: "🌍",
  },
  {
    label: "Join League",
    path: "/season-predictor/join-league",
    icon: "🔑",
  },
  {
    label: "Global Ranking",
    path: "/season-predictor/global-ranking",
    icon: "🌐",
  },
];
