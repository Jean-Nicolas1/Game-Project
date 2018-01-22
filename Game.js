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
    player = new Player(5, "./images/player.png", 168, 660, 60, 30);
    myGameArea.myStocks = [];
  }

  var myGameArea = {
    canvas: document.createElement("canvas"),
    myStocks: [],
    frames: 0,
    drawCanvas: function() {
      this.canvas.width = 396;
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
    x = Math.floor(Math.random() * (myGameArea.canvas.width - 30));
    y = 0;
    myGameArea.myStocks.push(
      new Stock(3, "./images/EnergyStock.jpg", x, y, width, height)
    );
  }

  function shootBullet() {
    x = player.x;
    y = player.y;
  }

  function updateGameArea() {
    // Removing catched stocks from array
    for (i = 0; i < myGameArea.myStocks.length; i++) {
      if (player.checkCatchStock(myGameArea.myStocks[i])) {
        myGameArea.myStocks.splice(i, 1);
      }
    }
    // Removing catched stocks from array
    // for (i = 0; i < myGameArea.myStocks.length; i++) {
    //     if (bullet.checkCatchStock(myGameArea.myStocks[i])) {
    //       myGameArea.myStocks.splice(i, 1);
    //     }
    //   }
    // Positioning stocks
    if (myGameArea.frames % 60 === 0) {
      createStocks(30, 30);
    }
    // Clearing Canvas
    myGameArea.clear();
    // Drawing background
    background.draw(myGameArea.context);
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
    // reqAnimation
    myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
  }

  //   User Interaction with player
  var keysPressed = {
    left: false,
    right: false,
    spaceBar: false
  };
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;
  var SPACE_BAR = 32;
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case LEFT_KEY:
        keysPressed.left = true;
        break;
      case RIGHT_KEY:
        keysPressed.right = true;
        break;
      case SPACE_BAR:
        keysPressed.spaceBar = true;
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
      case SPACE_BAR:
        keysPressed.spaceBar = false;
        break;
    }
  };
};
