import { data as goalkeepers } from "../../data/P";
import { data as defenders } from "../../data/D";
import { data as midfielders } from "../../data/C";
import { data as attackers } from "../../data/A";
import { PlayerSelection } from "./PlayerSelection";
import { ParticipantsTable } from "./ParticipantsTable";
import { Listone, PlayerRawData, PlayerRole } from "../types/types";

export function App() {
  function parseData(data: PlayerRawData[]): Listone["P"] {
    return data.map((e) => {
      return {
        name: e.name,
        team: e.team,
        role: e.role as PlayerRole,
        mediumPrice: Number(e.pma),
        suggestedPrice: Number(e.pfc),
        slot: Number(e.slot),
        grade: Number(e.grade),
        expectedFM: Number(e.expBonus),
        updatedAt: new Date(e.updatedAt),
        priceDifference: Number(e.dpfcpma),
      };
    });
  }

  const players: Listone = {
    P: parseData(goalkeepers),
    D: parseData(defenders),
    C: parseData(midfielders),
    A: parseData(attackers),
  };

  return (
    <div className="flex flex-col gap-5 p-10">
      <PlayerSelection players={players} />
      <ParticipantsTable />
    </div>
  );
}
