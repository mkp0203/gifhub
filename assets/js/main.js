$(document).ready(function () {
    
    function displayGifs() {
        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=ttdKlgP23DQ4UUSWi5VxlHmpjLGuwtUW&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='gif'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");

                    gifImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    $("#gifDisplay").prepend(gifDiv);
                };
            };

        });
    };

    var topics = ["cats", "dogs", "hockey"];

    function gifButtons() {

        $("#dynamicButtons").empty();

        for (var i = 0; i < topics.length; i++) {

            var b = $("<button>");
            b.addClass("gif-button");
            b.attr("data-name", topics[i]);
            b.text(topics[i]);
            $("#dynamicButtons").append(b);

        }
    };

    $("#submitBtn").on("click", function (e) {

        e.preventDefault();
        var input = $("#input").val().trim();
        topics.push(input);
        gifButtons();

    });

    $(document).on("click", "gif-button", displayGifs);

    gifButtons();
});