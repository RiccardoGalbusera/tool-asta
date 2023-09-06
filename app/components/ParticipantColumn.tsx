import { maxPlayersPerRole } from "../constants/constants";
import { Participant, PlayerRole } from "../types/types";
import { PlayersSection } from "./PlayersSection";

interface Props {
  maxCredits: number;
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  idx: number;
}

export function ParticipantColumn(props: Props) {
  const { maxCredits, participants, setParticipants, idx } = props;
  const participant = participants[idx];

  const changeParticipantName = (name: string) => {
    const newParticipant = { ...participant, name };
    setParticipants([
      ...participants.slice(0, idx),
      newParticipant,
      ...participants.slice(idx + 1),
    ]);
  };

  const goalkeepersCredits = participant.players.P.reduce(
    (prev, curr, idx) => prev + curr.credits,
    0
  );
  const defendersCredits = participant.players.D.reduce(
    (prev, curr, idx) => prev + curr.credits,
    0
  );
  const midfieldersCredits = participant.players.C.reduce(
    (prev, curr, idx) => prev + curr.credits,
    0
  );
  const attackersCredits = participant.players.A.reduce(
    (prev, curr, idx) => prev + curr.credits,
    0
  );

  const afterGoalkeepersCredits = maxCredits - goalkeepersCredits;
  const afterDefendersCredits = afterGoalkeepersCredits - defendersCredits;
  const afterMidfieldersCredits = afterDefendersCredits - midfieldersCredits;
  const afterAttackersCredits = afterMidfieldersCredits - attackersCredits;

  return (
    <div
      className={`flex flex-col gap-2 p-1 outline-1 outline outline-gray-300 rounded mx-1`}
    >
      <input
        defaultValue={participant.name}
        onBlur={(e) => changeParticipantName(e.target.value)}
        className="w-full"
      />
      <div className="flex justify-between text-lg">
        Crediti: <span>{afterAttackersCredits}</span>
      </div>
      <div>
        <div className="flex justify-between text-sm px-1">
          POR: <span>{goalkeepersCredits}</span>
        </div>
        <PlayersSection
          maxCount={maxPlayersPerRole[PlayerRole.GOALKEEPER]}
          playerEntries={participant.players.P}
        />
        <div className="flex justify-between text-sm px-1">
          Crediti: <span>{afterGoalkeepersCredits}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm px-1">
          DIF: <span>{defendersCredits}</span>
        </div>
        <PlayersSection
          maxCount={maxPlayersPerRole[PlayerRole.DEFENDER]}
          playerEntries={participant.players.D}
        />
        <div className="flex justify-between text-sm px-1">
          Crediti: <span>{afterDefendersCredits}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm px-1">
          CEN: <span>{midfieldersCredits}</span>
        </div>{" "}
        <PlayersSection
          maxCount={maxPlayersPerRole[PlayerRole.MIDFIELDER]}
          playerEntries={participant.players.C}
        />
        <div className="flex justify-between text-sm px-1">
          Crediti: <span>{afterMidfieldersCredits}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm px-1">
          ATT: <span>{attackersCredits}</span>
        </div>{" "}
        <PlayersSection
          maxCount={maxPlayersPerRole[PlayerRole.ATTACKER]}
          playerEntries={participant.players.A}
        />
        <div className="flex justify-between text-sm px-1">
          Crediti: <span>{afterAttackersCredits}</span>
        </div>
      </div>
    </div>
  );
}
