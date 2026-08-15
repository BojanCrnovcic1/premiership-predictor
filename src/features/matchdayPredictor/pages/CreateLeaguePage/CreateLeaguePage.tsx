import { useState } from "react";

import { MatchLeagueService } from "../../services/matchLeague.service";
import { useMatchLeagues } from "../../hooks/useMatchLeagues";

import styles from "./CreateLeaguePage.module.scss";

const CreateLeaguePage = () => {
  const { refreshMyLeagues } = useMatchLeagues();

  const [name, setName] = useState("");
  const [type, setType] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setMessage("League name is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const league = await MatchLeagueService.createLeague(name.trim(), type);

      await refreshMyLeagues();

      setMessage(`League created successfully. Code: ${league.code ?? ""}`);
      setName("");
    } catch (error) {
      console.error("Failed to create league:", error);
      setMessage("Failed to create league.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Create League</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="league-name">League name</label>
          <input
            id="league-name"
            value={name}
            placeholder="e.g. Champions League 2026"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="league-type">League type</label>
          <select
            id="league-type"
            value={type}
            onChange={(event) =>
              setType(event.target.value as "PUBLIC" | "PRIVATE")
            }
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Creating..." : "Create League"}
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default CreateLeaguePage;
