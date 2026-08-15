import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import type { TeamsTypes } from "../../../../types/teams.types";
import TeamCard from "./TeamCard/TeamCard";

import styles from "./PredictionBoard.module.scss";

interface Props {
  prediction: TeamsTypes[];
  onChange: (teams: TeamsTypes[]) => void;
}

const PredictionBoard = ({ prediction, onChange }: Props) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = prediction.findIndex((item) => item.teamId === active.id);
    const newIndex = prediction.findIndex((item) => item.teamId === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    onChange(arrayMove(prediction, oldIndex, newIndex));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={prediction.map((team) => team.teamId!)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.board}>
          {prediction.map((team, index) => (
            <TeamCard key={team.teamId} team={team} position={index + 1} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default PredictionBoard;
