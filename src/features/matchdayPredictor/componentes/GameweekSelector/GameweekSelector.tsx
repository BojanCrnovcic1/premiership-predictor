import type { GameweeksTypes } from "../../../../types/gameweeks.types";
import styles from "./GameweekSelector.module.scss";

interface Props {
  gameweeks: GameweeksTypes[];
  selectedGameweekId: number | null;
  onChange: (gameweekId: number) => void;
}

const GameweekSelector = ({
  gameweeks,
  selectedGameweekId,
  onChange,
}: Props) => {
  return (
    <div className={styles.container}>
      <label htmlFor="gameweek" className={styles.label}>
        Gameweek
      </label>

      <div className={styles.selectWrapper}>
        <select
          id="gameweek"
          className={styles.select}
          value={selectedGameweekId ?? ""}
          onChange={(event) => onChange(Number(event.target.value))}
        >
          <option value="" disabled className={styles.option}>
            Select gameweek
          </option>

          {gameweeks.map((gameweek) => (
            <option
              key={gameweek.gameweekId}
              value={gameweek.gameweekId}
              className={styles.option}
            >
              {gameweek.name || `Gameweek ${gameweek.number}`}
              {gameweek.isFinished ? " - Finished" : ""}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GameweekSelector;
