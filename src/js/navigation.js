
// Выдвигаем или прячем боковое меню
var moveNavPanel = (id,px) => {
    var elem = document.getElementById(id);
    elem.style.left = px;
};

// Слушатель события + определяем прятать или выдвигать навигационную панель при нажатии
document.getElementById("navigation_start").addEventListener("click", function() {
    let elem = document.getElementById("navigation").style.left ;
    if (elem !== "0px") {
        moveNavPanel("navigation", "0px");
    } else {
        moveNavPanel("navigation", "-310px");
    }
});

