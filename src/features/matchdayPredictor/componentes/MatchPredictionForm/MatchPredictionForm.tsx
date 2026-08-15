import styles from "./MatchPredictionForm.module.scss";

interface Props {
  homeScore: number | null;
  awayScore: number | null;
  isBoosted: boolean;
  disabled?: boolean;
  onHomeScoreChange: (value: number | null) => void;
  onAwayScoreChange: (value: number | null) => void;
  onBoostChange: (value: boolean) => void;
}

const MatchPredictionForm = ({
  homeScore,
  awayScore,
  isBoosted,
  disabled = false,
  onHomeScoreChange,
  onAwayScoreChange,
  onBoostChange,
}: Props) => {
  return (
    <div className={styles.form}>
      <div className={styles.scoreInputs}>
        <input
          type="number"
          min="0"
          className={styles.scoreInput}
          value={homeScore ?? ""}
          disabled={disabled}
          onChange={(event) =>
            onHomeScoreChange(
              event.target.value === "" ? null : Number(event.target.value),
            )
          }
        />

        <span className={styles.divider}>VS</span>

        <input
          type="number"
          min="0"
          className={styles.scoreInput}
          value={awayScore ?? ""}
          disabled={disabled}
          onChange={(event) =>
            onAwayScoreChange(
              event.target.value === "" ? null : Number(event.target.value),
            )
          }
        />
      </div>

      <div className={styles.controls}>
        <label className={styles.boostLabel}>
          <input
            type="checkbox"
            checked={isBoosted}
            disabled={disabled}
            onChange={(event) => onBoostChange(event.target.checked)}
          />

          <span>Boost</span>
        </label>
      </div>
    </div>
  );
};

export default MatchPredictionForm;
