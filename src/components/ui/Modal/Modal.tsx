import { useEffect, type ReactNode } from "react";

import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

type ModalProps = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ open, children, onClose }: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
