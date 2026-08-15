import type { ActualStandingsTypes } from "./actual-standings.types";
import type { MatchesTypes } from "./matches.types";
import type { PredictionItemsTypes } from "./prediction-items.types";

export interface TeamsTypes {
  teamId: number;
  name: string;
  shortName: string;
  logoUrl: string;
  actualStandings?: ActualStandingsTypes;
  predictionItems?: PredictionItemsTypes[];
  homeMatches?: MatchesTypes[];
  awayMatches?: MatchesTypes[];
}
