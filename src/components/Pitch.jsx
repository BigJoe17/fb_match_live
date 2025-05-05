import { useEffect, useState } from "react";
import EventOverlay from "./EventOverlay";
import Player from "./Player";
import Ball from "./Ball";
import goalSound from "../assets/sounds/Crowd-cheering.mp3";
import { getRandomPosition, isNear } from "../utils/helpers";

const createPlayers = () => [
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    team: "home",
    x: Math.random() * 90,
    y: Math.random() * 100,
    color: "bg-blue-500",
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 6,
    team: "away",
    x: Math.random() * 90,
    y: Math.random() * 100,
    color: "bg-red-500",
  })),
];

export default function Pitch() {
  const [playerPositions, setPlayerPositions] = useState(createPlayers);
  const [ball, setBall] = useState({ x: 50, y: 50 });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const goalAudio = new Audio(goalSound);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerPositions((prev) =>
        prev.map((p) => ({
          ...p,
          x: getRandomPosition(p.x, 5, 95),
          y: getRandomPosition(p.y, 5, 95),
        }))
      );

      const ballHolder = playerPositions.find((p) => isNear(p, ball));
      if (ballHolder) {
        const newBall = {
          x: getRandomPosition(ballHolder.x, 0, 100),
          y: getRandomPosition(ballHolder.y, 0, 100),
        };
        setBall(newBall);

        if (newBall.x <= 3) {
          setAwayScore((s) => s + 1);
          goalAudio.play();
        } else if (newBall.x >= 97) {
          setHomeScore((s) => s + 1);
          goalAudio.play();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playerPositions, ball]);

  useEffect(() => {
    const eventTypes = ["goal", "foul", "sub", "start"];
    const eventInterval = setInterval(() => {
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      setCurrentEvent({ type, player: Math.floor(Math.random() * 10) + 1 });
    }, 10000);
    return () => clearInterval(eventInterval);
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-8 px-2">
      <div className="relative bg-green-700 border-4 border-white rounded-xl overflow-hidden"
        style={{ width: "100%", maxWidth: "800px", aspectRatio: "3 / 2" }}>

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-6 px-6 py-2 bg-black bg-opacity-70 rounded-xl shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full shadow-lg border-2 border-white" />
              <span className="text-white font-bold text-sm">HOME</span>
            </div>
            <div className="text-white font-extrabold text-xl tracking-wider">
              {homeScore} - {awayScore}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">AWAY</span>
              <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg border-2 border-white" />
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 w-1 h-full bg-white transform -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 left-0 w-6 h-1/2 border-2 border-white" />
        <div className="absolute top-1/4 right-0 w-6 h-1/2 border-2 border-white" />

        {playerPositions.map((player) => (
          <Player
            key={player.id}
            player={player}
            isBallHolder={isNear(player, ball)}
          />
        ))}

        <Ball position={ball} />
        <EventOverlay event={currentEvent} />
      </div>
    </div>
  );
}
