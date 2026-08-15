import { Outlet } from "react-router-dom";

import Logo from "../../components/ui/Logo/Logo";

import styles from "./AuthLayout.module.scss";

const AuthLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <Logo />

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
