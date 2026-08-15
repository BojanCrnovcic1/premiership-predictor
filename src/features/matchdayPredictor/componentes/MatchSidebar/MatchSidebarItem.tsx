import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./MatchSidebarItems.module.scss";

export interface SidebarItemType {
  label: string;
  path: string;
  icon?: React.ReactNode | string;
}

interface Props {
  item: SidebarItemType;
  onNavigate?: () => void;
}

const SidebarItem = ({ item, onNavigate }: Props) => {
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

export default SidebarItem;
