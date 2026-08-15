// src/layouts/MainLayout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      {/* Header sa logom i dugmadima za gornju navigaciju */}
      <Header />

      {/* Ovdje se dinamicki učitava Home / Landing ili druga javna stranica */}
      <main className={styles.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
