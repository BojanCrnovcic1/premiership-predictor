import type { ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
  children: ReactNode;
};

const ModalHeader = ({ children }: Props) => {
  return <div className={styles.header}>{children}</div>;
};

export default ModalHeader;
