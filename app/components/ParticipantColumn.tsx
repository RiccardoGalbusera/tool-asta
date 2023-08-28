import { Participant } from "./ParticipantsTable";
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

  const goalkeepersCredits = participant.players.goalkeepers.reduce(
    (prev, curr, idx) => prev + curr.credits,
    0
  );
  const defendersCredits = participant.players.defenders.reduce(
    (prev, curr, idx) => prev + curr.credits,
    0
  );
  const midfieldersCredits = participant.players.midfielders.reduce(
    (prev, curr, idx) => prev - curr.credits,
    0
  );
  const attackersCredits = participant.players.goalkeepers.reduce(
    (prev, curr, idx) => prev - curr.credits,
    0
  );

  const afterGoalkeepersCredits = maxCredits - goalkeepersCredits;
  const afterDefendersCredits = afterGoalkeepersCredits - defendersCredits;
  const afterMidfieldersCredits = afterDefendersCredits - midfieldersCredits;
  const afterAttackersCredits = afterMidfieldersCredits - attackersCredits;

  return (
    <div className={`w-1/${participants.length} flex flex-col gap-2`}>
      <input
        defaultValue={participant.name}
        onBlur={(e) => changeParticipantName(e.target.value)}
        className="w-full"
      />
      <div className="flex justify-between text-lg">
        Crediti rimasti: <span>{participant.credits}</span>
      </div>
      <div>
        <div className="flex justify-between px-1">
          Portieri: <span>{goalkeepersCredits}</span>
        </div>
        <PlayersSection
          maxCount={3}
          playerEntries={participant.players.goalkeepers}
        />
        <div className="flex justify-between px-1">
          Crediti Rimasti: <span>{afterGoalkeepersCredits}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between px-1">
          Difensori: <span>{defendersCredits}</span>
        </div>
        <PlayersSection
          maxCount={8}
          playerEntries={participant.players.defenders}
        />
        <div className="flex justify-between px-1">
          Crediti Rimasti: <span>{afterDefendersCredits}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between px-1">
          Centrocampisti: <span>{midfieldersCredits}</span>
        </div>{" "}
        <PlayersSection
          maxCount={8}
          playerEntries={participant.players.midfielders}
        />
        <div className="flex justify-between px-1">
          Crediti Rimasti: <span>{afterMidfieldersCredits}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between px-1">
          Attaccanti: <span>{attackersCredits}</span>
        </div>{" "}
        <PlayersSection
          maxCount={6}
          playerEntries={participant.players.attackers}
        />
        <div className="flex justify-between px-1">
          Crediti Rimasti: <span>{afterAttackersCredits}</span>
        </div>
      </div>
    </div>
  );
}
