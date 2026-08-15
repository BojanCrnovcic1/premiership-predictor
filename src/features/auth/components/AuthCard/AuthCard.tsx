import Card from "../../../../components/ui/Card/Card";
import styles from "./AuthCard.module.scss";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthCard = ({ title, subtitle, children }: Props) => {
  return (
    <Card className={styles.authCard}>
      <h1>{title}</h1>

      {subtitle && <p>{subtitle}</p>}

      {children}
    </Card>
  );
};

export default AuthCard;
