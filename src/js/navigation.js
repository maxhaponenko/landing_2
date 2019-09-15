var jQuery = require('jquery');

var $ = jQuery.noConflict(); 

// Выдвигаем или прячем боковое меню
var moveNavPanel = (id,px) => {
    var elem = document.getElementById(id);
    elem.style.left = px;
};

// Слушатель события + определяем прятать или выдвигать навигационную панель при нажатии
document.getElementById("showHideMenu").addEventListener("click", function() {
    let elem = document.getElementById("navigation-bar").style.left;
    if (elem !== "0px") {
        moveNavPanel("navigation-bar", "0px");
    } else {
        moveNavPanel("navigation-bar", "-310px");
    }
});

document.getElementById("closeNavigation").addEventListener("click", function() {
    moveNavPanel("navigation-bar", "-310px");
});

