import { useNavigate } from "react-router-dom";

import Card from "../../../../components/ui/Card/Card";
import Button from "../../../../components/ui/Button/Button";

import styles from "./QuickActionCard.module.scss";

interface Props {
  title: string;
  description: string;
  button: string;
  to: string;
}

const QuickActionCard = ({ title, description, button, to }: Props) => {
  const navigate = useNavigate();

  return (
    <Card className={styles.card}>
      <h2>{title}</h2>

      <p>{description}</p>

      <Button fullWidth onClick={() => navigate(to)}>
        {button}
      </Button>
    </Card>
  );
};

export default QuickActionCard;
