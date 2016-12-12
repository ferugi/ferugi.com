var $topbar = $('#topbar');

$(document).scroll(function(){
    let shadow;
    let percentFromTop = $topbar.offset().top / $(window).height()

    console.log("Percent from top: " + percentFromTop);
    $topbar.css('background-color', 'rgba(0,0,0,' + percentFromTop + ')');
})