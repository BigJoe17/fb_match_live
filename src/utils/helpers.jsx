export function getRandomPosition(current, min, max) {
    return Math.max(min, Math.min(max, current + (Math.random() - 0.5) * 5));
  }
  
  export function isNear(player, ball, threshold = 5) {
    const dx = player.x - ball.x;
    const dy = player.y - ball.y;
    return Math.sqrt(dx * dx + dy * dy) < threshold;
  }
  