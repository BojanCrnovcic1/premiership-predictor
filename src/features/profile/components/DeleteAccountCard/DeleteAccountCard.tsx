import { useState } from "react";

import Card from "../../../../components/ui/Card/Card";
import Button from "../../../../components/ui/Button/Button";

import Modal from "../../../../components/ui/Modal/Modal";
import ModalBody from "../../../../components/ui/Modal/ModalBody";

import styles from "./DeleteAccountCard.module.scss";

const DeleteAccountCard = () => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    // Backend poziv kasnije
    console.log("Delete Account");
    setOpen(false);
  };

  return (
    <>
      <Card className={styles.card}>
        <div>
          <h2>Danger Zone</h2>

          <p>
            Deleting your account is permanent. This action cannot be undone.
          </p>
        </div>

        <Button variant="outline" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalBody>
          <h2>Delete Account</h2>

          <p>Are you sure you want to delete your account?</p>

          <p>All predictions and progress will be permanently removed.</p>

          <div className={styles.actions}>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DeleteAccountCard;
