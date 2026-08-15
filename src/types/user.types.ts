import type { LeagueMembershipsTypes } from "./league-memberships.types";
import type { LeaguesTypes } from "./leagues.types";
import type { MatchPredictionsTypes } from "./matches-predictions.types";
import type { PredictionsTypes } from "./predictions.types";
import type { ScoresTypes } from "./scores.types";

export interface UserTypes {
  userId?: number;
  teamName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | null;
  isVerified?: boolean;
  createdAt: Date;
  predictions: PredictionsTypes[];
  scores: ScoresTypes[];
  matchPredictions: MatchPredictionsTypes[];
  ownedLeagues: LeaguesTypes[];
  memberships: LeagueMembershipsTypes[];
}
