$(document).ready(function() {
  var food = [
    "pizza",
    "noodles",
    "chicken",
    "potatoes",
    "carrots",
    "rice",
    "tofu",
    "tacos"
  ];

  function renderButtons() {
    $("#food-buttons").empty();
    for (i = 0; i < food.length; i++) {
      $("#food-buttons").append(
        "<button class='btn btn-success' data-food='" +
          food[i] +
          "'>" +
          food[i] +
          "</button>"
      );
    }
  }

  renderButtons();

  $("#add-food").on("click", function() {
    event.preventDefault();
    var food = $("#food-input")
      .val()
      .trim();
    food.push(food);
    renderButtons();
    return;
  });

  $("button").on("click", function() {
    var food = $(this).attr("data-food");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      food +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      $("#food").empty();
      for (var i = 0; i < results.length; i++) {
        var foodDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var foodImg = $("<img>");

        foodImg.attr("src", results[i].images.original_still.url);
        foodImg.attr("data-still", results[i].images.original_still.url);
        foodImg.attr("data-animate", results[i].images.original.url);
        foodImg.attr("data-state", "still");
        foodImg.attr("class", "gif");
        foodDiv.append(p);
        foodDiv.append(foodImg);
        $("#food").append(foodDiv);
      }
    });
  });

  function changeState() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
      $(this).attr("src", animateImage);
      $(this).attr("data-state", "animate");
    } else if (state == "animate") {
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still");
    }
  }

  $(document).on("click", ".gif", changeState);
});
