//JQuery Code for scrolling up and down
$("a").click(function(e) {
    var btnID = e.currentTarget.id + "Section";
    $("html, body").animate({
        scrollTop: $("#" + btnID).offset().top
    }, 1000);

});

$('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
});

$('#footer').click(function() {
    $('#toggle').toggleClass('active');
    $('#overlay').toggleClass('open');
});