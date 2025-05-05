import { useEffect, useState } from "react";
import EventOverlay from "./EventOverlay";
import Player from "./Player";
import Ball from "./Ball";
import { getRandomPosition, isNear } from "../utils/helpers";

const homeTeam = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  x: Math.random() * 30 + 10,
  y: Math.random() * 100,
  color: "bg-blue-500",
  team: "home",
}));

const awayTeam = Array.from({ length: 5 }, (_, i) => ({
  id: i + 6,
  x: Math.random() * 30 + 60,
  y: Math.random() * 100,
  color: "bg-red-500",
  team: "away",
}));

export default function Pitch() {
  const [playerPositions, setPlayerPositions] = useState([...homeTeam, ...awayTeam]);
  const [ball, setBall] = useState({ x: 50, y: 50 });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [ballHolder, setBallHolder] = useState(null);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [isHomeTurn, setIsHomeTurn] = useState(true);

  const playGoalSound = () => {
    const audio = new Audio("/sounds/goal-cheer.mp3");
    audio.play();
  };

  // Move players and ball
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerPositions((prevPlayers) =>
        prevPlayers.map((player) => ({
          ...player,
          x: getRandomPosition(player.x, 5, 95),
          y: getRandomPosition(player.y, 5, 95),
        }))
      );

      setBall((prev) => ({
        x: getRandomPosition(prev.x, 5, 95),
        y: getRandomPosition(prev.y, 5, 95),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check ball holder
  useEffect(() => {
    const holder = playerPositions.find((p) => isNear(p, ball));
    setBallHolder(holder?.id ?? null);
  }, [playerPositions, ball]);

  // Alternate team scoring every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const scoringTeam = isHomeTurn ? "home" : "away";
      const player = playerPositions.find((p) => p.team === scoringTeam);

      setCurrentEvent({
        type: "goal",
        player: player?.id,
        team: scoringTeam,
      });

      playGoalSound();

      if (scoringTeam === "home") {
        setHomeScore((prev) => prev + 1);
      } else {
        setAwayScore((prev) => prev + 1);
      }

      setIsHomeTurn((prev) => !prev); // switch turn
    }, 15000);

    return () => clearInterval(interval);
  }, [isHomeTurn, playerPositions]);

  return (
    <div className="w-full flex justify-center items-center py-8 px-2">
      <div
        className="relative bg-green-700 border-4 border-white rounded-xl overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "800px",
          aspectRatio: "3 / 2",
        }}
      >
        {/* Live Score Display */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-1 rounded-md text-sm font-bold z-10">
          🏠 {homeScore} - {awayScore} 🟥
        </div>

        {/* Field Markings */}
        <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white transform -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[15%] h-[15%] border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-[25%] left-0 w-[2%] h-[50%] border-2 border-white" />
        <div className="absolute top-[25%] right-0 w-[2%] h-[50%] border-2 border-white" />

        {/* Players */}
        {playerPositions.map((player) => (
          <Player key={player.id} player={player} isBallHolder={player.id === ballHolder} />
        ))}

        {/* Ball */}
        <Ball position={ball} />

        {/* Event Overlay */}
        <EventOverlay event={currentEvent} />
      </div>
    </div>
  );
}
