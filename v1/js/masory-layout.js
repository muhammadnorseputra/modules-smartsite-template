$(function() {
    var $grid = $('.grid').masonry({
	    percentPosition: true,
        transitionDuration: '0.8s'
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function() {
        $grid.masonry();
    });
});