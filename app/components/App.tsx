import { data as goalkeepers } from "../../data/P";
import { data as defenders } from "../../data/D";
import { data as midfielders } from "../../data/C";
import { data as attackers } from "../../data/A";
import { PlayerSelection } from "./PlayerSelection";
import { ParticipantsTable } from "./ParticipantsTable";
import {
  Participant,
  Player,
  PlayerRawData,
  PlayerRole,
  Purchase,
} from "../types/types";
import { useEffect, useMemo, useState } from "react";
import { maxPlayersPerRole } from "../constants/constants";

export function App() {
  const [participantsNumber, setParticipantsNumber] = useState(10);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [maxCredits, setMaxCredits] = useState(500);
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);

  const emptyParticipant: Participant = {
    name: "",
    credits: maxCredits,
    players: {
      P: [],
      D: [],
      C: [],
      A: [],
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
        return { ...participant, credits: maxCredits };
      })
    );
  }, [maxCredits]);

  function parseData(data: PlayerRawData[]): Player[] {
    return data.map((e) => {
      return {
        name: e.name,
        team: e.team,
        role: e.role as PlayerRole,
        mediumPrice: parseFloat(e.pma.replace(",", ".")),
        suggestedPrice: parseFloat(e.pfc.replace(",", ".")),
        slot: parseInt(e.slot),
        grade: parseInt(e.grade),
        expectedFM: parseFloat(e.expBonus.replace(",", ".")),
        updatedAt: new Date(e.updatedAt),
        priceDifference: parseFloat(e.dpfcpma.replace(",", ".")),
      };
    });
  }

  const [players, setPlayers] = useState<Player[]>([
    ...parseData(goalkeepers),
    ...parseData(defenders),
    ...parseData(midfielders),
    ...parseData(attackers),
  ]);

  function assignPlayerToParticipant(
    playerRole: PlayerRole,
    playerIndex: number,
    participantIdx: number,
    credits: number
  ) {
    const player = players[playerIndex];
    const participant = participants[participantIdx];
    const playerEntry = { player, credits };

    if (participant.players[playerRole].length >= maxPlayersPerRole[playerRole])
      return;

    participant.players[playerRole].push(playerEntry);

    setParticipants([
      ...participants.slice(0, participantIdx),
      participant,
      ...participants.splice(participantIdx + 1),
    ]);

    setPurchaseHistory(purchaseHistory.concat({ participantIdx, playerEntry }));
    setPlayers(players.filter((_, idx) => idx !== playerIndex));
    setSelectedPlayer(undefined);
  }

  const undoLastPurchase = useMemo(
    () => () => {
      const lastPurchase = purchaseHistory[purchaseHistory.length - 1];
      const participant = participants[lastPurchase.participantIdx];
      const playerRole = lastPurchase.playerEntry.player.role;
      participant.players[playerRole].pop();

      setParticipants([
        ...participants.slice(0, lastPurchase.participantIdx),
        participant,
        ...participants.splice(lastPurchase.participantIdx + 1),
      ]);
      setPlayers([...players, lastPurchase.playerEntry.player]);

      purchaseHistory.pop();
      setPurchaseHistory(purchaseHistory);
    },
    [purchaseHistory, participants, players]
  );

  return (
    <div className="flex flex-col gap-5 p-10">
      <PlayerSelection
        players={players}
        participants={participants}
        assignPlayerToParticipant={assignPlayerToParticipant}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
      />
      <ParticipantsTable
        participants={participants}
        setParticipants={setParticipants}
        maxCredits={maxCredits}
      />

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

        <div
          className="bg-red-400 p-1 rounded-lg hover:cursor-pointer"
          onClick={undoLastPurchase}
        >
          Annulla
        </div>
      </div>
    </div>
  );
}
