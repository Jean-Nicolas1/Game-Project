var background;
var player;
var message;
var score = 0;
var ttl = 30;
var cashSound = new Audio("./sounds/coinbag.wav");
var wrongSound = new Audio("./sounds/error.wav");

// Best score init
if (localStorage.bestScore === undefined) {
  localStorage.bestScore = JSON.stringify({ name: "Anonymous", score: 0 });
}
// Best score display
$("#best-score").html('Meilleur score : <b id="score">' + JSON.parse(localStorage.bestScore).score) + "</b>";

// Dictionaries
var emphasisDictionary = {
  1: "",
  2: " très",
  3: " vraiment très"
};
var statusDictionary = {
  long: "bien",
  short: "mal"
};

// Dataset
var year0 = {
  name: "2000",
  market: [],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Bonjour et bienvenue dans le jeu Rempart Vie         Essaye de déplacer la tour bleue avec les flèches du clavier ou en inclinant ton téléphone`
};
var year1 = {
  name: "2001",
  market: [{ name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 1 }],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Bien joué! Maintenant essaye d'attraper un maximum de stocks du secteur AUTOMOBILE qui a l'air de bien se porter...`
};
var year2 = {
  name: "2002",
  market: [],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `                    Parfait! Avec tous ces stocks dans notre portefeuille notre score a bien augmenté, mais attention aux mauvais stocks! Utilise la barre d'espace ou clique pour éliminer les mauvais stocks `
};
var year3 = {
  name: "2003",
  market: [{ name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Shoote un maximum de stocks du secteur AERONAUTIQUE qui a l'air de ne pas se porter très bien en ce moment...`
};
var year4 = {
  name: "2004",
  market: [],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `                          Pas mal du tout! Je penses que tu as compris le principe du jeu. Attention, si un stock, même mauvais, sors du jeux tu perds un point`
};
var year5 = {
  name: "2005",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Comment t'en sors-tu dans un marché multi-secteur?`
};

var year6 = {
  name: "2006",
  market: [],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `                       C'est vraiment pas mal! Mais, comme tu le sais le marché fluctue au cours du temps. Essaye de suivre les changements si tu ne veux pas voir ton score diminuer...`
};

var year7 = {
  name: "2007",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year8 = {
  name: "2008",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 1 }
  ],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year9 = {
  name: "2009",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year10 = {
  name: "2010",
  market: [],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `                  C'est un peu plus difficile non? Mais c'est encore raisonnable... Essayons d'augmenter la vitesse et de faire varier la valeur des stocks!`
};

var year11 = {
  name: "2011",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 1 }
  ],
  size: 50,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year12 = {
  name: "2012",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 2 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 2 }
  ],
  size: 50,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year13 = {
  name: "2013",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 3 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 3 }
  ],
  size: 50,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year14 = {
  name: "2014",
  market: [],
  size: 50,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `               Alors? Ca commence à devenir difficile à suivre? Essayons de rajouter un secteur pour rigoler... Et puis diminuons la taille des stocks pour voir ce qu'il se passe! `
};

var year15 = {
  name: "2015",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "short", value: 1 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 2 }
  ],
  size: 40,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year16 = {
  name: "2016",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "long", value: 3 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 2 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 40,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year17 = {
  name: "2017",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "short", value: 3 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 2 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 1 }
  ],
  size: 40,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year18 = {
  name: "2018",
  market: [],
  size: 40,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `                           Je ne sais pas si tu l'as remarqué mais ça y est, nous sommes en 2018... Tu veux voir à quoi ressemble le futur? Bonne chance!`
};

var year19 = {
  name: "2019",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "short", value: 3 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 2 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 40,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year20 = {
  name: "2020",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "long", value: 3 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 2 }
  ],
  size: 40,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year21 = {
  name: "2021",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "long", value: 3 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 2 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 30,
  speed: 4,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var year22 = {
  name: "2022",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "short", value: 3 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 3 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 1 }
  ],
  size: 20,
  speed: 5,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Penses à surveiller l'évolution du marché!`
};

var scenario = [
  year0,
  year1,
  year2 //,
  // year3,
  // year4,
  // year5,
  // year6,
  // year7,
  // year8,
  // year9,
  // year10,
  // year11,
  // year12,
  // year13,
  // year14,
  // year15,
  // year16,
  // year17,
  // year18,
  // year19,
  // year20,
  // year21,
  // year22
];
var year;
var p;

//getOS
function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

// var yearM = {
//   name: "2005",
//   market: [
//     { name: "OIL & GAS", image: "./images/barrel.png", status: "short", value: 1 },
//     { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 1 },
//     { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 1 }
//   ],
//   size: 30,
//   speed: 2.75,
//   messageGeneration: function() {
//     var stocks = this.market;
//     var mappingRule = function(stock) {
//       return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
//     };
//     return stocks.map(mappingRule);
//   },
//   info: `Hello world we are in 2005!`
// };
