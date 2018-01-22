var background;
var player;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("title").style.display = "none";
    document.getElementById("game-board").style.display = "block";
    startGame();
  };

  function startGame() {
    myGameArea.start();
    background = new Background(
      "./images/bg.jpg",
      myGameArea.canvas.width,
      myGameArea.canvas.height,
      -0.5
    );
    player = new Player(8, "./images/player.png", 168, 660, 60, 30);
    myGameArea.myStocks = [];
    myGameArea.myBullets = [];
  }

  var myGameArea = {
    canvas: document.createElement("canvas"),
    myStocks: [],
    myBullets: [],
    frames: 0,
    drawCanvas: function() {
      this.canvas.width = 600; /*396 */
      this.canvas.height = 0.8 * screen.height;
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").append(this.canvas);
    },
    start: function() {
      this.drawCanvas();
      this.reqAnimation = window.requestAnimationFrame(updateGameArea);
    },
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

  function createStocks(width, height) {
    x =
      player.width / 4 +
      Math.min(
        myGameArea.canvas.width - player.width,
        Math.floor(Math.random() * myGameArea.canvas.width)
      );
    y = 0;
    myGameArea.myStocks.push(
      new Stock(3, "./images/EnergyStock.jpg", x, y, width, height)
    );
  }

  function shootBullet(width, height) {
    x = player.x + player.width / 2 - width / 2;
    y = player.y;
    myGameArea.myBullets.push(
      new Bullet(-3, "./images/bullet.jpg", x, y, width, height)
    );
  }

  function updateGameArea() {
    // Removing catched stocks from array
    for (i = 0; i < myGameArea.myStocks.length; i++) {
      if (player.checkCatchStock(myGameArea.myStocks[i])) {
        myGameArea.myStocks.splice(i, 1);
      }
    }
    // Removing killed stocks from array
    for (i = 0; i < myGameArea.myStocks.length; i++) {
      for (j = 0; j < myGameArea.myBullets.length; j++) {
        if (myGameArea.myBullets[j].checkKillStock(myGameArea.myStocks[i])) {
          myGameArea.myStocks.splice(i, 1);
          myGameArea.myBullets.splice(j, 1);
        }
      }
    }
    // Positioning stocks
    if (myGameArea.frames % 60 === 0) {
      createStocks(30, 30);
    }
    // Clearing Canvas
    myGameArea.clear();
    // Drawing background --> disabled
    // background.draw(myGameArea.context);
    // Drawing stocks
    myGameArea.myStocks.forEach(function(stock) {
      stock.y += stock.speedY;
      stock.update(myGameArea.context);
    });
    // Incrementing frames
    myGameArea.frames += 1;
    // Moving the player depending on key pressed
    Object.keys(keysPressed).forEach(function(direction) {
      if (keysPressed[direction]) {
        player.move(direction, myGameArea.canvas.width);
      }
    });
    // Drawing the player
    player.update(myGameArea.context);
    // Creating bullets
    // -- see line 128 --
    // Drawing bullet
    myGameArea.myBullets.forEach(function(bullet) {
      bullet.y += bullet.speedY;
      bullet.update(myGameArea.context);
    });
    // reqAnimation
    myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
  }

  //   User Interaction with player
  var keysPressed = {
    left: false,
    right: false
  };
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;
  document.onkeydown = function(event) {
    // Shooting bullets -- here because can only have one document.onkeydown function
    if (event.keyCode === 32) {
      shootBullet(10, 20);
    }
    switch (event.keyCode) {
      case LEFT_KEY:
        keysPressed.left = true;
        break;
      case RIGHT_KEY:
        keysPressed.right = true;
        break;
    }
  };
  document.onkeyup = function(event) {
    switch (event.keyCode) {
      case LEFT_KEY:
        keysPressed.left = false;
        break;
      case RIGHT_KEY:
        keysPressed.right = false;
        break;
    }
  };
};
