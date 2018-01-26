var background;
var player;
var message;
var score = 0;
var ttl = 30;
// Best score init
if (localStorage.bestScore === undefined) {
  localStorage.bestScore = JSON.stringify({ name: "Anonymous", score: 0 });
}
var emphasisDictionary = {
  1: "",
  2: " très",
  3: " vraiment très"
};
var statusDictionary = {
  long: "bien",
  short: "mal"
};
var year1 = {
  name: "2000",
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
  info: `Bienvenue dans mon jeu!!! Le premier niveau est très facile...`
};
var year2 = {
  name: "2001",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 2 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 50,
  speed: 2.5,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Si on rajoute un secteur, c'est un peu plus dur... Mais c'est encore jouable!`
};
var year3 = {
  name: "2002",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "long", value: 3 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 2 },
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
  info: `Ca va un peu plus vite non? Et encore un autre secteur... Ca devient compliqué!`
};
var year4 = {
  name: "2003",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 40,
  speed: 2.45,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Hello world we are in 2003!`
};
var year5 = {
  name: "2004",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 40,
  speed: 2.6,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Hello world we are in 2004!`
};

var year6 = {
  name: "2005",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "short", value: 1 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 1 }
  ],
  size: 30,
  speed: 2.75,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le secteur ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  },
  info: `Hello world we are in 2005!`
};

var scenario = [year1, year2, year3];
var year = scenario[0];
var p = 0;
