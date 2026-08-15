import type { GameweeksTypes } from "./gameweeks.types";
import type { MatchPredictionsTypes } from "./matches-predictions.types";
import type { TeamsTypes } from "./teams.types";

export interface MatchesTypes {
  matchId?: number;
  gameweekId: number;
  homeTeamId: number;
  awayTeamId: number;
  kickoffTime: Date;
  homeScore: number | null;
  awayScore: number | null;
  isFinished: boolean;
  gameweek: GameweeksTypes;
  homeTeam: TeamsTypes;
  awayTeam: TeamsTypes;
  predictions: MatchPredictionsTypes[];
}
