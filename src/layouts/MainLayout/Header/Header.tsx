import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MobileMenu from "../MobileMenu/MobileMenu";
import styles from "./Header.module.scss";
import Button from "../../../components/ui/Button";
import Logo from "../../../components/ui/Logo";
import { useAuth } from "../../../features/auth/hooks/useAuth";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Brand */}
          <Link to="/" className={styles.brand}>
            <Logo />

            <div className={styles.brandText}>
              <span className={styles.brandWhite}>PREMIERSHIP</span>
              <span className={styles.brandAccent}>PREDICTOR</span>
            </div>
          </Link>

          {/* Desktop Navigacija */}
          <nav className={styles.nav}>
            <a href="/rules" className={styles.link}>
              RULES
            </a>

            <a href="/standings" className={styles.link}>
              STANDINGS
            </a>

            <a href="/how-to-play" className={styles.link}>
              HOW TO PLAY
            </a>

            <a href="/about" className={styles.link}>
              ABOUT
            </a>
          </nav>

          {/* Desktop Auth */}
          <div className={styles.actions}>
            {user ? (
              <>
                <Link to="/dashboard" className={styles.teamName}>
                  <span className={styles.teamNameLabel}>{user.teamName}</span>
                </Link>

                <Button variant="outline" size="sm" onClick={handleLogout}>
                  LOGOUT
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleLogin}>
                  LOGIN
                </Button>

                <Button variant="outline" size="sm" onClick={handleRegister}>
                  SIGN UP
                </Button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default Header;
