import ActualStandingsManager from "../../components/ActualStandingsManager/ActualStandingsManager";
import styles from "./ActualStandingsPage.module.scss";

const ActualStandingsPage = () => {
  return (
    <div className={styles.page}>
      <ActualStandingsManager />
    </div>
  );
};

export default ActualStandingsPage;
