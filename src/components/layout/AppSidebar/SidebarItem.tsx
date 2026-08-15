import { NavLink } from "react-router-dom";

import type { SidebarItemType } from "./types";

import styles from "./SidebarItem.module.scss";

interface Props {
  item: SidebarItemType;
  onNavigate?: () => void;
}

const SidebarItem = ({ item, onNavigate }: Props) => {
  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={({ isActive }) =>
        isActive ? `${styles.item} ${styles.active}` : styles.item
      }
    >
      <span className={styles.icon}>{item.icon}</span>

      <span>{item.label}</span>
    </NavLink>
  );
};

export default SidebarItem;
