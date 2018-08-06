$(document).ready(function () {

    // AJAX Call to GIPHY
    function displayGifs() {
        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=ttdKlgP23DQ4UUSWi5VxlHmpjLGuwtUW&limit=15";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var $gifDiv = $("<div class='gif'>");

                var rating = results[i].rating;

                var $p = $("<p>").text("Rating: " + rating.toUpperCase());
                $p.addClass("text-center");
                $p.addClass("gif-ratings")

                var $gifImage = $("<img>");
                $gifImage.addClass("gif-image");
                $gifImage.attr("src", results[i].images.fixed_height_still.url);

                // $gifDiv.addClass("float-left");
                $gifDiv.append($p);
                $gifDiv.append($gifImage);

                $("#gifDisplay").prepend($gifDiv);
            };
        });
    };

    // Play/Stop Gifs
    $('body').on('click', '.gif-image', function () {
        var src = $(this).attr("src");
        if ($(this).hasClass('playing')) {
            //stop
            $(this).attr('src', src.replace(/\.gif/i, "_s.gif"));
            $(this).removeClass('playing');
        } else {
            //play
            $(this).addClass('playing');
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
        }
    });

    var topics = ["cats", "dogs", "funny"];

    // Rendering buttons from array
    function gifButtons() {

        $("#dynamicButtons").empty();

        for (var i = 0; i < topics.length; i++) {

            var b = $("<button>");
            b.addClass("gif-button");
            b.addClass("btn");
            b.addClass("btn-outline-light");
            b.attr("data-name", topics[i]);
            b.text(topics[i]);
            $("#dynamicButtons").append(b);

        }
    };

    // Accepting user input and pushing to array
    $("#form-submit").on("click", function (event) {

        event.preventDefault();
        var input = $("#form-input").val().trim();
        topics.push(input);
        gifButtons();

    });

    $(document).on("click", ".gif-button", displayGifs);

    gifButtons();

});