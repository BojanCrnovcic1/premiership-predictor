import { useEffect } from "react";

import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";

import { useActualStandings } from "../../hooks/useActualStandings";
import StandingsTable from "./StandingsTable/StandingsTable";

import styles from "./ActualStandingsManager.module.scss";

const ActualStandingsManager = () => {
  const {
    seasonYear,
    setSeasonYear,

    standings,

    loading,
    initializing,
    saving,

    error,
    message,

    initializeSeason,
    updatePosition,
    resetSeason,
    clearMessages,
  } = useActualStandings();

  useEffect(() => {
    clearMessages();
  }, [seasonYear, clearMessages]);

  const handleReset = async () => {
    const confirmed = window.confirm(
      `Da li ste sigurni da želite resetovati tabelu za sezonu ${seasonYear}?`,
    );

    if (!confirmed) return;

    await resetSeason();
  };

  return (
    <section className={styles.manager}>
      <header className={styles.header}>
        <h1>Actual Standings</h1>

        <p>
          Upravljanje trenutnim plasmanom timova koji se koristi za Season
          Predictor.
        </p>
      </header>

      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <Input
            label="Sezona"
            type="number"
            value={seasonYear}
            min={2000}
            max={2100}
            onChange={(event) => setSeasonYear(Number(event.target.value))}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            onClick={initializeSeason}
            disabled={initializing || saving}
          >
            {initializing ? "Inicijalizacija..." : "Inicijalizuj sezonu"}
          </Button>

          <Button
            type="button"
            onClick={handleReset}
            disabled={saving || initializing}
          >
            {saving ? "Resetovanje..." : "Resetuj sezonu"}
          </Button>
        </div>
      </div>

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

      {loading ? (
        <div className={styles.loadingState}>
          <p>Učitavanje tabele...</p>
        </div>
      ) : standings.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Za sezonu {seasonYear} još ne postoji tabela.</p>

          <Button
            type="button"
            onClick={initializeSeason}
            disabled={initializing}
          >
            {initializing ? "Inicijalizacija..." : "Inicijalizuj tabelu"}
          </Button>
        </div>
      ) : (
        <>
          <div className={styles.tableHeader}>
            <div>
              <h2>Tabela sezone {seasonYear}</h2>

              <p>Prevuci tim gore ili dole da promijeniš njegovu poziciju.</p>
            </div>

            <span className={styles.dragHint}>↕ Prevuci za promjenu</span>
          </div>

          <StandingsTable
            standings={standings}
            onReorder={updatePosition}
            disabled={saving}
          />
        </>
      )}
    </section>
  );
};

export default ActualStandingsManager;
