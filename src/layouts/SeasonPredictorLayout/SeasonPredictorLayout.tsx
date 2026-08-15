import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Menu } from "lucide-react";

import Button from "../../components/ui/Button/Button";

import styles from "./SeasonPredictorLayout.module.scss";
import SeasonSidebar from "../../features/seasonPredictor/components/SeasonSidebar/SeasonSidebar";

const SeasonPredictorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <SeasonSidebar
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

export default SeasonPredictorLayout;
