// Select elements here
// https://www.w3school.com.cn/jsref/met_document_queryselectorall.asp
const images = document.querySelectorAll("div > img");
const sectionbody = document.getElementById('sectionbody');
const content = document.getElementById('content');
const header = document.getElementById('header');
const footerText = document.getElementById('footer-text');
const ic = document.getElementById('ic');

const tocs = document.querySelectorAll(".toc-list-item");

/******************** 修改 img 高度 ********************/
let imageCenters = ["img_", "COMIC BAVEL"];

function initImageHeightLimit() {
    let pathname = window.location.pathname; // 路径
    pathname = decodeURIComponent(pathname)

    // 1.Book
    if (pathname.includes("Book")) {
        console.log("字符串中包含 'Book'");
        // 例外
        if (ic.textContent === "T") {
            makeImageCenter(window.innerHeight);
        }
    } else if (pathname.includes("comic")) {
        // 2.comic
        isImageCenter = true
        for (let j = 0; j < imageCenters.length; j++) {
            targetName = imageCenters[j]
            if (pathname.includes(targetName)) {
                isImageCenter = false
                break
            }
        }
        if (ic.textContent === "T") {
            isImageCenter = true;
        }
        if (isImageCenter) {
            makeImageCenter(window.innerHeight);
        }
    }
}

function initImageLimit() {
    str = ic.textContent
    const pattern = /\d+/;
    value = str.match(pattern)

    if (str.includes("W")) {
        addImageWidthLimit(value);
    } else if (str.includes("H")) {
        addImageHeightLimit(value);
    } else if (str.includes("A")) {
        makeImageAuto();
    }
}

function makeImageCenter(maxHeight) {
    for (let i = 0; i < images.length; i++) {
        img = images[i]

        var parentElement = images[i].parentNode;
        parentElement.style.textAlign = "center";

        images[i].style.width = "auto";
        images[i].style.display = "inline-block";
        images[i].style.maxHeight = maxHeight + "px"

        if (img.id !== "") {
            naturalWidth = img.naturalWidth
            naturalHeight = img.naturalHeight

            autoWidth = sectionbody.clientWidth

            // 如果图片的 宽 >= 高
            if (naturalWidth >= naturalHeight) {
                if (naturalWidth >= autoWidth) {
                    autoHeight = autoWidth * naturalHeight / naturalWidth
                    images[i].style.paddingTop = ((maxHeight - autoHeight) / 2).toString() + "px";
                    images[i].style.paddingBottom = ((maxHeight - autoHeight) / 2).toString() + "px";
                } else {
                    images[i].style.paddingTop = ((maxHeight - naturalHeight) / 2).toString() + "px";
                    images[i].style.paddingBottom = ((maxHeight - naturalHeight) / 2).toString() + "px";
                }
            } else {
                // 如果图片的 高 > 宽
                // 是否为小图片
                if (naturalHeight < maxHeight) {
                    images[i].style.paddingTop = ((maxHeight - naturalHeight) / 2).toString() + "px";
                    images[i].style.paddingBottom = ((maxHeight - naturalHeight) / 2).toString() + "px";
                } else {
                    images[i].style.marginTop = "0";
                }
            }
        }
    }
}

function addImageHeightLimit(maxHeight) {
    for (let i = 0; i < images.length; i++) {
        images[i].style.width = "auto";
        images[i].style.display = "inline-block";
        images[i].style.maxHeight = maxHeight + "px";
        images[i].style.marginTop = "0";

        var parentElement = images[i].parentNode;
        parentElement.style.textAlign = "center";
    }
}

function addImageWidthLimit(maxWidth) {
    for (let i = 0; i < images.length; i++) {
        images[i].style.height = "auto";
        images[i].style.display = "inline-block";
        images[i].style.maxWidth = maxWidth + "px";
        images[i].style.marginTop = "0";

        var parentElement = images[i].parentNode;
        parentElement.style.textAlign = "center";
    }
}

