class Game {
  constructor(width, height) {
    this.gameWidth = width;
    this.gameHeight = height;

    this.gameState = "start";

    // Game objects
    this.player = null;
    this.platformManager = null;

    // Scoring
    this.highScore = localStorage.getItem("doodleJumpHighScore") || 0;
    this.currentScore = 0;

    // Initialize
    this.reset();

    //level
    this.currentLevel = 1;
  }

  reset() {
    // Create player at center bottom
    this.player = new Player(this.gameWidth / 2, this.gameHeight - 100, null);

    // Create platform manager
    this.platformManager = new PlatformManager(this.gameWidth, this.gameHeight);

    // Add a starting platform under player
    this.platformManager.platforms.push(
      new Platform(this.gameWidth / 2, this.gameHeight - 50, 80, 15, "normal")
    );
  }

  startGame() {
    this.gameState = "playing";
    this.reset();
  }

  updateGame() {
    if (this.gameState !== "playing") return;

    // Update player
    this.player.update();

    // Check platform collisions
    const collidedPlatform = this.platformManager.checkCollisions(this.player);
    if (collidedPlatform) {
      this.player.jump();
    }

    // Update platforms
    this.platformManager.update(this.player.y);
    
    // Get current level from platform manager and apply to player physics
    this.currentLevel = this.platformManager.getLevel();

    // Check if player fell off screen
    if (this.player.hasFallenTooFar()) {
      this.endGame();
    }

    // Update score
    this.currentScore = this.player.score;
  }

  endGame() {
    this.gameState = "gameOver";

    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      localStorage.setItem("doodleJumpHighScore", this.highScore);
    }
  }

  resetToStart() {
    this.gameState = "start";
  }

  getCameraY() {
    // Simple: keep player in upper third
    return Math.max(this.player.y - this.gameHeight / 3);
  }

  displayGame() {
    background(15, 52, 96);

    // Calculate camera offset
    const cameraY = this.getCameraY();

    // Apply camera transform
    push();
    translate(0, -cameraY);

    if (this.gameState === "playing") {
      this.platformManager.display();
      this.player.display();
    }

    pop();

    // Display UI 
    this.displayUI();

    // Display appropriate screen
    if (this.gameState === "start") {
      this.displayStartScreen();
    } else if (this.gameState === "gameOver") {
      this.displayGameOverScreen();
    }
  }

  displayUI() {
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("Score: " + this.currentScore, 20, 30);
    text("Level: " + this.currentLevel, 20, 60);
    text("High Score: " + this.highScore, 20, 90);
  }

  displayStartScreen() {
    // Semi-transparent overlay
    fill(0, 0, 0, 150);
    rect(0, 0, this.gameWidth, this.gameHeight);

    // Title and instructions
    fill(255);
    textAlign(CENTER, CENTER);

    textSize(48);
    text("DOODLE JUMP", this.gameWidth / 2, this.gameHeight / 2 - 80);

    textSize(20);
    text(
      "Use ARROW KEYS or A/D to move",
      this.gameWidth / 2,
      this.gameHeight / 2 - 20
    );
    text(
      "Jump to higher platforms",
      this.gameWidth / 2,
      this.gameHeight / 2 + 20
    );
    text(
      "Avoid falling off the bottom!",
      this.gameWidth / 2,
      this.gameHeight / 2 + 60
    );
    text(
      "Difficulty increases with each LEVEL!",
      this.gameWidth / 2,
      this.gameHeight / 2 + 100
    );

    textSize(24);
    fill(100, 200, 255);
    text("Press SPACE to Start", this.gameWidth / 2, this.gameHeight / 2 + 140);

    textAlign(LEFT);
  }

  displayGameOverScreen() {
    // Semi-transparent overlay
    fill(0, 0, 0, 200);
    rect(0, 0, this.gameWidth, this.gameHeight);

    // Game over message
    fill(255, 100, 100);
    textAlign(CENTER, CENTER);

    textSize(48);
    text("GAME OVER", this.gameWidth / 2, this.gameHeight / 2 - 80);

    fill(255);
    textSize(32);
    text(
      "Score: " + this.currentScore,
      this.gameWidth / 2,
      this.gameHeight / 2 + 20
    );
    text(
      "Level Reached: " + this.currentLevel,
      this.gameWidth / 2,
      this.gameHeight / 2 - 30
    );

    textSize(20);
    if (this.currentScore === this.highScore && this.currentScore > 0) {
      fill(255, 200, 100);
      text("NEW HIGH SCORE!", this.gameWidth / 2, this.gameHeight / 2 +  60 );
    }

    fill(100, 200, 255);
    textSize(24);
    text(
      "Press SPACE to Play Again",
      this.gameWidth / 2,
      this.gameHeight / 2 + 100
    );

    textAlign(LEFT);
  }

  handleInput() {
    if (keyCode === 32) {
      // SPACE key
      if (this.gameState === "start") {
        this.startGame();
      } else if (this.gameState === "gameOver") {
        this.resetToStart();
        this.startGame();
      }
    }
  }
}
