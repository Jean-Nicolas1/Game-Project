$("#name").keyup(function() {
  if ($("#name").prop("value") !== "") {
    $("#start-button").removeAttr("disabled");
  } else {
    $("#start-button").attr("disabled");
  }
});

var playerName = "";
$("#start-button").on("click", function() {
  playerName = $("#name").prop("value");
});
