import React from "react";
import Logo from "../../../components/ui/Logo";
import styles from "./Footer.module.scss"; // 1. Uvezi kao objekat 'styles'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* DESKTOP VIEW */}
        <div className={styles.footerDesktop}>
          <div className={styles.footerBrand}>
            <Logo />
            <p className={styles.brandDesc}>
              The ultimate platform for predicting football matches and full
              season standings.
            </p>
          </div>

          <div className={styles.footerNav}>
            <div className={styles.navGroup}>
              <h4>Platform</h4>
              <a href="#season">Season Predictor</a>
              <a href="#matchday">Matchday Predictor</a>
              <a href="#leaderboard">Leaderboard</a>
            </div>

            <div className={styles.navGroup}>
              <h4>Company</h4>
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
              <a href="#faq">FAQ</a>
            </div>

            <div className={styles.navGroup}>
              <h4>Legal</h4>
              <a href="#terms">Terms of Service</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className={styles.footerMobile}>
          <div className={styles.mobileLinks}>
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={styles.mobileLogo}>
            <Logo />
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
