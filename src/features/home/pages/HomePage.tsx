import Hero from "../components/Hero/Hero";
import { PwaInstallCard } from "../components/PwaInstallCard/PwaInstallCard";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <PwaInstallCard />
    </div>
  );
};

export default HomePage;
