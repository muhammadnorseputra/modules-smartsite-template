$(document).ready(function() {
    $(document).on("click", "a#btn-view-video", function(e) {
        e.preventDefault();
        var _id = $(this).attr("href");
        var _title = $(this).attr("title");
        $.confirm({
            title: _title,
            content: "url:" + _uri + "/frontend/v1/beranda/yt_view_video/" + _id,
            columnClass: "col-md-10",
            theme: "supervan",
            bgOpacity: 0.9,
            animateFromElement: true,
            animationSpeed: 800,
            buttons: false,
            backgroundDismiss: true,
            animation: 'none',
            closeAnimation: 'opacity'
        });
    });
});