function makeImageAuto() {
    for (let i = 0; i < images.length; i++) {
        images[i].style.width = "auto";
        images[i].style.display = "inline-block";
        images[i].style.maxHeight = "100%";
        images[i].style.marginTop = "0";

        var parentElement = images[i].parentNode;
        parentElement.style.textAlign = "center";
    }
}


function removeImageHeightLimit() {
    for (let i = 0; i < images.length; i++) {
        images[i].style.width = "100%";
        images[i].style.display = "block";
        images[i].style.maxHeight = "";
        images[i].style.maxWidth = "";
        images[i].style.padding = "0"

        var parentElement = images[i].parentNode;
        parentElement.style.textAlign = "center";
    }
}

/******************** 调节亮度 ********************/

let isBrightness = false;

function initImageBrightness() {
    // 判断是否为 Book
    let pathname = window.location.pathname; // 路径
    pathname = decodeURIComponent(pathname)
    if (pathname.includes("Book")) {
        console.log("字符串中包含 'Book'");
        isBrightness = false;
    } else {
        isBrightness = true;
    }
    lowerImageBrightness();
}

function lowerImageBrightness() {
    // 更改亮度
    if (!isBrightness) {
        for (let i = 0; i < images.length; i++) {
            images[i].style.filter = "brightness(0.8)";
        }
        isBrightness = true;
    } else {
        for (let i = 0; i < images.length; i++) {
            images[i].style.filter = "brightness(1.0)";
        }
        isBrightness = false;
    }
}

function invertLowerImageBrightness() {
    // 更改亮度
    if (!isBrightness) {
        for (let i = 0; i < images.length; i++) {
            images[i].style.filter = "invert(100%) brightness(0.8) contrast(1.2)";
        }
        isBrightness = true;
    } else {
        for (let i = 0; i < images.length; i++) {
            images[i].style.filter = "brightness(1.0)";
        }
        isBrightness = false;
    }
}

/******************** 调节浏览器宽度 ********************/

const sectionbodyWidth = sectionbody.style.width;
let isSectionbodyWidthChange = false;

function changeSectionbodyWidth() {
    if (!isSectionbodyWidthChange) {
        if (sectionbodyWidth == null || sectionbodyWidth === "") {
            sectionbody.style.width = "600px";
            // sectionbody.style.margin = "0 auto";
        } else {
            sectionbody.style.width = "";
            // sectionbody.style.margin = "";
        }
        isSectionbodyWidthChange = true;
    } else {
        if (sectionbodyWidth == null || sectionbodyWidth === "") {
            sectionbody.style.width = "";
            // sectionbody.style.margin = "";
        } else {
            sectionbody.style.width = sectionbodyWidth;
            // sectionbody.style.margin = "0 auto";
        }
        isSectionbodyWidthChange = false;
    }
}

/******************** 显示/隐藏书签 ********************/

let isHidden = false;

function changeImgWidth() {
    // 非隐藏书签栏
    if (!isHidden) {
        header.classList.add('hide');
        content.style.paddingLeft = "1.7em";
        content.style.backgroundPositionX = "0em";
        isHidden = true;
    } else {
        header.classList.remove('hide');
        content.style.paddingLeft = "15.9375em";
        content.style.backgroundPositionX = "14em";
        isHidden = false;
    }
}

/******************** 遍历所有的img ********************/

var ImgHashList = [];
let firstImgHash = "";
let lastImgHash = "";

function skipTo(hash) {
    let protocol = window.location.protocol; // http: 或 https:
    let host = window.location.host; // 主机名和端口号
    let pathname = window.location.pathname; // 路径

    let fullUrl = protocol + "//" + host + pathname + "#" + hash;

    window.location.href = fullUrl;
    this.blur();
}

