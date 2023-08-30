import { ParticipantColumn } from "./ParticipantColumn";
import { Participant } from "../types/types";

interface Props {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  maxCredits: number;
}

export function ParticipantsTable(props: Props) {
  const { participants, setParticipants, maxCredits } = props;

  return (
    <div className="flex flex-col gap-5">
      <div className={"grid grid-flow-col"}>
        {participants.map((participant, idx) => (
          <ParticipantColumn
            key={idx}
            participants={participants}
            setParticipants={setParticipants}
            idx={idx}
            maxCredits={maxCredits}
          />
        ))}
      </div>
    </div>
  );
}
