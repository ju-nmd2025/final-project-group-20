let player;
let platforms = [];
let score = 0;
let gamestate = 'start';

function setup() {
    createCanvas(400, 600);
    player = new Player();
    for (
        let i = 0; i < 6; i++{  
        platforms.push(new Platform(random(wedth),i * 100));
        }
    )
}
function draw() {
    background(255);
if (gamestate === 'start') {
    drawStartScreen();
}else if (gamestate === 'playing') {
    playGame();
}else if (gamestate === 'gameover') {
    drawGameOverScreen();
}
}

function drawStartScreen() {
    textAlign(CENTER);
    textSize(32);
    fill(0);
    text('jump', width / 2, height / 2-20);
    textSize(16);
    text('press space to start', width / 2, height / 2 + 20);
}
