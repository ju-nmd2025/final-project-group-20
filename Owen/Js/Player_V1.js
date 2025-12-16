/**
 * Player Class
 * Handles the player character, movement, jumping, and physics
 */
class Player {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
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

  /**
   * Handle keyboard input
   */
  handleInput() {
    this.movingLeft = keyIsDown(LEFT_ARROW) || keyIsDown(65); // A key
    this.movingRight = keyIsDown(RIGHT_ARROW) || keyIsDown(68); // D key
  }

  /**
   * Apply gravity and update vertical velocity
   */
  applyGravity() {
    this.velocityY += this.gravity;

    // Cap maximum falling velocity
    if (this.velocityY > this.maxVelocityY) {
      this.velocityY = this.maxVelocityY;
    }
  }

  /**
   * Make player jump (bounce upward)
   */
  jump() {
    this.velocityY = -this.jumpForce;
    this.isJumping = true;
  }

  /**
   * Update player position and physics
   */
  update() {
    this.handleInput();

    // Horizontal movement
    if (this.movingLeft) {
      this.velocityX = -this.moveSpeed;
    } else if (this.movingRight) {
      this.velocityX = this.moveSpeed;
    } else {
      this.velocityX = 0;
    }

    // Apply gravity
    this.applyGravity();

    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Wrap around screen horizontally
    if (this.x < -this.width / 2) {
      this.x = width + this.width / 2;
    }
    if (this.x > width + this.width / 2) {
      this.x = -this.width / 2;
    }

    // Update max height for scoring
    if (this.y < this.maxHeight) {
      this.maxHeight = this.y;
      this.score = Math.floor((2500 - this.maxHeight) / 10); // Score based on height
      if (this.score < 0) this.score = 0;
    }
  }

  hasFallenTooFar() {
    return this.y > this.maxHeight + this.fallThreshold;
  }

