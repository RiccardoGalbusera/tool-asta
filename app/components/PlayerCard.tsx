import { Player } from "../types/types";
import { RoleCircle } from "./RoleCircle";

interface Props {
  player: Player;
}

export function PlayerCard(props: Props) {
  const { player } = props;
  return (
    <div className="flex justify-center w-2/3 gap-10">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-4xl">{player.name}</div>
        <div className="flex justify-between gap-8 text-2xl">
          <div>{player.team}</div>
          <RoleCircle role={player.role} />
        </div>
      </div>

      <div className="flex my-auto gap-5">
        <div className="flex flex-col gap-2 items-center">
          <div>Prezzo medio</div>
          <div className="text-xl font-bold">{player.mediumPrice}</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div>Prezzo consigliato</div>
          <div className="text-xl font-bold">{player.suggestedPrice}</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div>Fantamedia attesa</div>
          <div className="text-xl font-bold">{player.expectedFM}</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div>Percentuale voto</div>
          <div className="text-xl font-bold">{player.grade}%</div>
        </div>
      </div>
    </div>
  );
}
