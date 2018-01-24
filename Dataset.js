var background;
var player;
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
      return `Le stock ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  }
};
var year2 = {
  name: "2001",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le stock ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  }
};
var year3 = {
  name: "2002",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 1 }
  ],
  size: 50,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le stock ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  }
};
var year4 = {
  name: "2003",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 40,
  speed: 2,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le stock ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  }
};
var year5 = {
  name: "2004",
  market: [
    { name: "AUTOMOBILE", image: "./images/car.png", status: "long", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "short", value: 1 }
  ],
  size: 40,
  speed: 3,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le stock ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  }
};

var year6 = {
  name: "2005",
  market: [
    { name: "OIL & GAS", image: "./images/barrel.png", status: "short", value: 1 },
    { name: "AUTOMOBILE", image: "./images/car.png", status: "short", value: 1 },
    { name: "AERONAUTIQUE", image: "./images/airplane.png", status: "long", value: 1 }
  ],
  size: 30,
  speed: 5,
  messageGeneration: function() {
    var stocks = this.market;
    var mappingRule = function(stock) {
      return `Le stock ${stock.name} se porte${emphasisDictionary[stock.value]} ${statusDictionary[stock.status]}`;
    };
    return stocks.map(mappingRule);
  }
};

var scenario = [year1, year2, year3, year4, year5, year6];
var year = scenario[0];
var p = 0;
