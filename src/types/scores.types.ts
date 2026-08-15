import type { UserTypes } from "./user.types";

export interface ScoresTypes {
  scoreId?: number;
  userId: number;
  seasonYear: number;
  totalScore: number | null;
  calculatedAt: Date | null;
  user: UserTypes;
}
