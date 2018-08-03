$("#btn").on("click", function (event) {
    event.preventDefault();
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "f4bad8a91e374aa1bfc7996fe3539064",
        'q': $("#SearchTerm").val(),
        'begin_date': "19500101",
        'end_date': "20180730"
    });

    $.ajax({
        url: url,
        method: 'GET',
    }).then(function (nyt) {

        var results = nyt.response.docs;

        $("#articles-data").empty();
        
        for (var i = 0; i < results.length; i++) {
            var article = $("<article>");
            var article1 = $("<p>").text(results[i].snippet);
            var article2 = $("<p>").text(results[i].web_url);
            
            article.append(article1);
            article.append(article2);
            
            $("#articles-data").append(article);

        }
    });

});