import type { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Card.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, className, ...props }: Props) => {
  return (
    <div className={clsx(styles.card, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
