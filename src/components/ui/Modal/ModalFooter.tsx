import type { ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
  children: ReactNode;
};

const ModalFooter = ({ children }: Props) => {
  return <div className={styles.footer}>{children}</div>;
};

export default ModalFooter;
