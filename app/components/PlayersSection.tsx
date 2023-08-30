import { PlayerEntry } from "../types/types";

interface Props {
  playerEntries: PlayerEntry[];
  maxCount: number;
}

export function PlayersSection(props: Props) {
  const { playerEntries, maxCount } = props;

  const entries = Array.from(Array(maxCount).keys());
  return (
    <div className="flex flex-col">
      {entries.map((e, id) => {
        const playerEntry =
          id < playerEntries.length ? playerEntries[id] : null;
        return (
          <div
            key={id}
            className="border px-3 flex justify-between h-5 text-sm"
          >
            <div>{playerEntry ? playerEntry.player.name : ""}</div>
            <div>{playerEntry ? playerEntry.credits : ""}</div>
          </div>
        );
      })}
    </div>
  );
}
