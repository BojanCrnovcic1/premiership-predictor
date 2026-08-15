import { LeagueService } from "../../../services/league.service";

import type { LeagueMembershipsTypes } from "../../../types/league-memberships.types";
import type { CreateLeagueRequest } from "../../../types/league-request.types";
import type { LeaguesTypes } from "../../../types/leagues.types";

const GAME_TYPE = "MATCH_PREDICTOR" as const;

export const MatchLeagueService = {
  // ============================================================
  // CREATE
  // ============================================================

  async createLeague(
    name: string,
    type: "PUBLIC" | "PRIVATE",
  ): Promise<LeaguesTypes> {
    const data: CreateLeagueRequest = {
      name,
      type,
      gameType: GAME_TYPE,
      seasonYear: 2026,
    };

    return LeagueService.createLeague(data);
  },

  // ============================================================
  // MY LEAGUES
  // ============================================================

  async getMyLeagues(): Promise<LeaguesTypes[]> {
    return LeagueService.getMyLeagues();
  },

  // ============================================================
  // PUBLIC LEAGUES
  // ============================================================

  async getPublicLeagues(): Promise<LeaguesTypes[]> {
    return LeagueService.getPublicLeagues(GAME_TYPE);
  },

  // ============================================================
  // JOIN PRIVATE
  // ============================================================

  async joinByCode(code: string): Promise<LeagueMembershipsTypes> {
    return LeagueService.joinByCode({
      code,
      gameType: GAME_TYPE,
    });
  },

  // ============================================================
  // JOIN PUBLIC
  // ============================================================

  async joinPublic(leagueId: number): Promise<LeagueMembershipsTypes> {
    return LeagueService.joinPublicLeague(leagueId);
  },

  // ============================================================
  // LEAVE
  // ============================================================

  async leaveLeague(leagueId: number): Promise<void> {
    return LeagueService.leaveLeague(leagueId);
  },
};
