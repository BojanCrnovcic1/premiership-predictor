import Modal from "../../../../../components/ui/Modal/Modal";
import type { PredictionsTypes } from "../../../../../types/predictions.types";
import styles from "./UserPredictionModal.module.scss";

type UserPredictionModalProps = {
  prediction: PredictionsTypes | null;
  onClose: () => void;
};

const UserPredictionModal = ({
  prediction,
  onClose,
}: UserPredictionModalProps) => {
  return (
    <Modal open={!!prediction} onClose={onClose}>
      <div className={styles.content}>
        <h2>Season Prediction</h2>

        {!prediction?.predictionItems ||
        prediction.predictionItems.length === 0 ? (
          <p className={styles.empty}>Korisnik nema napravljenu predikciju.</p>
        ) : (
          <ol className={styles.list}>
            {prediction.predictionItems
              .slice()
              .sort((a, b) => a.position - b.position)
              .map((item) => (
                <li key={item.predictionItemId} className={styles.item}>
                  <span className={styles.position}>{item.position}</span>
                  <span className={styles.teamName}>
                    {item.team?.name ?? "Nepoznat tim"}
                  </span>
                </li>
              ))}
          </ol>
        )}
      </div>
    </Modal>
  );
};

export default UserPredictionModal;
