var lastPos;
var scroll_delta;
var scroll_up_amount;
var scroll_down_amount;
var menu;

$(document).ready(function() {
    // Init CSS changes
    $("#topbar").css("transition", "top 0.25s");
    $("#bottombar").css("transition", "bottom 0.25s");
    menu = true;
    scroll_amount = 0;
});

function enableMenu(){
    $("#topbar").css("top", 0);
    $("#bottombar").css("bottom", 0);
    menu = true;
}

function disableMenu(){
    $("#topbar").css("top", "-6em");
    $("#bottombar").css("bottom", "-6em");
    menu = false;
}

$(document).scroll(function(){
    // Bugfix for scroll amount.
    if (isNaN(scroll_up_amount)) {
        scroll_up_amount = 0;
    }

    if (isNaN(scroll_down_amount)) {
        scroll_down_amount = 0;
    }

    scroll_delta = $(this).scrollTop() - lastPos;

    if ($(this).scrollTop() == 0) {
        enableMenu();
    } else if (menu && scroll_delta > 0) {
        // Scrolling down - disable menu
        scroll_down_amount += scroll_delta;

        if (scroll_down_amount > 100) {
            disableMenu();
            scroll_down_amount = 0;
        }

    } else if (!menu && scroll_delta < 0 ) {
        // Scrolling up
        scroll_up_amount += Math.abs(scroll_delta);
        
        if (scroll_up_amount > 100) {
            enableMenu();
            scroll_up_amount = 0;
        }
    }
    lastPos = $(this).scrollTop();

    // Debugging
    /*
    console.log("Menu: " + menu);
    console.log("Delta: " + scroll_delta);
    console.log("Scroll down amount: " + scroll_down_amount);
    console.log("Scroll up amount: " + scroll_up_amount);
    */
});