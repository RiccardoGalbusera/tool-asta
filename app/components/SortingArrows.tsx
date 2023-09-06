import { useMemo, useState } from "react";
import { Player } from "../types/types";
import { DownTriangle } from "./utils/DownTriangle";

interface Props {
  field: SortingField["field"];
  currentOrdering: SortingField;
  setOrdering: (sortingField: SortingField) => void;
}

export type SortingField = {
  field: keyof Player;
  order: "asc" | "desc";
};

export function SortingArrows({ field, setOrdering, currentOrdering }: Props) {
  const isUpTriangleSelected = useMemo(
    () => currentOrdering.field === field && currentOrdering.order === "asc",
    [field, currentOrdering]
  );
  const isDownTriangleSelected = useMemo(
    () => currentOrdering.field === field && currentOrdering.order === "desc",
    [field, currentOrdering]
  );
  return (
    <div className="flex flex-col gap-1">
      <DownTriangle
        className="rotate-180 hover:cursor-pointer"
        highlighted={isUpTriangleSelected}
        onClick={() => setOrdering({ field, order: "asc" })}
      />
      <DownTriangle
        className="hover:cursor-pointer"
        highlighted={isDownTriangleSelected}
        onClick={() => setOrdering({ field, order: "desc" })}
      />{" "}
    </div>
  );
}
