import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Menu } from "lucide-react";

import Button from "../../components/ui/Button/Button";

import styles from "./MatchPredictorLayout.module.scss";
import MatchSidebar from "../../features/matchdayPredictor/componentes/MatchSidebar/MatchSidebar";

const SeasonPredictorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <MatchSidebar
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
