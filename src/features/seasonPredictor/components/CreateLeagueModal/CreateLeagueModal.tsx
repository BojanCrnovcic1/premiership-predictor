import { useState } from "react";

import styles from "./CreateLeagueModal.module.scss";

import Modal from "../../../../components/ui/Modal/Modal";
import ModalBody from "../../../../components/ui/Modal/ModalBody";
import Card from "../../../../components/ui/Card/Card";
import Input from "../../../../components/ui/Input/Input";
import Button from "../../../../components/ui/Button/Button";
import { LeagueService } from "../../../../services/league.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SEASON_YEAR = 2026;

const CreateLeagueModal = ({ open, onClose, onSuccess }: Props) => {
  const [name, setName] = useState("");

  const [type, setType] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  const [loading, setLoading] = useState(false);

  const createLeague = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);

      await LeagueService.createLeague({
        name: name.trim(),
        type,
        gameType: "SEASON_PREDICTOR",
        seasonYear: SEASON_YEAR,
      });

      setName("");

      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBody>
        <Card>
          <h2>Create League</h2>

          <Input
            label="League name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className={styles.types}>
            <Button
              variant={type === "PUBLIC" ? "primary" : "outline"}
              onClick={() => setType("PUBLIC")}
            >
              Public
            </Button>

            <Button
              variant={type === "PRIVATE" ? "primary" : "outline"}
              onClick={() => setType("PRIVATE")}
            >
              Private
            </Button>
          </div>

          <Button loading={loading} onClick={() => void createLeague()}>
            Create League
          </Button>
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default CreateLeagueModal;
