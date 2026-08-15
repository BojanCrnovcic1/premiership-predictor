import Button from "../../../../components/ui/Button/Button";

import styles from "./PredictionHeader.module.scss";

interface Props {
  onReset: () => void;
  onShuffle: () => void;
  onSave: () => void;
}

const PredictionHeader = ({ onReset, onShuffle, onSave }: Props) => {
  return (
    <div className={styles.header}>
      <div>
        <h1>Season Predictor</h1>
        <p>Drag clubs into your predicted final Premier League standings.</p>
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>

        <Button variant="outline" onClick={onShuffle}>
          Shuffle
        </Button>

        <Button onClick={onSave}>Save Prediction</Button>
      </div>
    </div>
  );
};

export default PredictionHeader;
