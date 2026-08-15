import Modal from "../../../../../components/ui/Modal/Modal";
import type { ScoresTypes } from "../../../../../types/scores.types";
import styles from "./UserScoreModal.module.scss";

type UserScoreModalProps = {
  scores: ScoresTypes[] | null;
  onClose: () => void;
};

const UserScoreModal = ({ scores, onClose }: UserScoreModalProps) => {
  return (
    <Modal open={!!scores} onClose={onClose}>
      <div className={styles.content}>
        <h2>User Scores</h2>

        {!scores || scores.length === 0 ? (
          <p className={styles.empty}>Korisnik nema osvojenih bodova.</p>
        ) : (
          <div className={styles.scoresList}>
            {scores.map((score, index) => (
              <div key={score.scoreId ?? index} className={styles.scoreCard}>
                <span className={styles.season}>
                  Sezona: {score.seasonYear}
                </span>

                <strong className={styles.points}>
                  {score.totalScore} bodova
                </strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserScoreModal;
