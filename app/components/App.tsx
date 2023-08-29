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
        mediumPrice: parseFloat(e.pma.replace(",", ".")),
        suggestedPrice: parseFloat(e.pfc.replace(",", ".")),
        slot: parseInt(e.slot),
        grade: parseInt(e.grade),
        expectedFM: parseFloat(e.expBonus.replace(",", ".")),
        updatedAt: new Date(e.updatedAt),
        priceDifference: parseFloat(e.dpfcpma.replace(",", ".")),
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
