import clsx from "clsx";

import Logo from "../../../../components/ui/Logo/Logo";
import SidebarItem from "../../../../components/layout/AppSidebar/SidebarItem";

import { seasonSidebarItems } from "./seasonSidebarItems";

import styles from "./SeasonSidebar.module.scss";
import SidebarFooter from "../../../../components/layout/AppSidebar/SidebarFooter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SeasonSidebar = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <div
        className={clsx(styles.overlay, {
          [styles.show]: isOpen,
        })}
        onClick={onClose}
      />

      <aside
        className={clsx(styles.sidebar, {
          [styles.open]: isOpen,
        })}
      >
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.gameTitle}>Season Predictor</div>

        <nav className={styles.navigation}>
          {seasonSidebarItems.map((item) => (
            <SidebarItem key={item.path} item={item} onNavigate={onClose} />
          ))}
        </nav>
        <SidebarFooter />
      </aside>
    </>
  );
};

export default SeasonSidebar;
