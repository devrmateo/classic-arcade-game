'use strict'; //use strict mode

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    const canvasHeight = 606;
    const numRows = 6;
    const rowPadding = 28.5;
    const rowHeight = canvasHeight / numRows - rowPadding;
    const yCoordRow1 = rowHeight - 10; // Some extra padding to bring the enemy bug up just a bit so that it fits nicely in the first row.
    const yCoordRow2 = rowHeight * 2;
    const yCoordRow3 = rowHeight * 3;
    this.yCoords = [yCoordRow1, yCoordRow2, yCoordRow3];
    this.x = 0;
    this.xStart = 0;
    this.y = this.yCoords[Math.floor(Math.random() * this.yCoords.length)];
    this.yStart = this.y;
    this.speed = Math.random() * (500 - 200) + 200;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    const widthOfCanvas = 505;
    //When enemy bugs reach the edge of the canvas, send them back to the left edge to cross again, in random rows.
    if (this.x >= widthOfCanvas) {
        this.x = 0;
        this.x += this.speed * dt;
        this.y = this.yCoords[Math.floor(Math.random() * this.yCoords.length)];
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    const canvasHeight = 606;
    const widthOfCanvas = 505;
    const middle = widthOfCanvas / 2 - 50.5; //Each image is 101px wide; half this to position the leftmost edge at the proper x-coordinate in order to center player character.
    this.height = 171;  //Images all have a height of 171px.
    this.x = middle;
    this.xStart = middle;
    this.y = canvasHeight - this.height;
    this.yStart = canvasHeight - this.height;
    this.step = 80; //This is the height of the actual boy character within the sprite image.
    this.shuffle = 101; //This is the width of each of the five columns, and therefore is equal to the distance that the player should "shuffle" to either the right or left.
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    const playerYRow1 = 35; //player's y coordinate when in the top enemy row (row 1).
    const addToRow1 = 27.5; //amount to add to player's y coord so that it equals enemy bug's y coord in row 1.
    const playerYRow2 = 115; //player's y coord when in the second enemy row (row 2).
    const addToRow2 = 30; //amount to add to player's y coord so that it equals enemy bug's y coord in row 2.
    const playerYRow3 = 195; //player's y coordinate when in enemy row 3.
    const addToRow3 = 22.5; //amount to add to player's y coord so that it equals enemy bug's y coord in row 3.
    let updatedY;

    if (this.y === playerYRow1) {
        updatedY = this.y + addToRow1;
    } else if (this.y === playerYRow2) {
        updatedY = this.y + addToRow2;
    } else if (this.y === playerYRow3) {
        updatedY = this.y + addToRow3;
    }

    for(let enemy of allEnemies) {
      if (this.x - 30 < enemy.x && enemy.x < this.x + 30 && enemy.y === updatedY) // Add a buffer of 60px in either direction so that the boy character sprite registers a collision when it comes into contact with the enemy bug sprite.
        this.reset();
    }

    const waterYCoord = 35; // y coordinate at which player sprite reaches water.
    //If y coordinate is less than 35, she has reached the water.  Show dialog to congratulate and prompt to play again.  Reset the player sprite to starting position.
    if (this.y < waterYCoord) {
        openDialog();
        this.reset();
        }

    console.log(this.x, this.y);

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input) {

    switch(input) {
        case 'left':
            if (this.x > 0) {
                this.x -= this.shuffle;
            }
            break;
        case 'right':
            if (this.x < 404) {
               this.x += this.shuffle;
            }
            break;
        case 'up':
            this.y -= this.step;
            break;
        case 'down':
            if (this.y < 435) {
                this.y += this.step;
            }
    }
}

Player.prototype.reset = function() {
    //Return the player image sprite to the starting position.
    this.x = this.xStart;
    this.y = this.yStart;
}

function openDialog() {
    const dialog = document.querySelector('dialog');
    const closeButton = document.querySelector('.close');
    const playAgainButton = document.querySelector('.play');
    dialogPolyfill.registerDialog(dialog);
    // Now dialog acts like a native <dialog>.

    dialog.showModal();

    closeButton.addEventListener('click', function () {
        dialog.close();
    });

    playAgainButton.addEventListener('click', function() {
        dialog.close();
    });


}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy = new Enemy;
const secondEnemy = new Enemy;
const thirdEnemy  = new Enemy;
const allEnemies = [];
allEnemies.push(enemy, secondEnemy, thirdEnemy);

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
