
var img_n = 0, max_img = document.querySelectorAll("#scroll>div>img").length
var scroller = document.querySelector("#scroll>div")

function left() {
    img_n --
    if (img_n < 0)
        img_n = max_img - 1
    scroller.style.transform = "translate(-" + (img_n * (window.innerWidth > 700 ? 40 : 80)) + "vw, 0px)"
    clearTimeout(time_func)
    time_func = setTimeout(left, 2000)
}
function right() {
    img_n ++
    if (img_n >= max_img)
        img_n = 0
    scroller.style.transform = "translate(-" + (img_n * (window.innerWidth > 700 ? 40 : 80)) + "vw, 0px)"
    clearTimeout(time_func)
    time_func = setTimeout(right, 2000)
}

var time_func = setTimeout(right, 2000)