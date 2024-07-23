$(function() {
    $("button.post-search").on("click", function() {
        $("#mpostseacrh").modal('show');
        $("input[name='q']").focus();
    });

    $("a.post-search").on("click", function() {
        $("#mpostseacrh").modal('show');
        $("input[name='q']").focus();
    });

    $("a#mobileMenuNav").on("click", function() {
        $("#mobileMenu").modal('show')
    });

    $('#mpostseacrh').on('hidden.bs.modal', function(e) {
        $("input[name='q']").val('');
        $("#form_post_search").submit();
    });

    $("#form_post_search").on("submit", function(e) {
        e.preventDefault();
        let _this = $(this);
        let _input = _this[0].q;
        let _container = $("#search-result");

        if (_input.value == '') {
            _container.html(`<div class="pl-3 pl-md-0 rounded d-flex justify-content-around align-items-center">
		            		<div class="d-none d-md-block">
		            			<i class="fas fa-search fa-2x"></i>
		            		</div>
		            		<div class="py-3">
								<h2>Silahkan masukan katakunci !</h2>
				            	<p class="text-muted pl-3 border-left border-warning">
				            		Silahkan masukan keywords pencarian, dengan memasukan judul atau label
				            	</p>
		            		</div>
		            	</div>
            `);
        }

        function message(x, y) {
            notif({
                msg: `<i class='fas fa-info-circle mr-2'></i> ${x}`,
                type: y,
                offset: 15,
                position: "center",
                color: '#fff'
            });
        }

        function lazzy() {
            _container.html('<div id="loader" class="mx-auto my-5"></div>');
        }

        if (_input.value.length > 3) {
            $.ajax({
                url: _this[0].action,
                method: "POST",
                data: {
                    q: _input.value
                },
                cache: false,
                dataType: "json",
                beforeSend: lazzy,
                timeout: 1000,
                success: function(res) {
                    _container.html(res.data);
                    if (res.count != '0') {
                        message(`${res.count} data ditemukan`, 'success');
                    }
                },
                error: function(xhr) {
                    message('error function', 'error');
                },
            });
        } else {
            message('Silahkan masukan min. 3 karakter.', 'warning');
        }
        // console.log(_this[0].action);
    });
})