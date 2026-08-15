import type { LeaguesTypes } from "./leagues.types";
import type { UserTypes } from "./user.types";

export interface LeagueMembershipsTypes {
  membershipId: number;
  leagueId: number;
  userId: number;
  joinedAt: Date;

  league?: LeaguesTypes;
  user?: UserTypes;
}
