import styles from "./DashboardHeader.module.scss";

interface Props {
  teamName: string;
}

const DashboardHeader = ({ teamName }: Props) => {
  return (
    <header className={styles.header}>
      <span>Welcome back 👋</span>

      <h1>{teamName}</h1>

      <p>Ready to make your Premier League predictions?</p>
    </header>
  );
};

export default DashboardHeader;
