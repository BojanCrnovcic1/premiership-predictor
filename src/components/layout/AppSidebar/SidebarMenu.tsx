import SidebarItem from "./SidebarItem";

import { sidebarItems } from "./sidebar.data";

import styles from "./SidebarMenu.module.scss";

interface Props {
  onNavigate?: () => void;
}
const SidebarMenu = ({ onNavigate }: Props) => {
  return (
    <nav className={styles.menu}>
      {sidebarItems.map((item) => (
        <SidebarItem key={item.path} item={item} onNavigate={onNavigate} />
      ))}
    </nav>
  );
};

export default SidebarMenu;
