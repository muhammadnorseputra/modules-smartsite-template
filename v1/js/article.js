$(function() {
    // get all berita
    var limit = 3;
    var start = 0;
    var action = "inactive";
    let $url = $host ? _uriSegment[2] : _uriSegment[1];

    if ($url == 'beranda') {

        function load_data_message() {

            $("#load_data_message").html(
                `<div class="card border-0 bg-transparent shadow-none mb-5">
                        <div class="card-body text-danger text-center">
                        <img src="${_uri}/template/v1/img/humaaans-3.png" alt="croods" class="img-fluid rounded">
                            <h5 class="card-title">Data Tidak Ditemukan</h5>  
                            <p class="font-weight-light text-secondary"> Berita telah berakhir.</p>
                        </div>
                    </div>`
            );
        }

        function lazzy_loader(limit) {
            var output = "";
            for (var count = 0; count < 1; count++) {
            /*output += `
                <div class="card border-0 bg-white mb-3" style="border-radius:5px;">
                    <div class ="card-body p-0 border-0">
                        <span class ="content-placeholder" style="width:100%; height: 250px; border-radius:8px;"> &nbsp; </span>
                    </div> 
                    <div class="card-header border-0 bg-white" style="border-radius:5px;">
                    <p>
                    <span class="content-placeholder rounded-circle float-left mr-3" style="width:40px; height: 40px;">&nbsp;</span>
                    <span class="content-placeholder rounded-lg float-left"
                    style ="width:40%; height: 40px; border-radius: 15px;"> &nbsp; </span>

                    <span class ="content-placeholder rounded-circle float-right mt-1 mr-3"
                    style ="width:40px; height: 40px;"> &nbsp; </span>
                    </p> 
                    </div> 
                    
                    <div class ="card-footer d-flex justify-content-bettwen p-3 bg-transparent border-0">
                        <span class="content-placeholder rounded w-100 mr-2 p-2"> &nbsp; </span>
                        <span class="content-placeholder rounded w-100 mr-2 p-2"> &nbsp; </span>
                        <span class="content-placeholder rounded w-100 mr-2 p-2"> &nbsp; </span>
                        <span class="content-placeholder rounded w-100 p-2"> &nbsp; </span>
                    </div> 
                </div>
            `;
            */
            
            // output += `<div class="d-flex justify-content-center align-items-center my-5">
            //                 <div class="loader_small" style="width:50px;height:50px;"></div>
            //             </div>`;

            output += `
                
                <div class ="content-placeholder" style="width:30%; height: 15px; border-radius:50px; margin-top: 10px"> &nbsp; </div>
                <br>
                <div class ="content-placeholder" style="width:60%; height: 15px; border-radius:50px; margin-bottom: 10px"> &nbsp; </div>
                <div class ="content-placeholder" style="width:80%; height: 15px; border-radius:50px;"> &nbsp; </div>
            
            `;
            }
            $("#load_data_message").html(output);
            $("button#load_more").hide().prop('disabled', true);
        }

        lazzy_loader(limit);

        function load_data(limit, start) {
            $.ajax({
                url: _uri + '/frontend/v1/beranda/get_all_berita',
                method: "POST",
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                data: {
                    limit: limit,
                    start: start,
                    type: urlParams.get('type'),
                    sort: urlParams.get('sort')
                },
                cache: true,
                dataType: "json",
                success: function(data) {
                    if (data.html == "") {
                        load_data_message();
                        $("button#load_more").hide();
                        action = "active";
                    } else {
                        if (data.count < limit) {
                            $("button#load_more").hide();
                            load_data_message();
                        } else {
                            $("#load_data_message").html("");
                        }
                        /*var hg = $(".ps-scroll:last").height() * 3;
                        window.scrollBy(0, -hg);*/
                        $("#load_data").append(data.html);
                        $("button#load_more").show().prop('disabled', false);
                        action = "inactive";

                        $(".lazy").lazy({
                            effect: 'fadeIn',
                            effectTime: 250,
                            threshold: 1000,
                            enableThrottle: true,
                            combined: true,
                            delay: 250,
                            throttle: 550,
                            onFinishedAll: function() {
                                if( !this.config("autoDestroy") )
                                    this.destroy();
                            },
                            // called whenever an element could not be handled
                            onError: function(element) {
                                var imageSrc = element.data('src');
                                element.attr('src', `${_uri}/assets/images/noimage.gif`)
                            }
                        });
                        // Ripple
                        $(".rippler").rippler({
                            effectClass: 'rippler-effect'
                        });
                        // Tooltips
                        $('[data-toggle="tooltip"]').tooltip({
                            delay: 150,
                            offset: '0, 12px',
                            padding: 15
                        });
                    }
                },
                error: function(xhr) {
                    alert("Error dalam meload berita, created_by tidak ditemukan.");
                },
            });
        }

        if (action == "inactive") {
            action = "active";
            load_data(limit, start);
        }

        /*$(window).scroll(function() {
             if (
                 $(window).scrollTop() + $(window).height() > $("#load_data").height() &&
                 action == "inactive"
             ) {
                 lazzy_loader(limit);
                 action = "active";
                 start = start + limit;
                 load_data(limit, start);
             }
         });
         */
        $("button#load_more").on("click", function(e) {
            e.preventDefault();
                if ($(window).scrollTop() + $(window).height() > $("#load_data").height() && action == "inactive") {
                    action = "active";
                    start = start + limit;
                    lazzy_loader(limit);
                    load_data(limit, start);
                }
            });
    } else {
        console.log('Semua berita tidak ditampilkan, karna bukan halaman beranda');
    }
});