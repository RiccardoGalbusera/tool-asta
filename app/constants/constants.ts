import { PlayerRole } from "../types/types";

export const roleToColor: Record<PlayerRole, string> = {
  P: "bg-orange-300",
  D: "bg-green-300",
  C: "bg-blue-300",
  A: "bg-red-300",
};

export const maxPlayersPerRole: Record<PlayerRole, number> = {
  P: 3,
  D: 8,
  C: 8,
  A: 8,
};
