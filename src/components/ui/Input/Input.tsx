import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className, ...props }: Props) => {
  return (
    <div className={styles.wrapper}>
      {label && <label>{label}</label>}

      <input
        className={clsx(styles.input, className, {
          [styles.error]: error,
        })}
        {...props}
      />

      {error && <span>{error}</span>}
    </div>
  );
};

export default Input;
