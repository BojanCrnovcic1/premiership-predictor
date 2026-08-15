import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./JoinLeaguePage.module.scss";

import { useSeasonLeagues } from "../../hooks/useSeasonLeagues";
import { SeasonLeagueService } from "../../services/seasonLeague.service";

const SEASON_YEAR = 2026;

const JoinSeasonLeaguePage = () => {
  const navigate = useNavigate();

  const { refreshMyLeagues } = useSeasonLeagues(SEASON_YEAR);

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      setMessage("Unesite kod lige.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await SeasonLeagueService.joinByCode(normalizedCode);

      await refreshMyLeagues();

      navigate("/season-predictor/my-leagues");
    } catch (err: any) {
      console.error("Failed to join season league:", err);

      setMessage(
        err?.response?.data?.message ||
          "Liga nije pronađena ili se više nije moguće pridružiti ligi.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Join League</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="league-code">League code</label>

          <input
            id="league-code"
            className={styles.codeInput}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={8}
          />
        </div>

        {message && <div className={styles.message}>{message}</div>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Joining..." : "Join League"}
        </button>
      </form>
    </div>
  );
};

export default JoinSeasonLeaguePage;
