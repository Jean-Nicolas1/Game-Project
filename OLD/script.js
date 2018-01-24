var player;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("title").style.display = "none";
    document.getElementById("game-board").style.display = "block";
    startGame();
  };
  function startGame() {
    myGameArea.start();
    background = new Background("./images/bg.jpg");
    player = new Component(
      60,
      30,
      "./images/player.png",
      // myGameArea.canvas.width / 2 - player.width / 2,
      // myGameArea.canvas.height - player.height
      168,
      660
    );
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

  function Background(source) {
    this.img = new Image();
    this.img.src = source;
    // this.img.style = "width:50%;";
    this.scale = 1.05;
    this.x = 0;
    this.y = myGameArea.canvas.height;
    this.dy = -0.5;
    this.imgW = this.img.width;
    this.imgH = this.img.height;

    this.clearX = 0;
    this.clearY = 0;
    that = this;
    this.img.onload = function() {
      that.imgW = myGameArea.canvas.width * that.scale;
      that.imgH = that.img.height * that.scale;
      if (that.imgH > myGameArea.canvas.height) {
        that.y = myGameArea.canvas.height + that.imgH;
      }
      if (that.imgH > myGameArea.canvas.height) {
        that.clearY = that.imgH;
      } else {
        that.clearY = myGameArea.canvas.height;
      }
      if (that.imgW > myGameArea.canvas.width) {
        that.clearX = that.imgW;
      } else {
        that.clearX = myGameArea.canvas.width;
      }
    };
    this.draw = function() {
      ctx = myGameArea.context;
      if (that.imgH <= myGameArea.canvas.height) {
        if (that.y < 0) {
          that.y = that.imgH + that.y;
        }
        if (that.y < myGameArea.canvas.height) {
          ctx.drawImage(that.img, that.x, that.y, that.imgW, that.imgH);
        }
        if (that.y + that.imgH < myGameArea.canvas.height) {
          ctx.drawImage(
            that.img,
            that.x,
            that.imgH + that.y,
            that.imgW,
            that.imgH
          );
        }
        if (that.y + 2 * that.imgH < myGameArea.canvas.height) {
          ctx.drawImage(
            that.img,
            that.x,
            2 * that.imgH + that.y,
            that.imgW,
            that.imgH
          );
        }
        if (that.y + 3 * that.imgH < myGameArea.canvas.height) {
          ctx.drawImage(
            that.img,
            that.x,
            3 * that.imgH + that.y,
            that.imgW,
            that.imgH
          );
        }
        if (that.y + 4 * that.imgH < myGameArea.canvas.height) {
          ctx.drawImage(
            that.img,
            that.x,
            4 * that.imgH + that.y,
            that.imgW,
            that.imgH
          );
        }
        if (that.y + 5 * that.imgH < myGameArea.canvas.height) {
          ctx.drawImage(
            that.img,
            that.x,
            5 * that.imgH + that.y,
            that.imgW,
            that.imgH
          );
        }
      } else {
        if (that.y < 0) {
          that.y = that.imgH + that.y;
        }
        if (that.y < myGameArea.canvas.height - that.imgH) {
          ctx.drawImage(
            that.img,
            that.x,
            that.y + that.imgH,
            that.imgW,
            that.imgH
          );
        }
      }
      for (var i = 1; i <= 6; i++) {
        ctx.drawImage(
          that.img,
          that.x,
          that.y - i * that.imgH,
          that.imgW,
          that.imgH
        );
      }
      // ctx.drawImage(that.img, that.x, that.y - that.imgH, that.imgW, that.imgH);
      // ctx.drawImage(
      //   that.img,
      //   that.x,
      //   that.y - 2 * that.imgH,
      //   that.imgW,
      //   that.imgH
      // );
      // ctx.drawImage(
      //   that.img,
      //   that.x,
      //   that.y - 3 * that.imgH,
      //   that.imgW,
      //   that.imgH
      // );
      // ctx.drawImage(
      //   that.img,
      //   that.x,
      //   that.y - 4 * that.imgH,
      //   that.imgW,
      //   that.imgH
      // );
      // ctx.drawImage(
      //   that.img,
      //   that.x,
      //   that.y - 5 * that.imgH,
      //   that.imgW,
      //   that.imgH
      // );
      // ctx.drawImage(
      //   that.img,
      //   that.x,
      //   that.y - 6 * that.imgH,
      //   that.imgW,
      //   that.imgH
      // );
      that.y += that.dy;
    };
  }

  function Component(width, height, image, x, y) {
    // Component variables
    this.image = new Image();
    this.image.src = image;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 5;
    this.speedY = 0;
    this.accelX = 0;
    this.accelY = 0;
    this.frot = 0.8;
    this.t0 = new Date().getTime() / 1000;
    this.userPull = 0;

    // Update Function
    this.update = function() {
      myGameArea.context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    };
    // Move Function
    this.move = function(direction) {
      this.y += this.speedY;
      if (direction === "left") {
        player.x -= this.speedX;
      } else {
        player.x += this.speedX;
      }
      player.x = Math.min(
        myGameArea.canvas.width - this.width,
        Math.max(0, this.x)
      );
    };

    // Player -- with speed and acceleration -- NOT WORKING
    // this.move = function(now) {
    //   this.x = Math.min(
    //     myGameArea.canvas.width - this.width,
    //     Math.max(0, this.x)
    //   );
    //   if (this.x < 0 || this.x > myGameArea.canvas.width - this.width) {
    //     this.accelX = 0;
    //     this.speedX = 0;
    //   }
    //   var dt = now - this.t0;
    //   this.x =
    //     this.x + this.speedX * this.frot * dt + this.accelX * dt * dt / 2;
    //   this.speedX = this.accelX * dt + this.frot * this.speed;
    //   this.t0 = now;
    //   this.y += this.speedY;

    //   player.accelX += player.userPull;
    // };

    // Catch function
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
    this.catchStock = function(stock) {
      if (
        !(
          player.bottom() < stock.top() ||
          player.top() > stock.bottom() ||
          player.right() < stock.left() ||
          player.left() > stock.right()
        )
      ) {
        stock.style = "display:none";
      }
    };
  }

  function createStocks() {
    x = Math.floor(Math.random() * (myGameArea.canvas.width - 30));
    y = 0;
    myGameArea.myStocks.push(
      new Component(30, 30, "./images/EnergyStock.jpg", x, y)
    );
  }

  function updateGameArea() {
    for (i = 0; i < myGameArea.myStocks.length; i++) {
      player.catchStock(myGameArea.myStocks[i]);
    }
    if (myGameArea.frames % 60 === 0) {
      createStocks();
    }
    myGameArea.clear();
    background.draw();
    myGameArea.myStocks.forEach(function(stock) {
      stock.y += 3;
      stock.update();
    });
    myGameArea.frames += 1;
    // move the player
    Object.keys(keysPressed).forEach(function(direction) {
      if (keysPressed[direction]) {
        player.move(direction);
      }
    });
    // -- move player with acceleration -- NOT WORKING
    // now = new Date().getTime() / 1000;
    // player.move(now);
    player.update();
    myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
  }
  // User interaction
  var keysPressed = {
    left: false,
    right: false
  };
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;

  document.onkeydown = function(event) {
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
  // Player -- with speed and acceleration -- NOT WORKING
  // document.onkeydown = function(e) {
  //   if (e.keyCode == 39) {
  //     player.userPull = 0.2;
  //   } else if (e.keyCode == 37) {
  //     player.userPull = -0.2;
  //   }
  // };
  // document.onkeyup = function(e) {
  //   if (e.keyCode == 39) {
  //     player.userPull = 0;
  //   } else if (e.keyCode == 37) {
  //     player.userPull = 0;
  //   }
  // };
};
