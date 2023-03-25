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

document.addEventListener("scroll", (e) => {
    let elmt = document.querySelectorAll("article");
    for(let i = 0; i < elmt.length; i++) {
        for(const child of elmt[i].children) {
            for(const child2 of child.children) {
                if(child2.nodeName == 'IMG') {
                    let scrollPercent = child.getBoundingClientRect().bottom * 40 / window.innerHeight + 20;
                    if(scrollPercent > 100)
                        scrollPercent = 100;
                    else if(scrollPercent < 0)
                        scrollPercent = 0;
                    child2.animate({
                        objectPosition: `center ${100 - scrollPercent}%`
                    }, { duration: 1200, fill: "forwards", time_func: "ease-in-out"});
                    break;
                }
            }
        }
        break;
    }
});

//Slider
const sliders = document.querySelectorAll('.slider');
var n, mouseDown, percentage = [];
for(let i = 0; i < sliders.length; i++)
    percentage.push(0);

function up() {
    if(n == null) return;
    mouseDown = null;
    n = null;
}

document.addEventListener('mousedown', e => {
    for(let i = 0; i < sliders.length; i++) {
        let elmt = sliders.item(i);
        let rect = elmt.getBoundingClientRect();
        if(rect.top < e.clientY && rect.bottom > e.clientY) {
            n = i;
            mouseDown = e.clientX;
            break;
        }
    }
});

document.addEventListener('mousemove', e => {
    if(n == null || mouseDown == null) return;
    let elmt = sliders.item(n);
    if(e.clientX >= window.innerWidth - 10 || e.clientX <= 0)
        up();
    let pos = mouseDown - e.clientX;
    let max = window.innerWidth / 2;
    let percent = pos * 25.5 / max + percentage[n];
    const l = elmt.querySelector(":scope > #elmts");
    if(percent < 0)
        percent = 0;
    else if(percent > 100 * (l.children.length-1))
        percent = 100 * (l.children.length-1);
    for(const child of l.children) {
        child.animate({ translate: `${-percent}% 0%` }, { duration: 250, fill: "forwards" });
    }
    percentage[n] = percent;
});

document.addEventListener('mouseup', e => {
    up();
    let y = e.clientY;
    let x = e.clientX;
    let actual;
    let r;
    let i = 0;
    for(; i < sliders.length; i++) {
        let right = sliders.item(i).querySelector(":scope > #right").getBoundingClientRect();
        if(y > right.top && y < right.bottom && x > right.left && x < right.right) {
            actual = sliders.item(i);
            r = true;
            break;
        }
        let left = sliders.item(i).querySelector(":scope > #left").getBoundingClientRect();
        if(y > left.top && y < left.bottom && x > left.left && x < left.right) {
            actual = sliders.item(i);
            r = false;
            break;
        }
    }
    if(actual == null) return;
    let t = percentage[i];
    if(r)
        t += 101 - (t % 100);
    else 
        t -= (t % 100) == 0 ? 101 : (t % 100);
    let c = actual.querySelector(":scope > #elmts");
    if(t < 0)
        t = 0;
    else if(t > (c.children.length - 1) * 100 + c.children.length)
        t = (c.children.length - 1) * 100 + c.children.length;
    for(const child of c.children) {
        child.animate({ translate: `${-t}% 0%` }, { duration: 450, time_func: "ease-in-out", fill: 'forwards' });
    }
    percentage[i] = t;
});

