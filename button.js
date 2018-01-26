$("#name").keyup(function() {
  if ($("#name").prop("value") !== "") {
    $("#start-button").removeAttr("disabled");
  } else {
    $("#start-button").attr("disabled");
  }
});

var name = "";
$("#start-button").on("click", function() {
  name = $("#name").prop("value");
});
