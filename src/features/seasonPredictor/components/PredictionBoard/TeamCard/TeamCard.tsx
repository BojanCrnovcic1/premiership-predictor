import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

import type { TeamsTypes } from "../../../../../types/teams.types";

import styles from "./TeamCard.module.scss";

interface Props {
  team: TeamsTypes;
  position: number;
}

const TeamCard = ({ team, position }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: team.teamId!,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.card}
      {...attributes}
      {...listeners}
    >
      <div className={styles.position}>{position}</div>

      <img src={team.logoUrl} alt={team.name} className={styles.logo} />

      <div className={styles.info}>
        <span className={styles.name}>{team.name}</span>

        <span className={styles.shortName}>{team.shortName}</span>
      </div>

      <GripVertical className={styles.drag} size={18} />
    </div>
  );
};

export default TeamCard;
