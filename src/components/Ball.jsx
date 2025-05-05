export default function Ball({ position }) {
    return (
      <div
        className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transition: "all 0.5s ease",
        }}
      />
    );
  }
  