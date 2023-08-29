import { roleToColor } from "../constants/constants";
import { PlayerRole } from "../types/types";

interface Props {
  role: PlayerRole;
  onClick?: () => void;
  isSelected?: boolean;
}

export function RoleCircle(props: Props) {
  const { role, onClick, isSelected = true } = props;
  return (
    <div
      key={role}
      className={`border rounded-full px-2 text-lg ${
        isSelected ? roleToColor[role] : "opacity-80"
      } ${onClick ? "hover:cursor-pointer" : ""}`}
      onClick={onClick ?? undefined}
    >
      {role}
    </div>
  );
}
