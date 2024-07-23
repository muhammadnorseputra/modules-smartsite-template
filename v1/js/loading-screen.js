document.onreadystatechange = function() {
    var body = document.getElementsByTagName("BODY")[0];
    if (document.readyState !== "complete") {
        // document.querySelector("html").style.visibility = "hidden";
        document.querySelector(".page-slider").style.transition = "0";
        document.querySelector(".page-slider").style.opacity = 1;
        body.style.cursor = 'progress';
    } else {
        body.style.cursor = 'auto';
        document.querySelector(".page-slider").style.transition = "0.3s";
        document.querySelector(".page-slider").style.opacity = 0;
        document.querySelector(".page-slider").style.visibility = "hidden";
        // document.querySelector("html").style.visibility = "visible";
    }
};