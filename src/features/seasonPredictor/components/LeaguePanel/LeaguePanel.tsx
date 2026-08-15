import type { LeaguesTypes } from "../../../../types/leagues.types";

import CreateLeagueCard from "./CreateLeagueCard/CreateLeagueCard";
import JoinLeagueCard from "./JoinLeagueCard/JoinLeagueCard";
import MyLeaguesCard from "./MyLeaguesCard/MyLeaguesCard";
import GlobalRankingCard from "./GlobalRankingCard/GlobalRankingCard";

import styles from "./LeaguePanel.module.scss";

interface Props {
  myLeagues: LeaguesTypes[];
  publicLeagues: LeaguesTypes[];
  onCreateLeague: () => void;
  onJoinLeague: () => void;
}

const LeaguePanel = ({
  myLeagues,
  publicLeagues,
  onCreateLeague,
  onJoinLeague,
}: Props) => {
  return (
    <section className={styles.panel}>
      <CreateLeagueCard onOpen={onCreateLeague} />

      <JoinLeagueCard publicLeagues={publicLeagues} onOpen={onJoinLeague} />

      <MyLeaguesCard leagues={myLeagues} />

      <GlobalRankingCard />
    </section>
  );
};

export default LeaguePanel;
