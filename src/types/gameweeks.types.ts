import type { MatchesTypes } from "./matches.types";

export interface GameweeksTypes {
  gameweekId?: number;
  seasonYear: number;
  number: number;
  name: string;
  isFinished: boolean;
  matches: MatchesTypes[];
}
