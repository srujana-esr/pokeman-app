import React from "react";

interface PokemonCardProps {
  name?: string;
  sprite?: string;
  move?: string;
  power?: number;
  isLeft?: boolean;
}
const PokemonCard = ({ name = "Unknown", sprite = "/placeholder.png", move, power, isLeft }: PokemonCardProps) => {
  return (
    <div className={`flex flex-col items-center ${isLeft ? "text-left" : "text-right"}`}>
      <img
        src={sprite}
        alt={`Image of ${name}`}
        className="w-50 h-50 object-contain"
        loading="lazy"
      />
      <h3 className="text-2xl font-normal mt-2 text-gray-900">{name}</h3>
      {move && power !== undefined && (
        <span className="px-4 py-2 bg-gray-200 rounded-lg mt-2 text-gray-700">
          {move} ({power})
        </span>
      )}
    </div>
  );
};

export default React.memo(PokemonCard);
