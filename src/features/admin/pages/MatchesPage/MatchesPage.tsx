import { useParams } from "react-router-dom";
import MatchManager from "../../components/MatchManager/MatchManager";
import styles from "./MatchesPage.module.scss";

const MatchesPage = () => {
  const { gameweekId } = useParams();

  return (
    <main className={styles.page}>
      <MatchManager gameweekId={gameweekId ? Number(gameweekId) : undefined} />
    </main>
  );
};

export default MatchesPage;
