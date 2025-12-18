class Platform {
  constructor(x, y, width = 60, height = 12, type = "normal") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.color = this.getColor();
    this.isActive = true;
  }

  update() {
    // normal platform does nothing
  }

  display() {
    fill(...this.color);
    stroke(255);
    strokeWeight(2);
    rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height,
      3
    );
    noStroke();
  }

  getColor() {
    switch (this.type) {
      case "normal":
        return [100, 200, 255]; // Blue
      case "moving":
        return [255, 200, 100]; // Orange
      case "breaking":
        return [255, 150, 150]; // Pink
      default:
        return [100, 200, 255];
    }
  }

  checkCollision(player) {
    if (!this.isActive) return false;

    const playerBounds = player.getBounds();
    const platformBounds = this.getBounds();

    // Check if player is above platform and falling
    const landingFromAbove =
      player.velocityY > 0 &&
      playerBounds.y + playerBounds.height <= platformBounds.y + 5 &&
      playerBounds.y + playerBounds.height >= platformBounds.y - 10;

    // Check horizontal overlap
    const horizontalOverlap =
      playerBounds.x + playerBounds.width > platformBounds.x &&
      playerBounds.x < platformBounds.x + platformBounds.width;

    return landingFromAbove && horizontalOverlap;
  }

  getBounds() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height,
    };
  }
}
class MovingPlatform extends Platform {
  constructor(x, y, width = 60, height = 12) {
    super(x, y, width, height, "moving");
    this.startX = x;
    this.amplitude = 50; // How far it moves
    this.speed = 0.05; // Speed of oscillation
    this.time = 0;
  }

  update() {
    this.time += this.speed;
    this.x = this.startX + Math.sin(this.time) * this.amplitude;
  }
}
class BreakingPlatform extends Platform {
  constructor(x, y, width = 60, height = 12) {
    super(x, y, width, height, "breaking");
    this.breakDelay = 0;
    this.isBroken = false;
    this.breakDuration = 30; // Frames before disappearing
  }

  //update broken platform
  update() {
    if (this.isBroken) {
      this.breakDelay++;
      if (this.breakDelay > this.breakDuration) {
        this.isActive = false;
      }
    }
  }

  display() {
    if (this.isBroken) {
      // Flash effect when breaking
      if (this.breakDelay % 10 < 5) {
        fill(200, 100, 100);
      } else {
        fill(255, 150, 150);
      }
    } else {
      fill(...this.color);
    }

    stroke(255);
    strokeWeight(2);
    rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height,
      3
    );
    noStroke();
  }

  checkCollision(player) {
    const result = super.checkCollision(player);
    if (result && !this.isBroken) {
      this.isBroken = true;
      this.breakDelay = 0;
    }
    return result;
  }
}
