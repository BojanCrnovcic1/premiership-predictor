import clsx from "clsx";

import Logo from "../../../../components/ui/Logo/Logo";
import SidebarItem from "../../../../components/layout/AppSidebar/SidebarItem";

import { matchSidebarItems } from "./matchSidebarItems";

import styles from "./MatchSidebar.module.scss";
import SidebarFooter from "../../../../components/layout/AppSidebar/SidebarFooter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MatchSidebar = ({ isOpen, onClose }: Props) => {
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

        <div className={styles.gameTitle}>Match Predictor</div>

        <nav className={styles.navigation}>
          {matchSidebarItems.map((item) => (
            <SidebarItem key={item.path} item={item} onNavigate={onClose} />
          ))}
        </nav>
        <SidebarFooter />
      </aside>
    </>
  );
};

export default MatchSidebar;
