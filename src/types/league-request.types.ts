export interface CreateLeagueRequest {
  name: string;
  type: "PUBLIC" | "PRIVATE";
  gameType: "MATCH_PREDICTOR" | "SEASON_PREDICTOR";
  seasonYear: number;
}

export interface JoinLeagueRequest {
  code: string;
  gameType: "MATCH_PREDICTOR" | "SEASON_PREDICTOR";
}
