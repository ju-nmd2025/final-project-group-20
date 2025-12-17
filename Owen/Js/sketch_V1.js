let game;

function setup() {
  const canvas = createCanvas(400, 600);
  canvas.parent("p5-container");
  game = new Game(width, height);
}

function draw() {
  game.updateGame();
  game.displayGame();
}

function keyPressed() {
  game.handleInput();
  return false;
}