function init_img_hash() {
    for (let i = 0; i < images.length; i++) {
        var imgElement = images[i]; // 假设ID为'image'的元素包含img标签
        var id = imgElement.id;
        if (id !== "") {
            ImgHashList.push(id);
        }
    }
    firstImgHash = ImgHashList[0]
    lastImgHash = ImgHashList[ImgHashList.length - 1]
}

function get_current_hash() {
    let hash = window.location.hash

    let index = hash.indexOf('%20');
    if (index !== -1) {
        hash = hash.substring(index + 3); // 加3是为了去掉'%20'本身
        hash = "#" + hash
    }

    return decodeURIComponent(hash).substring(1); // 片段标识符
}


function next_img_url() {
    // 1. 获取当前的 hash
    let hashWithoutHash = get_current_hash()
    let next_hash = ""

    // 2. 遍历数组，找到下一个 hash
    for (let i = 0; i < ImgHashList.length; i++) {
        var id = ImgHashList[i];
        console.log(id);
        if (id === hashWithoutHash && (i !== ImgHashList.length - 1)) {
            next_hash = ImgHashList[i + 1]
            break;
        }
    }

    // 3. 处理空值
    if (next_hash === "") {
        next_hash = firstImgHash
    }

    // 4. 跳转
    skipTo(next_hash)
}

function prev_img_url() {
    // 1. 获取当前的 hash
    let hashWithoutHash = get_current_hash()
    let next_hash = ""

    // 2. 遍历数组，找到下一个 hash
    for (let i = 0; i < ImgHashList.length; i++) {
        var id = ImgHashList[i];
        console.log(id);
        if (id === hashWithoutHash && (i !== 0)) {
            next_hash = ImgHashList[i - 1]
            break;
        }
    }

    // 3. 处理空值
    if (next_hash === "") {
        next_hash = lastImgHash
    }

    // 4. 跳转
    skipTo(next_hash)
}


/******************** 遍历所有的 toc ********************/

var tocHashList = [];
let firstTocHash = "";
let lastTocHash = "";

function init_toc_hash() {
    for (let i = 0; i < tocs.length; i++) {
        var tocElement = tocs[i]; // 假设ID为'image'的元素包含img标签

        var firstChild = tocElement.firstElementChild;
        if (firstChild !== null) {
            // 处理子元素节点
            var href = firstChild.href;
            if (href !== "") {
                let index = href.indexOf('#');
                let result = (index > -1) ? href.substring(index + 1) : '';
                tocHashList.push(result);
            }
        }
    }
    firstTocHash = tocHashList[0]
    lastTocHash = tocHashList[tocHashList.length - 1]
}

function next_toc_hash() {
    // 1. 获取当前的 hash
    let hash = window.location.hash
    hashWithoutHash = hash.replace('#', '')
    let next_hash = ""

    // 2. 遍历数组，找到下一个 hash
    for (let i = 0; i < tocHashList.length; i++) {
        var id = tocHashList[i];
        console.log(id);
        if (id === hashWithoutHash && (i !== tocHashList.length - 1)) {
            next_hash = tocHashList[i + 1]
            break;
        }
    }

    // 3. 处理空值
    if (next_hash === "") {
        next_hash = firstTocHash
    }

    // 4. 跳转
    skipTo(next_hash)
}


function prev_toc_url() {
    // 1. 获取当前的 hash
    let hash = window.location.hash
    hashWithoutHash = hash.replace('#', '')
    let next_hash = ""

    // 2. 遍历数组，找到下一个 hash
    for (let i = 0; i < tocHashList.length; i++) {
        var id = tocHashList[i];
        console.log(id);
        if (id === hashWithoutHash && (i !== 0)) {
            next_hash = tocHashList[i - 1]
            break;
        }
    }

    // 3. 处理空值
    if (next_hash === "") {
        next_hash = lastTocHash
    }

    // 4. 跳转
    skipTo(next_hash)
}


/******************** 工具函数 ********************/

