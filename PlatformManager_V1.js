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
        
        // Difficulty scaling
        this.difficulty = 0;
        this.platformSpacing = this.verticalGap;
        
        // Initialize with starting platforms
        this.generateInitialPlatforms();
    }
    
    /**
     * Generate initial platforms at game start
     */
    generateInitialPlatforms() {
        // Create platforms from bottom to top
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * this.horizontalVariance + 30;
            const y = this.gameHeight - (i * this.platformSpacing) - 100;
            this.addRandomPlatform(x, y);
        }
    }
    
    /**
     * Add a random platform type at given position
     */
    addRandomPlatform(x, y) {
        const rand = Math.random();
        let platform;
        
        // Difficulty affects platform type distribution
        // Higher difficulty = more moving/breaking platforms
        const difficultyFactor = Math.min(this.difficulty / 10000, 0.7);
        
        if (rand < 0.6) {
            // 60% normal platforms
            platform = new Platform(x, y, this.platformWidth, this.platformHeight, 'normal');
        } else if (rand < 0.8) {
            // 20% moving platforms
            platform = new MovingPlatform(x, y, this.platformWidth, this.platformHeight);
        } else {
            // 20% breaking platforms
            platform = new BreakingPlatform(x, y, this.platformWidth, this.platformHeight);
        }
        
        this.platforms.push(platform);
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
        // Update each platform (for moving/breaking effects)
        for (let platform of this.platforms) {
            platform.update();
        }
        
        // Generate new platforms as needed
        this.generatePlatforms(playerY);
        
        // Clean up old platforms
        this.cleanup(playerY);
        
        // Update difficulty based on height
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
        return this.platforms.filter(p => p.isActive).length;
    }
}