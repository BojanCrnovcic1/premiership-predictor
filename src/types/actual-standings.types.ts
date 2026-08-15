import type { TeamsTypes } from "./teams.types";

export interface ActualStandingsTypes {
  actualStandingId?: number;
  seasonYear: number;
  teamId: number;
  position: number;
  updateAt: Date;
  team: TeamsTypes;
}
