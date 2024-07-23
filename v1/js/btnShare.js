$(document).ready(function() {
    $(document).on("click", "#btn-share", function() {
        var _id = $(this).attr("data-row-id");
        $.confirm({
            title: false,
            content: "url:" + _uri + "/frontend/v1/beranda/share_artikel/" + _id,
            columnClass: "medium",
            theme: "supervan",
            bgOpacity: 0.9,
            animateFromElement: true,
            animationSpeed: 800,
            buttons: false,
            backgroundDismiss: true,
            animation: 'none',
            closeAnimation: 'none'
        });
    });
});