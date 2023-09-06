import { Trait } from "@/data/traits";

export enum PlayerRole {
  GOALKEEPER = "P",
  DEFENDER = "D",
  MIDFIELDER = "C",
  ATTACKER = "A",
}

export type PlayerEntry = {
  player: Player;
  credits: number;
};

export type Player = {
  name: string;
  team: string;
  role: PlayerRole;
  mediumPrice: number;
  suggestedPrice: number;
  slot: number;
  grade: number;
  expectedFM: number;
  updatedAt: Date;
  priceDifference: number;
  traits: Trait[];
};

export type PlayerRawData = {
  name: string;
  team: string;
  role: string;
  pma: string;
  pfc: string;
  slot: string;
  grade: string;
  expBonus: string;
  updatedAt: string;
  dpfcpma: string;
};

export type Participant = {
  name: string;
  credits: number;
  players: {
    P: PlayerEntry[];
    D: PlayerEntry[];
    C: PlayerEntry[];
    A: PlayerEntry[];
  };
};

export type Purchase = {
  participantIdx: number;
  playerEntry: PlayerEntry;
};
