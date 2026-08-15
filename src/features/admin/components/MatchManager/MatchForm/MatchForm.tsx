import { useEffect, useMemo, useState } from "react";

import Button from "../../../../../components/ui/Button/Button";
import Card from "../../../../../components/ui/Card/Card";
import Input from "../../../../../components/ui/Input/Input";

import type { MatchesTypes } from "../../../../../types/matches.types";
import type { TeamsTypes } from "../../../../../types/teams.types";

import { TeamsService } from "../../../../seasonPredictor/services";

import styles from "./MatchForm.module.scss";

interface Props {
  matches: MatchesTypes[];

  onSubmit: (data: {
    homeTeamId: number;
    awayTeamId: number;
    kickoffTime: string;
  }) => void;

  loading?: boolean;
}

const MatchForm = ({ matches, onSubmit, loading = false }: Props) => {
  const [teams, setTeams] = useState<TeamsTypes[]>([]);

  const [homeTeamId, setHomeTeamId] = useState<number | "">("");
  const [awayTeamId, setAwayTeamId] = useState<number | "">("");

  const [kickoffTime, setKickoffTime] = useState("");

  const [loadingTeams, setLoadingTeams] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await TeamsService.getAll();

        setTeams(data);
      } finally {
        setLoadingTeams(false);
      }
    };

    void loadTeams();
  }, []);

  const usedTeamIds = useMemo(() => {
    const ids = new Set<number>();

    matches.forEach((match) => {
      if (match.homeTeamId) {
        ids.add(match.homeTeamId);
      }

      if (match.awayTeamId) {
        ids.add(match.awayTeamId);
      }
    });

    return ids;
  }, [matches]);

  const handleSubmit = () => {
    if (homeTeamId === "" || awayTeamId === "" || !kickoffTime) {
      return;
    }

    if (homeTeamId === awayTeamId) {
      return;
    }

    if (usedTeamIds.has(homeTeamId) || usedTeamIds.has(awayTeamId)) {
      return;
    }

    onSubmit({
      homeTeamId,
      awayTeamId,
      kickoffTime: new Date(kickoffTime).toISOString(),
    });
  };

  const isTeamUsed = (teamId: number) => {
    return usedTeamIds.has(teamId);
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2>Dodaj utakmicu</h2>

          <p>Svaka ekipa može igrati samo jednu utakmicu u ovom kolu.</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.selectGroup}>
          <label htmlFor="home-team">Domaći tim</label>

          <select
            id="home-team"
            className={styles.select}
            value={homeTeamId}
            onChange={(event) =>
              setHomeTeamId(
                event.target.value ? Number(event.target.value) : "",
              )
            }
            disabled={loadingTeams || loading}
          >
            <option value="">Izaberi domaći tim</option>

            {teams.map((team) => (
              <option
                key={team.teamId}
                value={team.teamId}
                disabled={team.teamId !== homeTeamId && isTeamUsed(team.teamId)}
              >
                {team.name}
                {isTeamUsed(team.teamId) ? " — već igra" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor="away-team">Gostujući tim</label>

          <select
            id="away-team"
            className={styles.select}
            value={awayTeamId}
            onChange={(event) =>
              setAwayTeamId(
                event.target.value ? Number(event.target.value) : "",
              )
            }
            disabled={loadingTeams || loading}
          >
            <option value="">Izaberi gostujući tim</option>

            {teams.map((team) => (
              <option
                key={team.teamId}
                value={team.teamId}
                disabled={team.teamId !== awayTeamId && isTeamUsed(team.teamId)}
              >
                {team.name}
                {isTeamUsed(team.teamId) ? " — već igra" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Vrijeme početka"
        type="datetime-local"
        value={kickoffTime}
        onChange={(event) => setKickoffTime(event.target.value)}
      />

      <Button
        type="button"
        onClick={handleSubmit}
        loading={loading}
        disabled={
          loading ||
          loadingTeams ||
          homeTeamId === "" ||
          awayTeamId === "" ||
          !kickoffTime ||
          homeTeamId === awayTeamId ||
          usedTeamIds.has(homeTeamId as number) ||
          usedTeamIds.has(awayTeamId as number)
        }
      >
        Dodaj utakmicu
      </Button>
    </Card>
  );
};

export default MatchForm;
