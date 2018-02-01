window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("main-page").style.display = "none";
    document.getElementById("game-board").style.display = "block";
    startGame();
  };

  function startGame() {
    myGameArea.start();
    p = 0;
    year = scenario[0];
    background = new Background("./images/OLD/bg.jpg", myGameArea.canvas.width, myGameArea.canvas.height, 3);
    player = new Player(
      8,
      "./images/player.png",
      (myGameArea.canvas.width - 60) / 2,
      myGameArea.canvas.height - 80,
      60,
      30
    );
    myGameArea.myStocks = [];
    myGameArea.myBullets = [];
    myGameArea.myBarrel = ["bullet", "bullet", "bullet", "bullet"];
    myGameArea.myPoints = [];
    //mobile device -- should put it in Player Move function (Component.js)
    if (window.DeviceMotionEvent) {
      window.addEventListener(
        "devicemotion",
        function(event) {
          if (getOS() === "iOS") {
            player.x = Math.min(
              myGameArea.canvas.width - player.width,
              Math.max(0, player.x + event.accelerationIncludingGravity.x * 3)
            );
          } else {
            player.x = Math.min(
              myGameArea.canvas.width - player.width,
              Math.max(0, player.x - event.accelerationIncludingGravity.x * 3)
            );
          }
        },
        false
      );
    } else {
      console.log("The browser is not supporting devicemotion");
    }
  }
  //mobile device
  var myGameArea = {
    canvas: document.createElement("canvas"),
    myStocks: [],
    myBullets: [],
    myBarrel: [],
    myPoints: [],
    frames: 0,
    drawCanvas: function() {
      this.canvas.width = 500; /*396 */
      this.canvas.height = screen.availHeight;
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").append(this.canvas); // ------> not supported for IE
      // $("#game-board").html(this.canvas);
    },
    start: function() {
      this.drawCanvas();
      this.reqAnimation = window.requestAnimationFrame(updateGameArea);
    },
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    displayScore: function() {
      this.context.font = "30px helvetica";
      this.context.fillStyle = "white";
      this.context.fillText("Score: " + score, 20, 35);
    },
    displayYear: function() {
      this.context.font = "30px helvetica";
      this.context.fillStyle = "white";
      this.context.fillText("Année: " + year.name, myGameArea.canvas.width - 190, 35);
    },
    displayStockInformation: function() {
      this.context.font = "20px helvetica";
      if (year.market.length > 0) {
        for (var i = 0; i < year.market.length; i++) {
          var color;
          if (year.market[i].status === "short") {
            color = "red";
          } else {
            color = "green";
          }
          this.context.fillStyle = color;
          this.context.fillText(year.messageGeneration()[i], 20, myGameArea.canvas.height - 100 - 30 * i);
        }
      }
    },
    stop: function() {
      cancelAnimationFrame(this.reqAnimation);
      if (score > JSON.parse(localStorage.bestScore).score) {
        localStorage.bestScore = JSON.stringify({ name: playerName, score: score });
      }
      this.gameOver();
    },
    gameOver: function() {
      var that = this;
      this.clear();
      this.drawFinalPoints();
      setTimeout(function() {
        that.restartGame();
      }, 3000);
    },
    drawFinalPoints: function() {
      this.context.fillStyle = "#206FB6";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.font = "bold 30px Helvetica";
      this.context.fillStyle = "white";
      this.context.fillText("Fin du jeu", 170, 200);
      this.context.font = "22px Helvetica";
      this.context.fillStyle = "black";
      this.context.fillText("Bravo " + playerName + ", ton score final est de", 100, 350);
      this.context.font = "bold 30px Helvetica";
      this.context.fillStyle = "black";
      this.context.fillText(score + " points", 180, 400);
      // this.context.font = "bold 24px Helvetica";
      // this.context.fillStyle = "black";
      // this.context.fillText(
      //   JSON.parse(localStorage.bestScore).name + " a le meilleur score : " + JSON.parse(localStorage.bestScore).score,
      //   50,
      //   500
      // );
      this.context.font = "bold 30px Helvetica";
      this.context.fillStyle = "white";
      this.context.fillText("Merci d'avoir joué!", 120, 550);
      score = 0;
    },
    restartGame: function() {
      // Best score display

      setTimeout(function() {
        document.getElementById("game-board").style.display = "none";
        document.getElementById("main-page").style.display = "block";
        $("#best-score").html('Meilleur score : <b id="score">' + JSON.parse(localStorage.bestScore).score) + "</b>";
      }, 1500);
    }
  };

  function createStocks(width, height, market, speed) {
    var x =
      player.width / 4 +
      Math.min(myGameArea.canvas.width - player.width / 2 - width, Math.floor(Math.random() * myGameArea.canvas.width));
    var y = 50;
    var randomSector = Math.floor(Math.random() * market.length);
    if (market.length > 0) {
      myGameArea.myStocks.push(
        new Stock(
          speed,
          market[randomSector].image,
          x,
          y,
          width,
          height,
          market[randomSector].status,
          market[randomSector].value
        )
      );
    }
  }

  function createMessage() {
    message = new Message(myGameArea.canvas.width, myGameArea.canvas.height - 22.5, 1.5, year.info);
  }

  function shootBullet(width, height) {
    var x = player.x + player.width / 2 - width / 2;
    var y = player.y;
    myGameArea.myBullets.push(new Bullet(-3, "./images/bullet.png", x, y, width, height));
  }

  function updateGameArea() {
    //Stop game -- scenario.length + 1
    if (p === scenario.length + 1) {
      myGameArea.stop();
      return;
    }

    // Removing catched stocks from array
    for (i = 0; i < myGameArea.myStocks.length; i++) {
      if (player.checkCatchStock(myGameArea.myStocks[i])) {
        if (myGameArea.myStocks[i].status === "short") {
          score -= myGameArea.myStocks[i].value;
          wrongSound.play();
          myGameArea.myPoints.push({
            points: "-" + myGameArea.myStocks[i].value,
            x: player.x + player.width / 2 - 5,
            y: player.y - 5,
            color: "red",
            ttl: ttl
          });
        } else {
          score += myGameArea.myStocks[i].value;
          cashSound.play();
          myGameArea.myPoints.push({
            points: "+" + myGameArea.myStocks[i].value,
            x: player.x + player.width / 2 - 5,
            y: player.y - 5,
            color: "green",
            ttl: ttl
          });
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
            cashSound.play();
            myGameArea.myPoints.push({
              points: "+" + myGameArea.myStocks[i].value,
              x: myGameArea.myStocks[i].x + year.size / 2,
              y: myGameArea.myStocks[i].y + year.size / 2,
              color: "green",
              ttl: ttl
            });
          } else {
            score -= myGameArea.myStocks[i].value;
            wrongSound.play();
            myGameArea.myPoints.push({
              points: "-" + myGameArea.myStocks[i].value,
              x: myGameArea.myStocks[i].x + year.size / 2,
              y: myGameArea.myStocks[i].y + year.size / 2,
              color: "red",
              ttl: ttl
            });
          }
          myGameArea.myStocks.splice(i, 1);
          myGameArea.myBullets.splice(j, 1);
          myGameArea.myBarrel.push("bullet");
        }
      }
    }
    // Removing out of game stocks
    for (i = 0; i < myGameArea.myStocks.length; i++) {
      if (myGameArea.myStocks[i].checkOutOfGame(myGameArea.canvas.height - year.size - 45)) {
        myGameArea.myPoints.push({
          points: "-1",
          x: myGameArea.myStocks[i].x + year.size / 2,
          y: myGameArea.myStocks[i].y + year.size / 2,
          color: "red",
          ttl: ttl
        });
        myGameArea.myStocks.splice(i, 1);
        score -= 1;
        wrongSound.play();
      }
    }
    // Removing out of game bullets and reloading the barrel
    for (i = 0; i < myGameArea.myBullets.length; i++) {
      if (myGameArea.myBullets[i].checkOutOfGame()) {
        myGameArea.myBullets.splice(i, 1);
        myGameArea.myBarrel.push("bullet");
      }
    }
    // Removing points earned when ttl = 0
    for (i = 0; i < myGameArea.myPoints.length; i++) {
      if (myGameArea.myPoints[i].ttl === 0) {
        myGameArea.myPoints.splice(i, 1);
      }
    }
    // Changing of years & stocks & message
    if (myGameArea.frames % 1200 === 0) {
      year = scenario[p % scenario.length];
      createMessage();
      p += 1;
    }
    // Positioning stocks
    if (myGameArea.frames % 60 === 0 && myGameArea.frames !== 0) {
      createStocks(year.size, year.size, year.market, year.speed);
    }

    // Clearing Canvas
    myGameArea.clear();
    // Drawing background --> disabled
    // -- background.draw(myGameArea.context);

    // Drawing header background
    myGameArea.context.fillStyle = "black";
    myGameArea.context.fillRect(0, 0, myGameArea.canvas.width, 60);
    // Drawing ticker background
    myGameArea.context.fillStyle = "#206FB6";
    myGameArea.context.fillRect(0, myGameArea.canvas.height - 45, myGameArea.canvas.width, 35);

    // Drawing stocks
    myGameArea.myStocks.forEach(function(stock) {
      stock.y += stock.speedY;
      stock.update(myGameArea.context);
    });

    // Drawing earned points
    myGameArea.myPoints.forEach(function(element) {
      myGameArea.context.fillStyle = element.color;
      myGameArea.context.font = "bold 20px helvetica";
      myGameArea.context.fillText(element.points, element.x, element.y);
    });
    // Write information flow
    message.x -= message.speed;
    message.update(myGameArea.context);

    // Incrementing frames
    myGameArea.frames += 1;
    // Decrementing ttl (time to leave) of myPoints
    myGameArea.myPoints.forEach(function(element) {
      element.ttl -= 1;
    });
    // Moving the player depending on key pressed
    Object.keys(keysPressed).forEach(function(direction) {
      if (keysPressed[direction]) {
        player.move(direction, myGameArea.canvas.width);
      }
    });
    // Drawing the player
    player.update(myGameArea.context);
    // Displaying infos
    myGameArea.displayScore();
    myGameArea.displayYear();
    myGameArea.displayStockInformation();
    // Creating bullets
    // document.onkeypress = function(event) {
    //   if (event.keyCode === 32 && myGameArea.myBarrel.length > 0) {
    //     shootBullet(20, 20);
    //     myGameArea.myBarrel.splice(0, 1);
    //   }
    // }; ---------------> Does not work in firefox!
    document.getElementsByTagName("canvas")[0].onclick = function() {
      if (myGameArea.myBarrel.length > 0) {
        shootBullet(20, 20);
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
    //Necessary for working with firefox
    //#######################################################
    if (event.keyCode === 32 && myGameArea.myBarrel.length > 0) {
      shootBullet(20, 20);
      myGameArea.myBarrel.splice(0, 1);
    }
    //#######################################################
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
