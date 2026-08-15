import { useState } from "react";

import GameweekManager from "../../components/GameweekManager/GameweekManager";
import MatchManager from "../../components/MatchManager/MatchManager";

import styles from "./GameweeksPage.module.scss";

const GameweeksPage = () => {
  const [selectedGameweekId, setSelectedGameweekId] = useState<number>();

  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        <GameweekManager onSelectGameweek={setSelectedGameweekId} />

        <MatchManager gameweekId={selectedGameweekId} />
      </div>
    </main>
  );
};

export default GameweeksPage;
