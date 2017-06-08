function isExpanded() {
    return $(".input-holder").width() > 200;
}

//Javascript

function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
    if(!container.hasClass('active')){
        container.addClass('active');
        evt.preventDefault();
    }
    else if(container.hasClass('active') && $(obj).closest('.input-holder').length === 0){
        container.removeClass('active');
        container.removeClass("move-up");
        // clear input
        container.find('.search-input').val('');
    }
}

$(".search-icon").click(function () {
    var wrapper = $(".search-wrapper");
    if(wrapper.hasClass("active") && isExpanded()){
        wrapper.addClass("move-up");
    }
});

// Wikipedia API call

$(document).ready(function() {

    $(".search-icon").on("click", function() {
        if(isExpanded()){
            $(".results").empty();

            //gets input and put it in variable
            var searchquery = document.getElementById("wiki-search").value;

            //output into div
            $(".value").html("Your Search Value: " + searchquery);

            var link = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchquery + "&limit=10&callback=?";

            //output link
            $(".srlink").html("Link: " + link);

            $.getJSON(link, function(data) {
                $(".raw").html(JSON.stringify(data[1]));
                console.log(data);
                /*data[0] = searched;
                 data[1] = title;
                 data[2] = snippet;
                 data[3] = link;
                 */

                for(var i =0; i < data[1].length; i++) {
                    $(".results").prepend('<div class="wiki-result">' + '<a href =' + data[3][i] + ' target=_blank>' + '<h1>' + data[1][i] + '</h1></a>' + '<h3>' + data[2][i] +'</h3></div>' );

                }
            });
        }
    });
});