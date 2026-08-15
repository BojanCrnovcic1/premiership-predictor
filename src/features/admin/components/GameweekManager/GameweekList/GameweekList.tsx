import clsx from "clsx";
import Button from "../../../../../components/ui/Button/Button";
import type { GameweeksTypes } from "../../../../../types/gameweeks.types";
import styles from "./GameweekList.module.scss";

interface Props {
  gameweeks: GameweeksTypes[];
  selectedGameweekId?: number;
  onSelect: (gameweek: GameweeksTypes) => void;
  onToggleFinish: (gameweekId: number, isFinished: boolean) => void;
  disabled?: boolean;
}

const GameweekList = ({
  gameweeks,
  selectedGameweekId,
  onSelect,
  onToggleFinish,
  disabled = false,
}: Props) => {
  if (!gameweeks.length) {
    return <p className={styles.empty}>Nema kreiranih kola za ovu sezonu.</p>;
  }

  return (
    <div className={styles.container}>
      {gameweeks.map((gameweek) => {
        const isSelected = gameweek.gameweekId === selectedGameweekId;

        return (
          <div
            key={gameweek.gameweekId}
            className={clsx(styles.item, {
              [styles.selected]: isSelected,
            })}
          >
            <button
              type="button"
              className={styles.infoButton}
              onClick={() => onSelect(gameweek)}
              aria-pressed={isSelected}
            >
              <strong className={styles.number}>
                Gameweek {gameweek.number}.
              </strong>

              <span className={styles.name}>{gameweek.name}</span>

              <span
                className={clsx(styles.badge, {
                  [styles.finished]: gameweek.isFinished,
                  [styles.open]: !gameweek.isFinished,
                })}
              >
                {gameweek.isFinished ? "Završeno" : "Otvoreno"}
              </span>

              <span className={styles.matchesCount}>
                {gameweek.matches?.length ?? 0} utakmica
              </span>
            </button>

            {gameweek.gameweekId && (
              <Button
                type="button"
                variant={gameweek.isFinished ? "outline" : "primary"}
                size="sm"
                disabled={disabled}
                onClick={() =>
                  onToggleFinish(gameweek.gameweekId!, !gameweek.isFinished)
                }
              >
                {gameweek.isFinished ? "Otvori kolo" : "Završi kolo"}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameweekList;
