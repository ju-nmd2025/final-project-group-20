/**
 * Player Class
 * Handles the player character, movement, jumping, and physics
 */
class Player {
    constructor(x, y) {
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
    
    /**
     * Display player character
     */
    display() {
        image(characterImage, 
              this.x - this.width / 2, 
              this.y - this.height / 2, 
              this.width, 
              this.height);
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
            height: this.height
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
