import { MouseEventHandler } from "react";

interface Props {
  highlighted: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function DownTriangle({ highlighted, className, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`w-0 h-0 border-l-[0.5rem] border-l-transparent border-t-[0.75rem] 
       border-r-[0.5rem] border-r-transparent ${
         highlighted ? "border-t-black" : "border-t-white"
       } ${className}`}
    ></div>
  );
}
