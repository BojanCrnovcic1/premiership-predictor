import type { PredictionsTypes } from "./predictions.types";
import type { TeamsTypes } from "./teams.types";

export interface PredictionItemsTypes {
  predictionItemId: number;
  predictionId: number;
  teamId: number;
  position: number;
  team: TeamsTypes;
  prediction: PredictionsTypes;
}
