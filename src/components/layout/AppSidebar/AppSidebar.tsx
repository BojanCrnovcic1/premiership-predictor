import clsx from "clsx";

import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

import styles from "./AppSidebar.module.scss";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const AppSidebar = ({ isOpen = true, onClose }: Props) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={clsx(styles.overlay, {
          [styles.showOverlay]: isOpen,
        })}
        onClick={onClose}
      />

      <aside
        className={clsx(styles.sidebar, {
          [styles.open]: isOpen,
        })}
      >
        <SidebarHeader />

        <SidebarMenu onNavigate={onClose} />

        <SidebarFooter />
      </aside>
    </>
  );
};

export default AppSidebar;
