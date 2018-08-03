var topics = ["cats", "dogs", "hockey"];

function displayGifs() {

    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=ttdKlgP23DQ4UUSWi5VxlHmpjLGuwtUW&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var gifDiv = $("<div class='gif'>");

        var rating = response.Rated;

        var pRating = $("<p>").text("Rating: " + rating);

        gifDiv.append(pRating);

        var url = response.url;

        var gifURL = $("div").attr("src", url);

        $("#gifboard").prepend(gifDiv);
    });

}

function gifButtons() {

    $("#gifButtons").empty();

    for (var i = 0; i < topics.length; i++) {

        var b = $("<button>");
        b.addClass("gif-button");
        b.attr("name", topics[i]);
        b.text(topics[i]);
        $("#gifButtons").append(b);

    }
};

$("#submitBtn").on("click", function (event) {

    event.preventDefault();
    var input = $("#input").val().trim();
    topics.push(input);
    gifButtons();
    
});

$(document).on("click", ".gif-button", displayGifs);

gifButtons();