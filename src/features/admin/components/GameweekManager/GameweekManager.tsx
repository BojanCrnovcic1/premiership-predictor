import { useState } from "react";
import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";
import { useGameweeks } from "../../hooks/useGameweeks";
import GameweekList from "./GameweekList/GameweekList";
import styles from "./GameweekManager.module.scss";
import Loader from "../../../../components/ui/Loader";

interface Props {
  onSelectGameweek?: (gameweekId: number) => void;
}

const GameweekManager = ({ onSelectGameweek }: Props) => {
  const {
    seasonYear,
    setSeasonYear,
    gameweeks,
    loading,
    creating,
    updating,
    error,
    message,
    createGameweek,
    toggleFinish,
  } = useGameweeks();

  const [number, setNumber] = useState(1);
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) return;

    await createGameweek({
      number,
      name: name.trim(),
    });

    setName("");
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1>Gameweeks</h1>
        <p>Upravljanje kolima sezone.</p>
      </header>

      <div className={styles.formCard}>
        <div className={styles.inputsGrid}>
          <Input
            label="Sezona"
            type="number"
            value={seasonYear}
            min={2020}
            onChange={(event) => setSeasonYear(Number(event.target.value))}
          />

          <Input
            label="Broj kola"
            type="number"
            value={number}
            min={1}
            onChange={(event) => setNumber(Number(event.target.value))}
          />

          <Input
            label="Naziv kola"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Button
            type="button"
            onClick={handleCreate}
            loading={creating}
            disabled={creating || !name.trim() || number < 1}
          >
            Kreiraj kolo
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
        <p className={styles.loading}>
          <Loader />
        </p>
      ) : (
        <GameweekList
          gameweeks={gameweeks}
          onSelect={(gameweek) => {
            if (gameweek.gameweekId) {
              onSelectGameweek?.(gameweek.gameweekId);
            }
          }}
          onToggleFinish={toggleFinish}
          disabled={updating}
        />
      )}
    </section>
  );
};

export default GameweekManager;
