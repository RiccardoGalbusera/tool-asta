import { useMemo } from "react";
import { maxPlayersPerRole } from "../constants/constants";
import { Participant, PlayerRole } from "../types/types";

interface Props {
  participant: Participant;
  selectedRole: PlayerRole;
  idx: number;
  selectedParticipantIdx: number | undefined;
  setSelectedParticipantIdx: (idx: number) => void;
}

export function ParticipantButton(props: Props) {
  const {
    participant,
    selectedRole,
    idx,
    selectedParticipantIdx,
    setSelectedParticipantIdx,
  } = props;
  const canParticipantBuy = useMemo(
    () =>
      participant.players[selectedRole].length <
      maxPlayersPerRole[selectedRole],
    [selectedRole]
  );

  return (
    <div
      className={`flex place-content-center rounded-xl border border-1 p-1 mx-1  ${
        selectedParticipantIdx === idx ? " bg-gray-200" : ""
      } ${
        canParticipantBuy
          ? "hover:cursor-pointer "
          : "hover:cursor-not-allowed opacity-40"
      }`}
      onClick={() => {
        if (canParticipantBuy) setSelectedParticipantIdx(idx);
      }}
    >
      {participant.name ? participant.name : `Giocatore ${idx + 1}`}
    </div>
  );
}
