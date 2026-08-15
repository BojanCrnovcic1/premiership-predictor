import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Logo from "../../../components/ui/Logo";
import Modal from "../../../components/ui/Modal/Modal";
import ModalHeader from "../../../components/ui/Modal/ModalHeader";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import styles from "./MobileMenu.module.scss";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  const handleDashboard = () => {
    onClose();
    navigate("/dashboard");
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalHeader>
        <div className={styles.headerContent}>
          <Logo />

          <span className={styles.brandText}>
            <span className={styles.brandWhite}>PREMIER</span>
            <span className={styles.brandAccent}>PREDICTOR</span>
          </span>
        </div>
      </ModalHeader>

      <div className={styles.menuBody}>
        {/* Navigacioni linkovi */}
        <nav className={styles.nav}>
          <a href="/rules" className={styles.link} onClick={onClose}>
            RULES
          </a>

          <a href="/standings" className={styles.link} onClick={onClose}>
            STANDINGS
          </a>

          <a href="/how-to-play" className={styles.link} onClick={onClose}>
            HOW TO PLAY
          </a>

          <a href="/about" className={styles.link} onClick={onClose}>
            ABOUT
          </a>
        </nav>

        {/* Auth akcije */}
        <div className={styles.actions}>
          {user ? (
            <>
              <button
                type="button"
                className={styles.teamName}
                onClick={handleDashboard}
              >
                <span className={styles.teamNameLabel}>{user.teamName}</span>
              </button>

              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleLogin}
              >
                LOGIN
              </Button>

              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleRegister}
              >
                SIGN UP
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MobileMenu;
