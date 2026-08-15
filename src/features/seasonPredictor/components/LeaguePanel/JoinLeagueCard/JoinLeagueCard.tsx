import Button from "../../../../../components/ui/Button/Button";
import Card from "../../../../../components/ui/Card/Card";
import type { LeaguesTypes } from "../../../../../types/leagues.types";

import styles from "./JoinLeagueCard.module.scss";

interface Props {
  publicLeagues: LeaguesTypes[];
  onOpen: () => void;
}

const JoinLeagueCard = ({ publicLeagues, onOpen }: Props) => {
  return (
    <Card className={styles.card}>
      <h2>Join League</h2>

      <p>
        {publicLeagues.length > 0
          ? `${publicLeagues.length} public leagues available right now.`
          : "No public leagues available right now."}
      </p>

      <Button fullWidth variant="outline" onClick={onOpen}>
        Join League
      </Button>
    </Card>
  );
};

export default JoinLeagueCard;
