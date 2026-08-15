import Button from "../../../../../components/ui/Button/Button";
import Card from "../../../../../components/ui/Card/Card";

import styles from "./CreateLeagueCard.module.scss";

interface Props {
  onOpen: () => void;
}

const CreateLeagueCard = ({ onOpen }: Props) => {
  return (
    <Card className={styles.card}>
      <h2>Create League</h2>

      <p>
        Create your own public or private league and invite friends to compete.
      </p>

      <Button fullWidth onClick={onOpen}>
        Create League
      </Button>
    </Card>
  );
};

export default CreateLeagueCard;
