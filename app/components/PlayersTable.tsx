import { useMemo } from "react";
import { Player, PlayerRole } from "../types/types";

interface Props {
  selectedRole: PlayerRole;
  players: Player[];
}
export function PlayersTable(props: Props) {
  const { selectedRole, players } = props;

  const rolePlayers = useMemo(
    () =>
      players
        .filter((player) => player.role === selectedRole)
        .sort((a, b) => b.suggestedPrice - a.suggestedPrice),
    [selectedRole, players]
  );

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Squadra</th>
          <th>Medio</th>
          <th>Suggerito</th>
          <th>FM attesa</th>
          <th>Differenza</th>
          <th>Slot</th>
        </tr>
      </thead>
      <tbody>
        {rolePlayers.map((player) => {
          return (
            <tr key={player.name}>
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
                {player.slot}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
