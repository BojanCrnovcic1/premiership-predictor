import { LeagueService } from "../../../services/league.service";
import type { LeagueMemberTypes } from "../../../types/league-member.types";

import type { LeagueMembershipsTypes } from "../../../types/league-memberships.types";
import type { CreateLeagueRequest } from "../../../types/league-request.types";
import type { LeaguesTypes } from "../../../types/leagues.types";

import type { LeagueStandingsTypes } from "../types/league-standings.types";
import type { SeasonLeagueDetailsTypes } from "../types/season-league-details.types";

const GAME_TYPE = "SEASON_PREDICTOR" as const;

const SEASON_YEAR = 2026;

export const SeasonLeagueService = {
  // ============================================================
  // CREATE LEAGUE
  // ============================================================

  async createLeague(
    name: string,
    type: "PUBLIC" | "PRIVATE",
    seasonYear: number = SEASON_YEAR,
  ): Promise<LeaguesTypes> {
    const data: CreateLeagueRequest = {
      name,
      type,
      gameType: GAME_TYPE,
      seasonYear,
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

  async getPublicLeagues(
    seasonYear: number = SEASON_YEAR,
  ): Promise<LeaguesTypes[]> {
    return LeagueService.getPublicLeagues(GAME_TYPE, seasonYear);
  },

  // ============================================================
  // JOIN PRIVATE BY CODE
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
  // SINGLE LEAGUE
  // ============================================================

  async getLeague(leagueId: number): Promise<LeaguesTypes> {
    return LeagueService.getLeague(leagueId);
  },

  // ============================================================
  // LEAGUE MEMBERS
  // ============================================================

  async getLeagueMembers(leagueId: number): Promise<LeagueMemberTypes[]> {
    return LeagueService.getLeagueMembers(leagueId);
  },

  // ============================================================
  // SEASON LEAGUE DETAILS
  // ============================================================

  async getSeasonLeagueDetails(
    leagueId: number,
  ): Promise<SeasonLeagueDetailsTypes> {
    return LeagueService.getSeasonLeagueDetails(leagueId);
  },

  // ============================================================
  // LEAGUE RANKING
  // ============================================================

  async getLeagueRanking(leagueId: number): Promise<LeagueStandingsTypes[]> {
    return LeagueService.getLeagueStandings(leagueId);
  },

  // ============================================================
  // LEAVE
  // ============================================================

  async leaveLeague(leagueId: number): Promise<void> {
    return LeagueService.leaveLeague(leagueId);
  },
};
