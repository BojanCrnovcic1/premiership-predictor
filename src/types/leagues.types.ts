import type { LeagueMembershipsTypes } from "./league-memberships.types";
import type { LeagueOwnerTypes } from "./league-owner.types";

export interface LeaguesTypes {
  leagueId: number;
  name: string;
  ownerId: number;

  type: "PUBLIC" | "PRIVATE";
  gameType: "MATCH_PREDICTOR" | "SEASON_PREDICTOR";

  seasonYear: number;

  code: string | null;

  createdAt: Date;

  joinedAt?: Date;

  isMember?: boolean;

  owner?: LeagueOwnerTypes;

  memberCount?: number;

  memberships?: LeagueMembershipsTypes[];
}
