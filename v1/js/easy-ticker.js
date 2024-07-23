$(document).ready(function() {
    $('.controler-ticker').easyTicker({
        direction: 'up',
        easing: 'swing',
        speed: 'slow',
        interval: 2000,
        height: '320px',
        visible: 3,
        mousePause: true,
        controls: {
            up: '.btn-up',
            down: '.btn-down',
            toggle: '.btn-toggle',
            playText: '<i class="fas fa-play-circle"></i>',
            stopText: '<i class="fas fa-pause-circle"></i>'
        },
        callbacks: {
            before: false,
            after: false
        }
    });

    // $('.headline-ticker').easyTicker({
    //     visible: 1,
    //     interval: 4000,
    //     direction: 'up',
    //     controls: {
    //         up: '.btn-up',
    //         down: '.btn-down',
    //         toggle: '.btn-toggle',
    //         playText: '<i class="fas fa-play-circle"></i>',
    //         stopText: '<i class="fas fa-pause-circle"></i>'
    //     },
    // });
});