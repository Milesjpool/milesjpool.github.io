$(document).ready(function () {

    $('.card').hover(function () {
        $(this).find(".definition").removeClass("hidden");
        $(this).addClass("no-bg");
    }, function () {
        $(this).find(".definition").addClass("hidden");
        $(this).removeClass("no-bg");
    });

});