
var img_n = 0, max_img = document.querySelectorAll("#scroll>#elmts>img").length
var scroller = document.querySelector("#scroll>#elmts")

function left() {
    img_n --
    if (img_n < 0)
        img_n = max_img - 1
    scroller.style.transform = "translate(-" + (img_n * (window.innerWidth > 700 ? 40 : 80)) + "vw, 0px)"
    clearTimeout(time_func)
    time_func = setTimeout(left, 4000)
}
function right() {
    img_n ++
    if (img_n >= max_img)
        img_n = 0
    scroller.style.transform = "translate(-" + (img_n * (window.innerWidth > 700 ? 40 : 80)) + "vw, 0px)"
    clearTimeout(time_func)
    time_func = setTimeout(right, 4000)
}

var time_func = setTimeout(right, 4000)