import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./CreateLeaguePage.module.scss";

import { useSeasonLeagues } from "../../hooks/useSeasonLeagues";
import { SeasonLeagueService } from "../../services/seasonLeague.service";

const SEASON_YEAR = 2026;

const CreateSeasonLeaguePage = () => {
  const navigate = useNavigate();

  const { refreshMyLeagues } = useSeasonLeagues(SEASON_YEAR);

  const [name, setName] = useState("");

  const [type, setType] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Unesite naziv lige.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await SeasonLeagueService.createLeague(name.trim(), type, SEASON_YEAR);

      await refreshMyLeagues();

      navigate("/season-predictor/my-leagues");
    } catch (err: any) {
      console.error("Failed to create season league:", err);

      setError(
        err?.response?.data?.message || "Liga nije mogla biti kreirana.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Create League</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="league-name">League name</label>

          <input
            id="league-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Premier League"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="league-type">League type</label>

          <select
            id="league-type"
            value={type}
            onChange={(e) => setType(e.target.value as "PUBLIC" | "PRIVATE")}
          >
            <option value="PUBLIC">Public</option>

            <option value="PRIVATE">Private</option>
          </select>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Creating..." : "Create League"}
        </button>
      </form>
    </div>
  );
};

export default CreateSeasonLeaguePage;
