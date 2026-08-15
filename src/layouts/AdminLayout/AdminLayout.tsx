import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Menu } from "lucide-react";

import Button from "../../components/ui/Button/Button";

import styles from "./AdminLayout.module.scss";
import AdminSidebar from "../../features/admin/components/AdminSidebar/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

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

export default AdminLayout;
