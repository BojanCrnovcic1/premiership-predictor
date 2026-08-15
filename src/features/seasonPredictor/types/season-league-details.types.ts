import type { LeagueStandingsTypes } from "./league-standings.types";

export interface SeasonPredictionItemTypes {
  position: number;
  teamId: number;
  teamName: string;
  shortName: string;
  logoUrl: string;
}

export interface SeasonLeagueStandingTypes extends LeagueStandingsTypes {
  prediction?: SeasonPredictionItemTypes[];
}

export interface SeasonLeagueDetailsTypes {
  league: {
    leagueId: number;
    name: string;
    type: "PUBLIC" | "PRIVATE";
    gameType: "SEASON_PREDICTOR";
    seasonYear: number;
  };

  seasonStarted: boolean;

  standings: SeasonLeagueStandingTypes[];
}
