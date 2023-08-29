export enum PlayerRole {
  GOALKEEPER = "P",
  DEFENDER = "D",
  MIDFIELDER = "C",
  ATTACKER = "A",
}

export type Player = {
  role: PlayerRole;
  name: string;
};

export type PlayerEntry = {
  player: Player;
  credits: number;
};

export type PlayerRow = {
  name: string;
  team: string;
  role: PlayerRole;
  mediumPrice: number;
  suggestedPrice: number;
  slot: number;
  grade: number;
  expectedFM: number;
  updatedAt: string;
  priceDifference: number;
};
