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
    if(wrapper.hasClass("active") && $(".input-holder").width() > 200){
        wrapper.addClass("move-up");
    }
});