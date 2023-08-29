import { Player } from "../types/types";

interface Props {
  player: Player;
}

export function PlayerCard(props: Props) {
  const { player } = props;
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <div>{player.name}</div>
      <div>
        {player.team} {player.role}
      </div>
    </div>
  );
}