function getUserInput(message, defaultValue) {
    var value = defaultValue;

    // 弹出输入框，并获取用户输入的值
    var userInput = prompt(message);
    // 检查用户是否点击了取消按钮（返回null）
    if (userInput !== null && userInput !== "") {
        // 用户没有点击取消，将输入的值赋值给变量
        value = userInput;
    }
    return value
}

/******************** 键盘快捷键 ********************/

const height = window.innerHeight; // 计算元素底部的Y坐标


// 测试 Key Code
// document.onkeydown = function (event) {
//     var e = event || window.event || arguments.callee.caller.arguments[0];
//     alert(e.keyCode);
// };


// keyboardShortcuts executes the relevant functions for
// each supported shortcut key
// Key Code对照表：https://blog.csdn.net/llz3573073313/article/details/121433093
function keyboardShortcuts(event) {
    keyCode = event.keyCode;
    if (event.ctrlKey && event.shiftKey) {
        // ctrl + shift
        switch (keyCode) {
            case 83:  // s
                invertLowerImageBrightness();
                break;
        }
    } else if (event.shiftKey) {
        // shift
        switch (keyCode) {
            case 81:  // q
                removeImageHeightLimit();
                makeImageCenter(window.innerHeight);
                break;
            case 82:  // r
                removeImageHeightLimit();
                break;
            case 70:  // f
                changeSectionbodyWidth();
                break;
            case 71:  // g
                changeImgWidth();
                break;
            case 88:  // x
                lowerImageBrightness();
                break;
        }
    } else if (event.altKey) {
        switch (keyCode) {
            case 88:  // x
                event.preventDefault();
                next_img_url();
                break;
            case 90:  // z
                event.preventDefault();
                prev_img_url();
                break;
            case 87:  // w
                event.preventDefault();
                removeImageHeightLimit();
                addImageHeightLimit(400);
                break;
            case 84:  // t
                event.preventDefault();
                h = getUserInput("请输入高度：", 400)
                removeImageHeightLimit();
                addImageHeightLimit(h);
                break;
            case 82:  // r
                event.preventDefault();
                w = getUserInput("请输入宽度：", 600)
                removeImageHeightLimit();
                addImageWidthLimit(w);
                break;
            // case 69:  // e
            case 81:  // q
                event.preventDefault();
                removeImageHeightLimit();
                makeImageAuto();
                break;
        }
    } else {
        switch (keyCode) {
            case 81:  // q
                // window.location.href = '../index-01.html';
                window.history.back();
                break;
            case 69:  // e
                window.history.forward();
                break;
            case 88:  // x
            case 37:  // ←
                event.preventDefault();
                prev_img_url();
                break;
            case 86:  // v
            case 39:  // →
                event.preventDefault();
                next_img_url();
                break;
            case 38:  // ↑
                event.preventDefault();
                skipTo("sectionbody");
                break;
            case 40:  // ↓
                event.preventDefault();
                skipTo(lastImgHash);
                break;
            case 113:  // F1
                event.preventDefault();
                prev_toc_url();
                break;
            case 112:  // F2
                event.preventDefault();
                next_toc_hash();
                break;
        }
    }
}


/******************** Add eventlisteners here ********************/

/***** init *****/
/* DOM初始化 */
document.addEventListener('DOMContentLoaded', () => {
    // 1.初始化亮度
    initImageBrightness();
    // 2.初始化img数组
    init_img_hash();
    // 2.初始化书签数组
    init_toc_hash();
    // 3.初始化图片高度
    if (ic.textContent === "T" || ic.textContent === "F") {
        initImageHeightLimit();
    } else {
        initImageLimit();
    }
});

/***** 键盘快捷键 *****/
document.addEventListener('keydown', keyboardShortcuts);

document.getElementById('header').addEventListener('click', function () {
    this.blur(); // 移除焦点
    footerText.click();
});



