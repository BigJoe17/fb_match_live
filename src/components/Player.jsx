export default function Player({ player, isBallHolder }) {
    return (
      <div
        className={`absolute ${player.color} w-4 h-4 rounded-full border-2 ${
          isBallHolder ? "border-yellow-400 scale-125" : "border-white"
        } transition-all`}
        style={{
          left: `${player.x}%`,
          top: `${player.y}%`,
          transition: "all 0.5s ease",
        }}
      >
        <span className="absolute text-white text-[8px] -top-5 left-1/2 -translate-x-1/2">
          #{player.id}
        </span>
      </div>
    );
  }
  