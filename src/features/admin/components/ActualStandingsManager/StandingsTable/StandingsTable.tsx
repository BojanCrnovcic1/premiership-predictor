import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { ActualStandingsTypes } from "../../../../../types/actual-standings.types";

import SortableStandingRow from "../SortableStandingRow/SortableStandingRow";

import styles from "./StandingsTable.module.scss";

interface Props {
  standings: ActualStandingsTypes[];
  onReorder: (teamId: number, newPosition: number) => void;
  disabled?: boolean;
}

const StandingsTable = ({ standings, onReorder, disabled = false }: Props) => {
  const handleDragEnd = (event: DragEndEvent) => {
    if (disabled) return;

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = standings.findIndex((item) => item.teamId === active.id);

    const newIndex = standings.findIndex((item) => item.teamId === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Pozicija je 1-based.
    onReorder(Number(active.id), newIndex + 1);
  };

  return (
    <div className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={standings.map((standing) => standing.teamId)}
          strategy={verticalListSortingStrategy}
        >
          <div className={styles.list}>
            {standings.map((standing, index) => (
              <SortableStandingRow
                key={standing.teamId}
                standing={standing}
                position={index + 1}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default StandingsTable;
