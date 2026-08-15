import type { MatchesTypes } from "./matches.types";
import type { UserTypes } from "./user.types";

export interface MatchPredictionsTypes {
  matchPredictionId: number;
  userId: number;
  matchId: number;

  homeScore: number | null;
  awayScore: number | null;

  isBoosted: boolean;
  pointsWon: number;
  createdAt: Date;

  user: UserTypes;
  match: MatchesTypes;
}
