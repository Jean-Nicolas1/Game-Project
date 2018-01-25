// Object class
function Component(source, x, y, width, height) {
  this.img = new Image();
  this.img.src = source;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.left = function() {
    return this.x;
  };
  this.right = function() {
    return this.x + this.width;
  };
  this.top = function() {
    return this.y;
  };
  this.bottom = function() {
    return this.y + this.height;
  };
  this.update = function(context) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}

// Player class inherited from Object class
function Player(speed, source, x, y, width, height) {
  Component.call(this, source, x, y, width, height);
  this.speedX = speed;
  this.move = function(direction, canvasWidth) {
    /*See Game.js -- User interaction with player --  */
    if (direction === "left") {
      this.x -= this.speedX;
    } else if (direction === "right") {
      this.x += this.speedX;
    }
    this.x = Math.min(canvasWidth - this.width, Math.max(0, this.x));
  };
  this.checkCatchStock = function(stock) {
    return !(
      this.bottom() < stock.top() ||
      this.top() > stock.bottom() ||
      this.right() < stock.left() ||
      this.left() > stock.right()
    );
  };
  this.shoot = function(spaceBar) {
    // if (spaceBar === "spaceBar") {
    //   return true;
    // } else {
    //   return false;
    // }
  };
}
Player.prototype = Object.create(Component.prototype);

// Stock class inherited from Object class
function Stock(stockSpeed, source, x, y, width, height, status, value) {
  Component.call(this, source, x, y, width, height);
  this.speedY = stockSpeed;
  this.status = status;
  this.value = value;
  this.move = function() {
    this.y += this.speedY;
  };
  this.checkOutOfGame = function(canvasHeight) {
    return !(this.top() < canvasHeight);
  };
}
Stock.prototype = Object.create(Component.prototype);

// Shoot class inherited from Object class
function Bullet(bulletSpeed, source, x, y, width, height) {
  Component.call(this, source, x, y, width, height);
  this.speedY = bulletSpeed;
  this.move = function() {
    this.y += this.speedY;
  };
  this.checkKillStock = function(stock) {
    return (
      stock /* to solve the i = length problem */ &&
      !(
        this.bottom() < stock.top() ||
        this.top() > stock.bottom() ||
        this.right() < stock.left() ||
        this.left() > stock.right()
      )
    );
  };
  this.checkOutOfGame = function() {
    return !(this.bottom() > 80);
  };
}
Bullet.prototype = Object.create(Component.prototype);

function Message(x, y, speed, text) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.text = text;
  this.update = function(context) {
    context.font = "20px serif";
    context.fillStyle = "white";
    context.fillText(this.text, this.x, this.y);
  };
  this.move = function() {
    this.x -= this.speed;
  };
}
