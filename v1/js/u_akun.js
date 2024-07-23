$(document).ready(function() {
    $("a#module").unbind().bind("click", function(e) {
        e.preventDefault();
        let $this = $(this);
        let $url = $this.attr('href');
        let $container = $("#containerModule");
        $("a#module").removeClass("active");
        $.ajax({
            url: $url,
            method: 'post',
            dataType: 'html',
            beforeSend: preloadModule,
            success: function(res) {
                $container.html(res);
                $this.addClass('active');
            }
        });

        function preloadModule() {
            $container.html(`<div style="height:50vh;" class="d-flex justify-content-center align-items-center">
                <div class="loader_small" style="width: 50px; height: 50px;"></div></div>`);
            // $container.html(`<div class="slider"><div class="line"></div> <div class="subline inc"></div> 
            //     <div class="subline dec"></div></div>`);
        }
    })
});