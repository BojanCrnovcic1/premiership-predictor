import Card from "../../../../components/ui/Card/Card";
import Button from "../../../../components/ui/Button/Button";

import styles from "./DashboardCard.module.scss";

interface Props {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const DashboardCard = ({ title, description, buttonText, onClick }: Props) => {
  return (
    <Card className={styles.card}>
      <div className={styles.content}>
        <h2>{title}</h2>

        <p>{description}</p>
      </div>

      <Button fullWidth onClick={onClick}>
        {buttonText}
      </Button>
    </Card>
  );
};

export default DashboardCard;
