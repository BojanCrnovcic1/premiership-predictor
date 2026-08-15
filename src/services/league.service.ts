import { api } from "./api";

import type { LeaguesTypes } from "../types/leagues.types";
import type {
  CreateLeagueRequest,
  JoinLeagueRequest,
} from "../types/league-request.types";
import type { LeagueMembershipsTypes } from "../types/league-memberships.types";
import type { LeagueStandingsTypes } from "../features/seasonPredictor/types/league-standings.types";
import type { SeasonLeagueDetailsTypes } from "../features/seasonPredictor/types/season-league-details.types";
import type { LeagueMemberTypes } from "../types/league-member.types";

export type LeagueGameType = "MATCH_PREDICTOR" | "SEASON_PREDICTOR";

export const LeagueService = {
  async createLeague(data: CreateLeagueRequest): Promise<LeaguesTypes> {
    const response = await api.post<LeaguesTypes>("api/leagues", data);

    return response.data;
  },

  async joinByCode(data: JoinLeagueRequest): Promise<LeagueMembershipsTypes> {
    const response = await api.post<LeagueMembershipsTypes>(
      "api/leagues/join/code",
      data,
    );

    return response.data;
  },

  async joinPublicLeague(leagueId: number): Promise<LeagueMembershipsTypes> {
    const response = await api.post<LeagueMembershipsTypes>(
      `api/leagues/${leagueId}/join`,
    );

    return response.data;
  },

  async getMyLeagues(): Promise<LeaguesTypes[]> {
    const response = await api.get<LeaguesTypes[]>("api/leagues/my");

    return response.data;
  },

  async getPublicLeagues(
    gameType?: LeagueGameType,
    seasonYear?: number,
  ): Promise<LeaguesTypes[]> {
    const response = await api.get<LeaguesTypes[]>("api/leagues/public", {
      params: {
        ...(gameType ? { gameType } : {}),
        ...(seasonYear !== undefined ? { seasonYear } : {}),
      },
    });

    return response.data;
  },

  async getLeague(leagueId: number): Promise<LeaguesTypes> {
    const response = await api.get<LeaguesTypes>(`api/leagues/${leagueId}`);

    return response.data;
  },

  async getMatchLeagueDetails(leagueId: number) {
    const response = await api.get(`api/leagues/${leagueId}/match-details`);

    return response.data;
  },

  async getLeagueMembers(leagueId: number): Promise<LeagueMemberTypes[]> {
    const response = await api.get<LeagueMemberTypes[]>(
      `api/leagues/${leagueId}/members`,
    );

    return response.data;
  },

  async getLeagueStandings(leagueId: number): Promise<LeagueStandingsTypes[]> {
    const response = await api.get<LeagueStandingsTypes[]>(
      `api/leagues/${leagueId}/standings`,
    );

    return response.data;
  },

  async getSeasonLeagueDetails(
    leagueId: number,
  ): Promise<SeasonLeagueDetailsTypes> {
    const response = await api.get<SeasonLeagueDetailsTypes>(
      `api/leagues/${leagueId}/season`,
    );

    return response.data;
  },

  async leaveLeague(leagueId: number): Promise<void> {
    await api.delete(`api/leagues/${leagueId}/leave`);
  },
};
