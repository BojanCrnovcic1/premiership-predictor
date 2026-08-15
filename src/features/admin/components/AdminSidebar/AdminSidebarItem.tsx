import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./AdminSidebarItems.module.scss";

export interface SidebarItemType {
  label: string;
  path: string;
  icon?: React.ReactNode | string;
}

interface Props {
  item: SidebarItemType;
  onNavigate?: () => void;
}

const AdminSidebarItem = ({ item, onNavigate }: Props) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        clsx(styles.item, {
          [styles.active]: isActive,
        })
      }
      onClick={onNavigate}
    >
      <span className={styles.icon}>{item.icon}</span>
      <span className={styles.label}>{item.label}</span>
    </NavLink>
  );
};

export default AdminSidebarItem;
