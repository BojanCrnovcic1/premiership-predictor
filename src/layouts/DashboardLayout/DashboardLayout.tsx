import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Menu } from "lucide-react";

import Button from "../../components/ui/Button/Button";
import AppSidebar from "../../components/layout/AppSidebar";

import styles from "./DashboardLayout.module.scss";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={styles.content}>
        <Button
          variant="ghost"
          className={styles.menuButton}
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </Button>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
