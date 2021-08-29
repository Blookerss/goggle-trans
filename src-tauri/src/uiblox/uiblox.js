import $ from "./jquery.module.js";
$(".checkbox").on('click', async({ target }) => {
    let checkbox = $(target);
    checkbox.attr("value", checkbox.attr("value") != "true");
    if (checkbox.attr() == "true")
        checkbox.parents(".control-label").find("img").attr("src", "/uiblox/img/checkbox-ticked.svg");
    else
        checkbox.parents(".control-label").find("img").attr("src", "/uiblox/img/checkbox.svg");
});

/* Buttons */
$("button.btn").on('click', async(event) => {
    const button = $(event.target);
    const ripple = $('<span class="touch-ripple-ripple touch-ripple-visible"></span>').appendTo(button.children(".touch-ripple"));
    const diameter = Math.max(event.target.clientWidth, event.target.clientHeight);
    const radius = diameter / 2;
    ripple.css("width", `${diameter}px`);
    ripple.css("left", `${event.target.clientX - (event.target.offsetLeft + radius)}px`);
    ripple.css("top", `${event.target.clientY - (event.target.offsetTop + radius)}px`);
    setTimeout(function() {
        ripple.remove();
    }, 2500);
});