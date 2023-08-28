export enum PlayerRole {
  GOALKEEPER = "POR",
  DEFENDER = "DIF",
  MIDFIELDER = "CEN",
  ATTACKER = "ATT",
}

export type Player = {
  role: PlayerRole;
  name: string;
};

export type PlayerEntry = {
  player: Player;
  credits: number;
};
