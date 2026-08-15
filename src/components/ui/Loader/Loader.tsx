import clsx from "clsx";
import styles from "./Loader.module.scss";
import Logo from "../Logo/Logo";

type LoaderProps = {
  fullscreen?: boolean;
  text?: string;
};

const Loader = ({ fullscreen = false, text = "Loading..." }: LoaderProps) => {
  return (
    <div
      className={clsx(styles.loader, {
        [styles.fullscreen]: fullscreen,
      })}
    >
      <div className={styles.spinner}>
        <div className={styles.ring}></div>
        <div className={styles.ringSmall}></div>

        <div className={styles.logo}>
          <Logo />
        </div>
      </div>

      <p>{text}</p>
    </div>
  );
};

export default Loader;
