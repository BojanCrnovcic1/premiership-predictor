import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import type { ActualStandingsTypes } from "../../../../../types/actual-standings.types";

import styles from "./SortableStandingRow.module.scss";

interface Props {
  standing: ActualStandingsTypes;
  position: number;
}

const SortableStandingRow = ({ standing, position }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: standing.teamId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.card} ${isDragging ? styles.isDragging : ""}`}
      {...attributes}
      {...listeners}
    >
      <div className={styles.position}>{position}</div>

      <div className={styles.logoWrapper}>
        {standing.team.logoUrl ? (
          <img
            src={standing.team.logoUrl}
            alt={standing.team.name}
            className={styles.logo}
          />
        ) : (
          <div className={styles.logoPlaceholder}>?</div>
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.name}>{standing.team.name}</span>

        <span className={styles.shortName}>{standing.team.shortName}</span>
      </div>

      <div className={styles.updatedAt}>
        {new Date(standing.updateAt).toLocaleDateString("bs-BA")}
      </div>

      <GripVertical
        className={styles.drag}
        size={20}
        aria-label="Prevuci tim"
      />
    </div>
  );
};

export default SortableStandingRow;
