export interface LeagueStandingsTypes {
  userId: number;
  firstName: string;
  lastName: string;
  teamName?: string;

  // Match Predictor
  pointsWon?: number;

  // Season Predictor
  totalScore?: number;

  position: number;

  joinedAt?: string | Date;
}
