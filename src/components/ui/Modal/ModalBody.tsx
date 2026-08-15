import type { ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
  children: ReactNode;
};

const ModalBody = ({ children }: Props) => {
  return <div className={styles.body}>{children}</div>;
};

export default ModalBody;
