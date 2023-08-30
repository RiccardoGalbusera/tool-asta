import { useState } from "react";
import { Participant, PlayerRole } from "../types/types";
import { ParticipantButton } from "./ParticipantButton";

interface Props {
  participants: Participant[];
  selectedRole: PlayerRole;
  selectedPlayerIdx: number;
  assignPlayerToParticipant: (
    playerRole: PlayerRole,
    playerIndex: number,
    participantIdx: number,
    credits: number
  ) => void;
}

export function AssignPlayerSection(props: Props) {
  const {
    participants,
    selectedRole,
    selectedPlayerIdx,
    assignPlayerToParticipant,
  } = props;
  const [selectedParticipantIdx, setSelectedParticipantIdx] =
    useState<number>();
  const [playerCredits, setPlayerCredits] = useState<number>();

  return (
    <div className="flex gap-10 items-center">
      <div className="grid grid-rows-2 grid-flow-col w-2/3">
        {participants.map((participant, idx) => {
          return (
            <ParticipantButton
              key={`participant-button-${idx}`}
              idx={idx}
              participant={participant}
              selectedParticipantIdx={selectedParticipantIdx}
              selectedRole={selectedRole}
              setSelectedParticipantIdx={setSelectedParticipantIdx}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex gap-2 text-xl">
          <div className="font-bold">Prezzo:</div>
          <input
            type="number"
            value={playerCredits}
            onChange={(e) => setPlayerCredits(Number(e.target.value))}
            className="w-[4rem] rounded text-center"
          />
        </div>
        <div
          className="border border-1 bg-green-800 rounded text-center font-bold text-lg hover:cursor-pointer p-2"
          onClick={() => {
            if (selectedParticipantIdx === undefined || !playerCredits)
              return console.log({ selectedParticipantIdx, playerCredits });
            assignPlayerToParticipant(
              selectedRole,
              selectedPlayerIdx,
              selectedParticipantIdx,
              playerCredits
            );
          }}
        >
          Assegna
        </div>
      </div>
    </div>
  );
}
