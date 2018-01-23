var background;
var player;
var sectors = [
  { image: "./images/car.png", status: "long", value: 1 },
  { image: "./images/airplane.png", status: "short", value: 2 },
  { image: "./images/barrel.png", status: "long", value: 3 }
];
var score = 0;
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
    myGameArea.myBarrel = ["bullet", "bullet", "bullet", "bullet"];
  }

  var myGameArea = {
    canvas: document.createElement("canvas"),
    myStocks: [],
    myBullets: [],
    myBarrel: [],
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
    },
    displayScore: function() {
      this.context.font = "38px serif";
      this.context.fillStyle = "black";
      this.context.fillText("Score: " + score, 20, 50);
    },
    stop: function() {
      //...
    },
    gameOver: function() {
      //...
    },
    drawFinalPoints: function() {
      //...
    },
    restartGame: function() {
      //...
    }
  };

  function createStocks(width, height) {
    var x =
      player.width / 4 +
      Math.min(
        myGameArea.canvas.width - player.width,
        Math.floor(Math.random() * myGameArea.canvas.width)
      );
    var y = 0;
    var randomSector = Math.floor(Math.random() * sectors.length);
    // var sectorImage = sectors[Math.floor(Math.random() * sectors.length)][0];
    // var sectorStatus = 0;
    // var sectorValue = 0;
    myGameArea.myStocks.push(
      new Stock(
        3,
        sectors[randomSector].image,
        x,
        y,
        width,
        height,
        sectors[randomSector].status,
        sectors[randomSector].value
      )
    );
  }

  function shootBullet(width, height) {
    var x = player.x + player.width / 2 - width / 2;
    var y = player.y;
    myGameArea.myBullets.push(
      new Bullet(-3, "./images/bullet.jpg", x, y, width, height)
    );
  }

  function updateGameArea() {
    // Removing catched stocks from array
    for (i = 0; i < myGameArea.myStocks.length; i++) {
      if (player.checkCatchStock(myGameArea.myStocks[i])) {
        if (myGameArea.myStocks[i].status === "short") {
          score -= myGameArea.myStocks[i].value;
        } else {
          score += myGameArea.myStocks[i].value;
        }
        myGameArea.myStocks.splice(i, 1);
      }
    }
    // Removing killed stocks and bullet from arrays and reloading the barrel
    for (i = 0; i < myGameArea.myStocks.length; i++) {
      for (j = 0; j < myGameArea.myBullets.length; j++) {
        if (myGameArea.myBullets[j].checkKillStock(myGameArea.myStocks[i])) {
          if (myGameArea.myStocks[i].status === "short") {
            score += myGameArea.myStocks[i].value;
          } else {
            score -= myGameArea.myStocks[i].value;
          }
          myGameArea.myStocks.splice(i, 1);
          myGameArea.myBullets.splice(j, 1);
          myGameArea.myBarrel.push("bullet");
        }
      }
    }
    // Removing out of game stocks
    for (i = 0; i < myGameArea.myStocks.length; i++) {
      if (myGameArea.myStocks[i].checkOutOfGame(myGameArea.canvas.height)) {
        myGameArea.myStocks.splice(i, 1);
      }
    }
    // Removing out of game bullets and reloading the barrel
    for (i = 0; i < myGameArea.myBullets.length; i++) {
      if (myGameArea.myBullets[i].checkOutOfGame()) {
        myGameArea.myBullets.splice(i, 1);
        myGameArea.myBarrel.push("bullet");
      }
    }
    // Positioning stocks
    if (myGameArea.frames % 60 === 0) {
      // var stockStatus = ["short", "long"];
      // var stockValues = [1, 2, 3];
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
    // Displaying score
    myGameArea.displayScore();
    // Creating bullets
    // -- see line 128 --
    document.onkeypress = function() {
      if (event.keyCode === 32 && myGameArea.myBarrel.length > 0) {
        shootBullet(10, 20);
        myGameArea.myBarrel.splice(0, 1);
      }
    };
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
    // if (event.keyCode === 32) {
    //   shootBullet(10, 20);
    // }
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
