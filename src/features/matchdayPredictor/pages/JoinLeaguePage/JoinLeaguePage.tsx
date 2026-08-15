import { useState } from "react";

import { MatchLeagueService } from "../../services/matchLeague.service";
import { useMatchLeagues } from "../../hooks/useMatchLeagues";

import styles from "./JoinLeaguePage.module.scss";

const JoinLeaguePage = () => {
  const { refreshMyLeagues } = useMatchLeagues();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      setMessage("League code is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await MatchLeagueService.joinByCode(normalizedCode);
      await refreshMyLeagues();

      setMessage("Successfully joined the league.");
      setCode("");
    } catch (error) {
      console.error("Failed to join league:", error);
      setMessage("Unable to join league. Check the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Join League</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.codeInput}
          value={code}
          placeholder="ENTER CODE"
          maxLength={8}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
        />

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Joining..." : "Join League"}
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default JoinLeaguePage;
