/**
 * Main sketch.js
 * p5.js main entry point - Sets up canvas and game loop
 */

// Global game instance
let game;

/**
 * p5.js setup function
 */
function setup() {
    // Create canvas
    const canvas = createCanvas(400, 600);
    canvas.parent('p5-container');
    
    // Initialize game
    game = new Game(width, height);
}

/**
 * p5.js draw function (runs every frame)
 */
function draw() {
    // Update game logic
    game.updateGame();
    
    // Display game
    game.displayGame();
}

/**
 * Handle keyboard press events
 */
function keyPressed() {
    game.handleInput();
    return false; // Prevent default browser behavior
}

/**
 * Game Development Notes for Team:
 * 
 * KEY FILES:
 * - Player.js: Handles player movement, physics, input
 * - Platform.js: Platform base class and platform types (Moving, Breaking)
 * - PlatformManager.js: Creates, updates, and manages all platforms
 * - Game.js: Main game controller and state management
 * - sketch.js: p5.js entry point and game loop
 * 
 * FEATURES IMPLEMENTED:
 * ✓ Keyboard controls (Arrow Keys / A-D)
 * ✓ Automatic jumping with gravity
 * ✓ Platform collision detection
 * ✓ Three platform types (Normal, Moving, Breaking)
 * ✓ Score system based on height
 * ✓ Camera system that follows player
 * ✓ Start and Game Over screens
 * ✓ High score tracking with localStorage
 * ✓ OOP with multiple classes
 * ✓ Arrays (platforms array) and loops (platform updates)
 * ✓ p5.js canvas rendering
 * 
 * NEXT STEPS FOR YOUR TEAM:
 * 1. Test the game thoroughly
 * 2. Adjust difficulty and physics values
 * 3. Add sound effects and visual polish
 * 4. Consider adding power-ups or enemies
 * 5. Optimize performance for smooth gameplay
 * 6. Add comments to all code you modify
 * 7. Make meaningful commits on GitHub
 * 
 * PHYSICS PARAMETERS TO TWEAK (in Player.js):
 * - jumpForce: 12 (higher = jump higher)
 * - gravity: 0.4 (higher = fall faster)
 * - moveSpeed: 5 (horizontal movement speed)
 * 
 * PLATFORM PARAMETERS TO TWEAK (in PlatformManager.js):
 * - verticalGap: 80 (distance between platforms)
 * - platformWidth/Height: Platform size
 * - Difficulty scaling affects platform type distribution
 */