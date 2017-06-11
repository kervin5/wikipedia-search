function isExpanded() {
    return $(".input-holder").width() > 200;
}

//Javascript
function wikiSearch(value) {
    $(".results").empty();
    $(".loader").fadeIn(100);
    //gets input and put it in variable
    var searchquery = value;

    //output into div
    $(".value").html("Your Search Value: " + searchquery);

    var link = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchquery + "&prop=images&limit=10&callback=?";

    //output link
    $(".srlink").html("Link: " + link);

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
            $(".results").prepend('<div class="wiki-result">' + '<a href =' + data[3][i] + ' target=_blank>' + '<h1>' + data[1][i] + '</h1></a>' + '<h3>' + data[2][i] +'</h3></div>' );
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

    var _html = "Yup yup! Your search text sounds like this: ";
    if(!value.length){
        _html = "Yup yup! Add some text friend :D";
    }
    else{
        _html += "<b>" + value + "</b>";
        // Wikipedia API call
        wikiSearch(value);
    }
    $(obj).find('.result-container').html('<span>' + _html + '</span>');
    $(obj).find('.result-container').fadeIn(100);
    evt.preventDefault();
}
