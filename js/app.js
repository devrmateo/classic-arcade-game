// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    const canvasHeight = 606;
    const canvasWidth = 505;
    const numRows = 6;
    const rowPadding = 30;
    const rowHeight = canvasHeight / numRows - rowPadding;
    const xCoordRow1 = rowHeight;
    const xCoordRow2 = rowHeight * 2;
    const xCoordRow3 = rowHeight * 3;
    const xCoords = [xCoordRow1, xCoordRow2, xCoordRow3];
    this.x = 0;
    this.y = xCoords[Math.floor(Math.random() * xCoords.length)];
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {

}

// Player.prototype.render = function() {

// }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy = new Enemy;
const allEnemies = [];
allEnemies.push(enemy);

const player = new Player;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
