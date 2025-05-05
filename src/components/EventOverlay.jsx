import React from "react";

const eventColors = {
  goal: "bg-yellow-400 text-black",
  foul: "bg-red-500 text-white",
  sub: "bg-blue-500 text-white",
  start: "bg-green-500 text-white",
};

const eventMessages = {
  goal: (player) => `⚽ Goal by Player ${player}!`,
  foul: (player) => `🚫 Foul committed by Player ${player}`,
  sub: (player) => `🔁 Substitution: Player ${player}`,
  start: () => `🔔 Match Started`,
};

export default function EventOverlay({ event }) {
  if (!event) return null;

  const { type, player } = event;
  const color = eventColors[type] || "bg-gray-700 text-white";
  const message = eventMessages[type]
    ? eventMessages[type](player)
    : `Event: ${type}`;

  return (
    <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-lg shadow-md text-center text-sm font-semibold ${color}`}>
      {message}
    </div>
  );
}
