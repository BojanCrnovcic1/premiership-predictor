import Loader from "../../../../components/ui/Loader";
import { useMatches } from "../../hooks/useMatches";

import MatchForm from "./MatchForm/MatchForm";
import MatchList from "./MatchList/MatchList";

import styles from "./MatchManager.module.scss";

interface Props {
  gameweekId?: number;
}

const MatchManager = ({ gameweekId }: Props) => {
  const {
    matches,
    loading,
    creating,
    updatingScore,
    error,
    message,
    createMatch,
    updateScore,
  } = useMatches(gameweekId);

  if (!gameweekId) {
    return (
      <section className={styles.section}>
        <div className={styles.emptySelection}>
          <h2>Matches</h2>

          <p>Izaberi kolo da bi upravljao utakmicama.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1>Matches</h1>

        <p>Upravljanje utakmicama izabranog kola.</p>
      </header>

      {message && (
        <div className={styles.statusMessage} role="status">
          {message}
        </div>
      )}

      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}

      <MatchForm matches={matches} onSubmit={createMatch} loading={creating} />

      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <MatchList
          matches={matches}
          onUpdateScore={updateScore}
          disabled={updatingScore}
        />
      )}
    </section>
  );
};

export default MatchManager;
