import { LayoutDashboard, Trophy, Goal, Settings } from "lucide-react";

import type { SidebarItemType } from "./types";

export const sidebarItems: SidebarItemType[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Season Predictor",
    path: "/season-predictor",
    icon: <Trophy size={20} />,
  },
  {
    label: "Match Predictor",
    path: "/match-predictor",
    icon: <Goal size={20} />,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: <Settings size={20} />,
  },
];
