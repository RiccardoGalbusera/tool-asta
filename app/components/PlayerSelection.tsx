import { useMemo, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { PlayerRole, Player, Participant } from "../types/types";
import { PlayerCard } from "./PlayerCard";
import { RoleCircle } from "./RoleCircle";
import { AssignPlayerSection } from "./AssignPlayerSection";

interface Props {
  players: Player[];
  participants: Participant[];
  selectedPlayer: Player | undefined;
  setSelectedPlayer: (player: Player | undefined) => void;
  assignPlayerToParticipant: (
    playerRole: PlayerRole,
    playerIndex: number,
    participantIdx: number,
    credits: number
  ) => void;
}

export function PlayerSelection(props: Props) {
  const {
    players,
    participants,
    assignPlayerToParticipant,
    setSelectedPlayer,
    selectedPlayer,
  } = props;
  const [selectedRole, setSelectedRole] = useState<PlayerRole>(
    PlayerRole.GOALKEEPER
  );
  const selectedPlayerIdx = useMemo(
    () =>
      selectedPlayer
        ? players.findIndex((player) => player.name === selectedPlayer.name)
        : undefined,
    [selectedPlayer, players]
  );

  const rolePlayers = useMemo(
    () =>
      players
        .filter((player) => player.role === selectedRole)
        .sort((a, b) => (a.name < b.name ? -1 : 1)),
    [selectedRole, players]
  );

  return (
    <div className="w-full border rounded-xl p-10 flex flex-col gap-10">
      <div className="flex gap-10">
        <div className="w-1/3 flex flex-col gap-5">
          <div className="mx-16 flex gap-16 justify-between">
            {Object.values(PlayerRole).map((role, idx) => {
              const isSelected = selectedRole === role;
              return (
                <RoleCircle
                  key={role}
                  role={role}
                  onClick={() => {
                    setSelectedRole(role);
                    setSelectedPlayer(undefined);
                  }}
                  isSelected={isSelected}
                />
              );
            })}
          </div>
          <Dropdown
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.value)}
            options={rolePlayers}
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

      {selectedPlayer && selectedPlayerIdx !== undefined && (
        <AssignPlayerSection
          participants={participants}
          selectedRole={selectedRole}
          selectedPlayerIdx={selectedPlayerIdx}
          assignPlayerToParticipant={assignPlayerToParticipant}
        />
      )}
    </div>
  );
}
