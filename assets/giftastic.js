var topics = ["Naruto", "Sasuke", "Kakashi", "Sakura", "Itatchi", "Rock Lee", "Neji", "Orochimaru", "Shikamaru"];


function renderButtons() {

    $("#char-view").empty();


    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        a.addClass("char");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#char-view").append(a);
    }

    $("#add-char").on("click", function (event) {

        event.preventDefault();

        var topic = $("#char-input").val().trim();
        
        topics.push(topic);
    
        renderButtons();
    });
}

function displaygif() {


    $(".char").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            var character = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                character + "&api_key=XyLGkP7nr2rT85saCWhSXP2RkOpsgCzL&limit=10&rating=pg";
            console.log(character)
            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function (response) {


                    var results = response.data;


                    for (var i = 0; i < results.length; i++) {

                        var CharacterDiv = $("<div>");

                        var para = $("<p>").text("Rating: " + results[i].rating);

                        var CharacterImage = $("<img>");
                        CharacterImage.attr("src", results[i].images.fixed_height.url);

                        CharacterDiv.append(para);
                        CharacterDiv.append(CharacterImage);

                        $("#char-view").append(CharacterDiv);
                    }
                });
        };
    });
};
renderButtons();
$(document).on("click", ".char", displaygif);