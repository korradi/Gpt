const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const tileSize = 20;
const tiles = canvas.width / tileSize;

interface Point {
  x: number;
  y: number;
}

let snake: Point[] = [{ x: tiles / 2, y: tiles / 2 }];
let direction: Point = { x: 0, y: 0 };
let food: Point = randomFood();

function randomFood(): Point {
  return {
    x: Math.floor(Math.random() * tiles),
    y: Math.floor(Math.random() * tiles)
  };
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 1) break;
      direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === -1) break;
      direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 1) break;
      direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === -1) break;
      direction = { x: 1, y: 0 };
      break;
  }
});

function gameLoop() {
  const head = { x: snake[0]!.x + direction.x, y: snake[0]!.y + direction.y };

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= tiles ||
    head.y >= tiles ||
    snake.some((s) => s.x === head.x && s.y === head.y)
  ) {
    alert('Game Over');
    snake = [{ x: tiles / 2, y: tiles / 2 }];
    direction = { x: 0, y: 0 };
    food = randomFood();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = randomFood();
  } else {
    snake.pop();
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'lime';
  snake.forEach((s) => ctx.fillRect(s.x * tileSize, s.y * tileSize, tileSize, tileSize));

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

setInterval(gameLoop, 100);
