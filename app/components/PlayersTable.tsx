import { useMemo, useState } from "react";
import { Player, PlayerRole } from "../types/types";
import { SortingArrows, SortingField } from "./SortingArrows";

interface Props {
  selectedRole: PlayerRole;
  players: Player[];
}

export function PlayersTable(props: Props) {
  const { selectedRole, players } = props;
  const [sortingField, setSortingField] = useState<SortingField>({
    field: "mediumPrice",
    order: "desc",
  });

  const rolePlayers = useMemo(
    () =>
      players
        .filter((player) => player.role === selectedRole)
        .sort(
          (a, b) =>
            (Number(a[sortingField.field]) - Number(b[sortingField.field])) *
            (sortingField.order === "desc" ? -1 : 1)
        ),
    [selectedRole, players, sortingField]
  );

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Squadra</th>
          <th>
            {" "}
            <div className="flex items-center justify-center gap-2">
              Medio{" "}
              <SortingArrows
                field="mediumPrice"
                setOrdering={setSortingField}
                currentOrdering={sortingField}
              />
            </div>
          </th>
          <th>
            {" "}
            <div className="flex items-center justify-center gap-2">
              Suggerito{" "}
              <SortingArrows
                field="suggestedPrice"
                setOrdering={setSortingField}
                currentOrdering={sortingField}
              />
            </div>
          </th>
          <th>
            <div className="flex items-center justify-center gap-2">
              FM Attesa{" "}
              <SortingArrows
                field="expectedFM"
                setOrdering={setSortingField}
                currentOrdering={sortingField}
              />
            </div>
          </th>
          <th>
            <div className="flex items-center justify-center gap-2">
              Differenza{" "}
              <SortingArrows
                field="priceDifference"
                setOrdering={setSortingField}
                currentOrdering={sortingField}
              />
            </div>
          </th>
          <th>
            <div className="flex items-center justify-center gap-2">
              Percentuale Voto{" "}
              <SortingArrows
                field="grade"
                setOrdering={setSortingField}
                currentOrdering={sortingField}
              />
            </div>
          </th>
          <th>
            <div className="flex items-center justify-center gap-2">
              Slot{" "}
              <SortingArrows
                field="slot"
                setOrdering={setSortingField}
                currentOrdering={sortingField}
              />
            </div>
          </th>
          <th>Traits</th>
        </tr>
      </thead>
      <tbody>
        {rolePlayers.map((player) => {
          return (
            <tr key={player.name} className="hover:bg-slate-800">
              <td className="border border-1 px-1 text-center">
                {player.name}
              </td>
              <td className="border border-1 px-1 text-center">
                {player.team.slice(0, 3)}
              </td>
              <td className="border border-1 px-1 text-center">
                {player.mediumPrice}
              </td>
              <td className="border border-1 px-1 text-center">
                {player.suggestedPrice}
              </td>
              <td className="border border-1 px-1 text-center">
                {player.expectedFM}
              </td>
              <td className="border border-1 px-1 text-center">
                {player.priceDifference}
              </td>
              <td className="border border-1 px-1 text-center">
                {player.grade}%
              </td>
              <td className="border border-1 px-1 text-center">
                {player.slot}
              </td>
              <td className="border border-1 px-1 text-center">
                {player.traits.map((trait) => trait.charAt(0)).join(" ")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
