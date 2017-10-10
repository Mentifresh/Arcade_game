var canvasWidth = 505;
var colWidth = 101;
var rowHeight = 83;
var allEnemies = [];
var playerPoints = 0;

// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = newSpeed();
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

//assign random speed to enemy
var newSpeed = function() {
  var minSpeed = 50;
  var maxSpeed = 450;
  return Math.random() * (maxSpeed - minSpeed) + minSpeed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  // update bugs position and change speed after each reset
  if (this.x <= canvasWidth) {
    this.x = this.x + this.speed * dt;
  } else {
    this.x = -2;
    this.speed = newSpeed();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 202;
  this.y = 404;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.update = function(dt) {

  var self = this;

  // depending on the pressed key if will update players position
  switch (this.pressedKey) {
    case 'left':
      if (this.x > 0) {
        this.x = this.x - colWidth;
      }
      break;
    case 'right':
      if (this.x < 400) {
        this.x = this.x + colWidth;
      }
      break;
    case 'up':
      if (this.y > 0) {
        this.y = this.y - rowHeight;
      }
      break;
    case 'down':
      if (this.y < 400) {
        this.y = this.y + rowHeight;
      }
      break;
    default:
      break;
  }

  this.pressedKey = null;

  //reset if player reaches water and add points
  if (this.y < 0) {
    this.reset();
    playerPoints += 10;
  }

  // checks for colision with enemies, resets player position if needed and updates points accordingly
  allEnemies.forEach(function(enemy) {
    if (self.x >= enemy.x - 25 && self.x <= enemy.x + 25) {
      if (self.y >= enemy.y - 25 && self.y <= enemy.y + 25) {
        self.reset();
        if (playerPoints > 0) {
          playerPoints -= 5;
        } else {
          playerPoints = 0;
        }
      }
    }
  });
};

// draws player on screen and player playerPoints
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.font = "20pt Impact";
  ctx.lineWidth = 6;
  ctx.fillStyle = "black";
  ctx.fillText(" "  + playerPoints, 40, 576);
};

Player.prototype.handleInput = function(e) {
  this.pressedKey = e;
};

//Resets player to beginning position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};


(function displayEnemies() {
  allEnemies.push(new Enemy(0, 50));
  allEnemies.push(new Enemy(0, 140));
  allEnemies.push(new Enemy(0, 230));
}());

var player = new Player();


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