  display() {
    push();
    translate(this.x, this.y);

    // Flip if moving left
    if (this.velocityX < 0) {
      scale(-1, 1);
    }

    noStroke();

    // --- 1. SHIRT & BODY ---
    // Main torso with gradient effect
    for (let i = 0; i < 5; i++) {
      fill(250 - i * 8); // Gradient from white to light grey
      arc(0, 25 + i * 2, 42 - i, 35, PI, 0);
    }

    // Shirt base
    fill(250);
    rect(-21, 25, 42, 18);

    // Collar (V-neck)
    fill(230);
    triangle(-12, 15, 12, 15, 0, 30);

    // Collar outlines
    stroke(180);
    strokeWeight(1.5);
    line(-12, 15, 0, 30);
    line(12, 15, 0, 30);

    // Buttons
    noStroke();
    fill(200);
    ellipse(0, 33, 3, 3);
    ellipse(0, 38, 3, 3);

    // Fabric shadow/folds
    fill(240);
    ellipse(-8, 28, 8, 3);
    ellipse(8, 28, 8, 3);

    // --- 2. NECK ---
    fill(255, 218, 185);
    rect(-8, 8, 16, 14);

    // Neck shadow (under chin)
    fill(234, 192, 134, 80);
    ellipse(0, 20, 14, 4);

    // --- 3. HEAD & FACE ---
    // Shadow gradient under face
    fill(234, 192, 134, 50);
    ellipse(0, 22, 24, 8);

    // Main face shape
    fill(255, 218, 185);
    beginShape();
    vertex(-20, -12);
    vertex(20, -12);
    vertex(21, 8);
    vertex(13, 24);
    vertex(0, 27);
    vertex(-13, 24);
    vertex(-21, 8);
    endShape(CLOSE);

    // Ears with inner detail
    fill(255, 218, 185);
    ellipse(-22, 5, 10, 13);
    ellipse(22, 5, 10, 13);
    fill(234, 192, 134);
    ellipse(-22, 5, 5, 6);
    ellipse(22, 5, 5, 6);

    // --- 4. FACIAL FEATURES ---
    // Nose
    fill(234, 192, 134);
    ellipse(0, 12, 7, 4);
    ellipse(-2, 14, 2, 2); // Nostril
    ellipse(2, 14, 2, 2);

    // Mouth (changes based on jump)
    stroke(214, 172, 114);
    strokeWeight(2);
    noFill();
    if (this.velocityY < -5) {
      // Open mouth when jumping up
      arc(0, 20, 10, 6, 0, PI);
    } else {
      // Neutral/Closed
      line(-5, 20, 5, 20);
    }
    noStroke();

    // --- 5. GLASSES ---
    // Lens glare/reflection (white shine)
    fill(255, 255, 255, 120);
    ellipse(-13, 3, 8, 6);
    ellipse(13, 3, 8, 6);

    // Frames (Dark)
    noFill();
    stroke(40);
    strokeWeight(2.5);

    // Left Lens
    beginShape();
    vertex(-18, 0);
    vertex(-8, 0);
    vertex(-6, 6);
    vertex(-9, 12);
    vertex(-17, 12);
    vertex(-20, 6);
    endShape(CLOSE);

    // Right Lens
    beginShape();
    vertex(8, 0);
    vertex(18, 0);
    vertex(20, 6);
    vertex(17, 12);
    vertex(9, 12);
    vertex(6, 6);
    endShape(CLOSE);

    // Bridge
    line(-6, 5, 6, 5);

    // Arms (temples)
    line(-20, 4, -24, 6);
    line(20, 4, 24, 6);

    // Eyes (Blinking animation)
    noStroke();
    fill(20);
    let blinkTimer = frameCount % 180; // Blink every 3 seconds
    if (blinkTimer < 5) {
      // Closed eyes (blink)
      fill(20);
      rect(-14, 5, 4, 1);
      rect(10, 5, 4, 1);
    } else {
      // Open eyes
      ellipse(-12, 5, 4, 4);
      ellipse(12, 5, 4, 4);
      // Pupils (white highlight)
      fill(255);
      ellipse(-11, 4, 1, 1);
      ellipse(13, 4, 1, 1);
    }

    // --- 6. HAIR (Layered & Detailed) ---
    // Back layer (Dark shadow)
    fill(15);
    arc(0, -6, 56, 54, PI, 0);

    // Middle layer (Main hair)
    fill(25);
    arc(0, -5, 52, 50, PI, 0);

    // Front Bangs (Custom shape with peaks)
    fill(30);
    beginShape();
    vertex(-27, -5);
    vertex(-23, 14); // Sideburn L
    vertex(-20, -3);
    vertex(-14, 12); // Bang L1
    vertex(-8, 2);
    vertex(-2, 14); // Bang L2
    vertex(2, 0);
    vertex(8, 14); // Bang R1
    vertex(14, 2);
    vertex(20, 12); // Bang R2
    vertex(23, -3);
    vertex(27, 14); // Sideburn R
    // Top of hair (arc back)
    vertex(24, -26);
    vertex(12, -32);
    vertex(0, -34);
    vertex(-12, -32);
    vertex(-24, -26);
    endShape(CLOSE);

    // Individual hair strands (Messy texture)
    stroke(20);
    strokeWeight(2);
    noFill();
    // Left side strands
    bezier(-22, -28, -25, -20, -20, -12, -18, -5);
    bezier(-15, -30, -18, -22, -14, -14, -10, -5);
    // Right side strands
    bezier(22, -28, 25, -20, 20, -12, 18, -5);
    bezier(15, -30, 18, -22, 14, -14, 10, -5);
    // Top strands
    bezier(-5, -34, -3, -30, 3, -30, 5, -34);

    // Flyaway hairs (Wispy)
    strokeWeight(1);
    line(-26, -20, -28, -24);
    line(26, -20, 28, -24);
    line(0, -34, -2, -38);
    line(2, -34, 4, -38);

    pop();
  }
  /**
   * Check if player has fallen off screen
   */
  isFallenOff(gameHeight) {
    return this.y > gameHeight;
  }

  /**
   * Get player bounds for collision detection
   */
  getBounds() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height,
    };
  }

  /**
   * Reset player for new game
   */
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
