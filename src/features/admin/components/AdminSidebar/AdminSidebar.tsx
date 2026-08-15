import clsx from "clsx";

import Logo from "../../../../components/ui/Logo/Logo";
import SidebarItem from "../../../../components/layout/AppSidebar/SidebarItem";

import { adminSidebarItems } from "./adminSidebarItems";

import styles from "./AdminSidebar.module.scss";
import SidebarFooter from "../../../../components/layout/AppSidebar/SidebarFooter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: Props) => {
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

        <div className={styles.gameTitle}>Admin Panel</div>

        <nav className={styles.navigation}>
          {adminSidebarItems.map((item) => (
            <SidebarItem key={item.path} item={item} onNavigate={onClose} />
          ))}
        </nav>
        <SidebarFooter />
      </aside>
    </>
  );
};

export default AdminSidebar;
