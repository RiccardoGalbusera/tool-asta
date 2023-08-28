import { useState, useEffect } from "react";
import { ParticipantColumn } from "./ParticipantColumn";
import { PlayerEntry } from "../types/types";
import { PlayerSelection } from "./PlayerSelection";

export type Participant = {
  name: string;
  credits: number;
  players: {
    goalkeepers: PlayerEntry[];
    defenders: PlayerEntry[];
    midfielders: PlayerEntry[];
    attackers: PlayerEntry[];
  };
};

export function ParticipantsTable() {
  const [participantsNumber, setParticipantsNumber] = useState(10);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [maxCredits, setMaxCredits] = useState(500);

  const emptyParticipant = {
    name: "",
    credits: maxCredits,
    players: {
      goalkeepers: [],
      defenders: [],
      midfielders: [],
      attackers: [],
    },
  };

  useEffect(() => {
    if (participantsNumber > participants.length) {
      const participantsToAdd = participantsNumber - participants.length;
      for (let i = 0; i < participantsToAdd; i++) {
        setParticipants([...participants, emptyParticipant]);
      }
    } else if (participantsNumber < participants.length) {
      setParticipants(participants.slice(0, participantsNumber - 1));
    }
  }, [participantsNumber, participants]);

  useEffect(() => {
    setParticipants(
      participants.map((participant) => {
        const creditsLeft = participant;
        return { ...participant, credits: maxCredits };
      })
    );
  }, [maxCredits]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <div>
          Partecipanti:{" "}
          <input
            defaultValue={participantsNumber}
            onBlur={(e: any) => setParticipantsNumber(e.target.value)}
          />
        </div>

        <div>
          Crediti:{" "}
          <input
            defaultValue={maxCredits}
            onBlur={(e: any) => setMaxCredits(e.target.value)}
          />
        </div>
      </div>

      <PlayerSelection />

      <div className="flex gap-2">
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
