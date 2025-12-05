/**
 * PlatformManager Class
 * Manages all platforms: generation, updating, collision detection, removal
 */
class PlatformManager {
  constructor(gameWidth, gameHeight) {
    this.platforms = [];
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    // Generation parameters
    this.platformWidth = 60;
    this.platformHeight = 12;
    this.verticalGap = 80; // Space between platforms initially
    this.horizontalVariance = gameWidth - 40;

    // Difficulty scaling (range 0-)
    this.difficulty = 10;
    this.platformSpacing = this.verticalGap;

    // Initialize with starting platforms
    this.generateInitialPlatforms();

    //Inital level setting
    this.level = 1;
    this.baseVerticalGap = 80;
  }

  /**
   * Generate initial platforms at game start
   */
  generateInitialPlatforms() {
    // Create platforms from bottom to top
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * this.horizontalVariance + 30;
      const y = this.gameHeight - i * this.platformSpacing - 100;
      this.addRandomPlatform(x, y);
    }
  }

  /**
   * Add a random platform type at given position
   */
  addRandomPlatform(x, y) {
    let platform;
    const rand = Math.random();
    const difficultyFactor = this.getDifficultyMultiplier(this.level);
    const normalThreshold = Math.max(0.3, 0.7 - difficultyFactor);
    const movingThreshold = normalThreshold + 0.15 + difficultyFactor * 0.3;

    if (rand < normalThreshold) {
      platform = new Platform(
        x,
        y,
        this.platformWidth,
        this.platformHeight,
        "normal"
      );
    } else if (rand < movingThreshold) {
      platform = new MovingPlatform(
        x,
        y,
        this.platformWidth,
        this.platformHeight
      );
    } else {
      platform = new BreakingPlatform(
        x,
        y,
        this.platformWidth,
        this.platformHeight
      );
    }

    this.platforms.push(platform);
  }

  /**
   * Calculate level based on player height
   * Every 1500 pixels = 1 level
   */
  updateLevel(playerY) {
    const levelThreshold = 1500;
    this.level = Math.floor(Math.abs(playerY) / levelThreshold) + 1;
    const levelCap = Math.min(this.level, 15);
    return levelCap;
  }

  /**
   * Get difficulty multiplier based on level
   */
  getDifficultyMultiplier(level) {
    return Math.min((level - 1) / 10, 0.7);
  }

  /**
   * Get platform spacing based on level
   */
  getPlatformSpacing(level) {
    const minGap = 40;
    const maxGap = 80;
    const reduction = (level - 1) * 2.5;
    return Math.max(minGap, maxGap - reduction);
  }

  /**
   * Get current level (for display)
   */
  getLevel() {
    return this.level;
  }

  /**
   * Generate new platforms as player moves up
   */
  generatePlatforms(playerY) {
    // Check if we need more platforms above player
    if (this.platforms.length === 0) {
      this.generateInitialPlatforms();
      return;
    }

    // Find topmost platform
    let topPlatform = this.platforms[0];
    for (let platform of this.platforms) {
      if (platform.y < topPlatform.y) {
        topPlatform = platform;
      }
    }

    // Generate new platforms if needed
    while (topPlatform.y > playerY - 500) {
      const x = Math.random() * this.horizontalVariance + 30;
      const y = topPlatform.y - this.platformSpacing;
      this.addRandomPlatform(x, y);

      // Find new topmost platform
      topPlatform = this.platforms[this.platforms.length - 1];
    }
  }

  /**
   * Remove inactive or off-screen platforms to save memory
   */
  cleanup(playerY) {
    // Remove platforms far below player
    for (let i = this.platforms.length - 1; i >= 0; i--) {
      if (!this.platforms[i].isActive || this.platforms[i].y > playerY + 800) {
        this.platforms.splice(i, 1);
      }
    }
  }

  /**
   * Update all platforms
   */
  update(playerY) {
    for (let platform of this.platforms) {
      platform.update();
    }

    // ADD THESE LINES:
    this.updateLevel(playerY);
    this.platformSpacing = this.getPlatformSpacing(this.level);
    this.generatePlatforms(playerY);
    this.cleanup(playerY);
    this.difficulty = Math.abs(playerY);
  }

  /**
   * Check collision with all platforms
   * Returns the platform collided with, or null
   */
  checkCollisions(player) {
    for (let platform of this.platforms) {
      if (platform.checkCollision(player)) {
        return platform;
      }
    }
    return null;
  }

  /**
   * Display all platforms
   */
  display() {
    for (let platform of this.platforms) {
      platform.display();
    }
  }

  /**
   * Reset platform manager for new game
   */
  reset() {
    this.platforms = [];
    this.difficulty = 0;
    this.platformSpacing = this.verticalGap;
    this.generateInitialPlatforms();
  }

  /**
   * Get number of active platforms
   */
  getActivePlatformCount() {
    return this.platforms.filter((p) => p.isActive).length;
  }
}
