import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Listone, PlayerRole, Player } from "../types/types";
import { roleToColor } from "../constants/constants";
import { PlayerCard } from "./PlayerCard";

interface Props {
  players: Listone;
}

export function PlayerSelection(props: Props) {
  const { players } = props;
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [selectedRole, setSelectedRole] = useState<PlayerRole>(
    PlayerRole.GOALKEEPER
  );

  return (
    <div className="w-full border rounded-xl p-2 flex gap-10">
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
                onClick={() => {
                  setSelectedRole(role);
                  setSelectedPlayer(undefined);
                }}
              >
                {role}
              </div>
            );
          })}
        </div>
        <Dropdown
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.value)}
          options={players[selectedRole]}
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

      {selectedPlayer && <PlayerCard player={selectedPlayer} />}
    </div>
  );
}
