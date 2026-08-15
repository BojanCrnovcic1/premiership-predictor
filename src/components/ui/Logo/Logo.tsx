import { useNavigate } from "react-router-dom";
import styles from "./logo.module.scss";

export const Logo = () => {
  const navigate = useNavigate();

  const logoImg = "/assets/logos/logo.webp";

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <img
      src={logoImg}
      alt="Premier Predictor Logo"
      className={styles.img}
      onClick={handleNavigate}
    />
  );
};

export default Logo;
