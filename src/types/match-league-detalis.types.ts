import type { LeagueStandingsTypes } from "../features/seasonPredictor/types/league-standings.types";
import type { LeaguesTypes } from "./leagues.types";

export interface MatchLeagueDetailsTypes {
  league: Pick<
    LeaguesTypes,
    "leagueId" | "name" | "type" | "gameType" | "seasonYear"
  >;

  standings: LeagueStandingsTypes[];
}
