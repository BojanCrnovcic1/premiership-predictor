import { useAuth } from "../../../../auth/hooks/useAuth";
import { useSeasonPredictor } from "../../../hooks/useSeasonPredictor";

import LeaguePanel from "../../../components/LeaguePanel/LeaguePanel";
import PredictionBoard from "../../../components/PredictionBoard/PredictionBoard";
import PredictionHeader from "../../../components/PredictionHeader/PredictionHeader";

import styles from "./SeasonPredictorPage.module.scss";

const SeasonPredictorPage = () => {
  const { user } = useAuth();

  const {
    loading,
    prediction,
    setPrediction,
    myLeagues,
    publicLeagues,
    savePrediction,
    resetPrediction,
    shufflePrediction,
  } = useSeasonPredictor(user?.userId);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.page}>
      <PredictionHeader
        onReset={resetPrediction}
        onShuffle={shufflePrediction}
        onSave={savePrediction}
      />

      <PredictionBoard prediction={prediction} onChange={setPrediction} />

      <LeaguePanel
        myLeagues={myLeagues}
        publicLeagues={publicLeagues}
        onCreateLeague={() => {}}
        onJoinLeague={() => {}}
      />
    </div>
  );
};

export default SeasonPredictorPage;
