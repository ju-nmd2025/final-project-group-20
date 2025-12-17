class Player {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;

    this.width = 50;
    this.height = 70;

    // Physics
    this.velocityY = 0;
    this.velocityX = 0;
    this.jumpForce = 12;
    this.gravity = 0.4;
    this.moveSpeed = 5;
    this.maxVelocityY = 15;

    // Input
    this.movingLeft = false;
    this.movingRight = false;

    // State
    this.isJumping = true;
    this.score = 0;
    this.maxHeight = 0;
    this.fallThreshold = 1200;
  }

  handleInput() {
    this.movingLeft = keyIsDown(LEFT_ARROW) || keyIsDown(65); // A
    this.movingRight = keyIsDown(RIGHT_ARROW) || keyIsDown(68); // D
  }

  applyGravity() {
    this.velocityY += this.gravity;
    if (this.velocityY > this.maxVelocityY) this.velocityY = this.maxVelocityY;
  }

  jump() {
    this.velocityY = -this.jumpForce;
    this.isJumping = true;
  }

  update() {
    this.handleInput();

    if (this.movingLeft) this.velocityX = -this.moveSpeed;
    else if (this.movingRight) this.velocityX = this.moveSpeed;
    else this.velocityX = 0;

    this.applyGravity();

    this.x += this.velocityX;
    this.y += this.velocityY;

    // Wrap
    if (this.x < -this.width / 2) this.x = width + this.width / 2;
    if (this.x > width + this.width / 2) this.x = -this.width / 2;

    // Score
    if (this.y < this.maxHeight) {
      this.maxHeight = this.y;
      this.score = Math.floor((2500 - this.maxHeight) / 10);
      if (this.score < 0) this.score = 0;
    }
  }

  hasFallenTooFar() {
    return this.y > this.maxHeight + this.fallThreshold;
  }

  display() {
    drawPlayer(this);
  }

  isFallenOff(gameHeight) {
    return this.y > gameHeight;
  }

  getBounds() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height,
    };
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.velocityY = 0;
    this.velocityX = 0;
    this.score = 0;
    this.maxHeight = 0;
    this.isJumping = true;
  }
}
