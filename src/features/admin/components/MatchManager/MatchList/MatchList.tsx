import { useState } from "react";
import clsx from "clsx";

import Button from "../../../../../components/ui/Button/Button";
import Input from "../../../../../components/ui/Input/Input";

import type { MatchesTypes } from "../../../../../types/matches.types";

import styles from "./MatchList.module.scss";

interface Props {
  matches: MatchesTypes[];

  onUpdateScore: (
    matchId: number,
    homeScore: number,
    awayScore: number,
  ) => void;

  disabled?: boolean;
}

const MatchList = ({ matches, onUpdateScore, disabled = false }: Props) => {
  if (!matches.length) {
    return <p className={styles.empty}>Ovo kolo još nema utakmica.</p>;
  }

  return (
    <div className={styles.container}>
      {matches.map((match) => (
        <MatchRow
          key={match.matchId}
          match={match}
          onUpdateScore={onUpdateScore}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

interface MatchRowProps {
  match: MatchesTypes;

  onUpdateScore: (
    matchId: number,
    homeScore: number,
    awayScore: number,
  ) => void;

  disabled: boolean;
}

const MatchRow = ({ match, onUpdateScore, disabled }: MatchRowProps) => {
  const [homeScore, setHomeScore] = useState<number | "">(
    match.homeScore ?? "",
  );

  const [awayScore, setAwayScore] = useState<number | "">(
    match.awayScore ?? "",
  );

  const kickoff = new Date(match.kickoffTime);

  const kickoffPassed = new Date() >= kickoff;

  const handleSaveScore = () => {
    if (typeof homeScore !== "number" || typeof awayScore !== "number") {
      return;
    }

    onUpdateScore(match.matchId!, homeScore, awayScore);
  };

  return (
    <article className={styles.card}>
      <div className={styles.metaHeader}>
        <span className={styles.kickoff}>
          {kickoff.toLocaleString("bs-BA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>

        <span
          className={clsx(styles.statusBadge, {
            [styles.finished]: match.isFinished,
            [styles.live]: !match.isFinished && kickoffPassed,
            [styles.scheduled]: !match.isFinished && !kickoffPassed,
          })}
        >
          {match.isFinished
            ? "Završeno"
            : kickoffPassed
              ? "U toku / završeno"
              : "Zakazano"}
        </span>
      </div>

      <div className={styles.teamsSection}>
        <div className={clsx(styles.team, styles.home)}>
          <span className={styles.teamName}>
            {match.homeTeam.shortName || match.homeTeam.name}
          </span>

          {match.homeTeam.logoUrl && (
            <img
              className={styles.logo}
              src={match.homeTeam.logoUrl}
              alt={match.homeTeam.name}
            />
          )}
        </div>

        <span className={styles.vsBadge}>VS</span>

        <div className={clsx(styles.team, styles.away)}>
          {match.awayTeam.logoUrl && (
            <img
              className={styles.logo}
              src={match.awayTeam.logoUrl}
              alt={match.awayTeam.name}
            />
          )}

          <span className={styles.teamName}>
            {match.awayTeam.shortName || match.awayTeam.name}
          </span>
        </div>
      </div>

      <div className={styles.scoreForm}>
        <div className={styles.scoreInputs}>
          <Input
            label="Domaćin"
            type="number"
            min={0}
            value={homeScore}
            onChange={(event) =>
              setHomeScore(
                event.target.value === "" ? "" : Number(event.target.value),
              )
            }
          />

          <Input
            label="Gost"
            type="number"
            min={0}
            value={awayScore}
            onChange={(event) =>
              setAwayScore(
                event.target.value === "" ? "" : Number(event.target.value),
              )
            }
          />
        </div>

        <Button
          type="button"
          size="md"
          onClick={handleSaveScore}
          disabled={
            disabled || !match.matchId || homeScore === "" || awayScore === ""
          }
        >
          Sačuvaj rezultat
        </Button>
      </div>
    </article>
  );
};

export default MatchList;
