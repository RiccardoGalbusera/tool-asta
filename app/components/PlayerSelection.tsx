import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Player, PlayerRole } from "../types/types";
import { roleToColor } from "../constants";

export function PlayerSelection() {
  const players: Player[] = [
    { name: "Giovanni", role: PlayerRole.ATTACKER },
    { name: "Giorgio", role: PlayerRole.ATTACKER },
    { name: "Filippo", role: PlayerRole.ATTACKER },
    { name: "Stefano", role: PlayerRole.ATTACKER },
  ];
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [selectedRole, setSelectedRole] = useState<PlayerRole>();

  return (
    <div className="border rounded-xl p-2">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="mx-24 flex gap-2 justify-between">
          {Object.values(PlayerRole).map((role, idx) => {
            const isSelected = selectedRole === role;
            return (
              <div
                key={role}
                className={`border rounded-full px-1.5 ${
                  isSelected ? roleToColor[role] : "opacity-80"
                }`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </div>
            );
          })}
        </div>
        <Dropdown
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.value)}
          options={players}
          optionLabel="name"
          placeholder="Giocatore"
          filter
          virtualScrollerOptions={{ itemSize: 38 }}
          valueTemplate={(option, props) => {
            return <span>{option?.name}</span>;
          }}
          itemTemplate={(option) => {
            return <span>{option.name}</span>;
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
