import type { PredictionItemsTypes } from "./prediction-items.types";
import type { UserTypes } from "./user.types";

export interface PredictionsTypes {
  predictionId: number;
  userId: number;
  createdAt: Date;
  predictionItems: PredictionItemsTypes[];
  user: UserTypes;
}
