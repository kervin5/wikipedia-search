function isExpanded() {
    return $(".input-holder").width() > 200;
}

//Javascript
function wikiSearch(value) {
    $(".results").empty();
    $(".loader").fadeIn(100);

    var link = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + value + "&prop=images&limit=10&callback=?";

    $.getJSON(link, function(data) {
        $(".raw").html(JSON.stringify(data[1]));
        /*data[0] = searched;
         data[1] = title;
         data[2] = snippet;
         data[3] = link;
         */
    }).done(function (data) {
        console.log(data);
        for(var i =0; i < data[1].length; i++) {
            $(".results").prepend('<div class="wiki-result">' + '<a href =' + data[3][i] + ' target=_blank>' + '<h3>' + data[1][i] + '</h3></a>' + '<h4>' + data[3][i] + '</h4>'+ '<p>' + data[2][i] +'</p></div>' );
        }
        //Shows results
        $(".loader").hide();
        var wrapper = $(".search-wrapper");
        wrapper.addClass("move-up");
        $(".expanded").addClass("shrink");
    }).fail(function (data) {
        console.log("There was an error");
    });
}


function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');

    if(!container.hasClass('active')){
        container.addClass('active');
        evt.preventDefault();
    }
    else if(container.hasClass('active') && $(obj).closest('.input-holder').length === 0){
        container.removeClass('active');
        container.removeClass("move-up");
        $(".colored-bg").removeClass("shrink");
        $(".results").empty();
        // clear input
        container.find('.search-input').val('');
        // clear and hide result container when we press close
        container.find('.result-container').fadeOut(100, function(){$(this).empty();});
    }
}

function submitFn(obj, evt){
    var value = $(obj).find('.search-input').val().trim();
    var _html = "";

    if(!value.length){
        $(obj).find('.error-container').fadeIn(100).delay(2000).fadeOut(2000);
    }
    else{
        // Wikipedia API call
        wikiSearch(value);
        $(".search-query").find(".words").text(value);
    }
    evt.preventDefault();
}
