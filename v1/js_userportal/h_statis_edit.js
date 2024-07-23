	$(document).ready(function() {

		var tiny = tinymce.init({
			selector: "#content",
			height: 800,
			themes: "modern",
			toolbar_sticky: true,
			toolbar_sticky_offset: 180,
			fixed_toolbar_container: '#content',
			//apiKey: "E5EXDFLT",
			mobile: {
			    theme: 'mobile',
			    plugins: [ 'autosave', 'lists', 'autolink' ]
			  },
			plugins: [
				"advlist autolink link image lists charmap print preview hr anchor pagebreak tabfocus searchreplace codesample help",
				"searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
				"table contextmenu directionality emoticons paste textcolor code fullscreen",
				//"n1ed"
			],
			content_css: [
				`${_uri}/bower_components/bootstrap/dist/css/bootstrap.min.css?${new Date().getTime()}`,
				'document'
			],
			// content_style: "body{padding: 20px}",
			relative_urls : false,
			remove_script_host : false,
			convert_urls : true,
			toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor",
			/* filemanager_crossdomain: true,*/
			image_advtab: true ,
			external_filemanager_path:`${_uri}/files/filemanager-v2/filemanager/`,
			filemanager_title:"Filemanager",
			filemanager_access_key: 'putrabungsu6123',
			external_plugins: { "filemanager" : `${_uri}/files/filemanager-v2/filemanager/plugin.min.js`}
		});

		let fileupload = $("input[name='lampiran']");
    	let btnHapus = $("button#btn-hapus-lampiran");
    	btnHapus.click(function() {
    		let c = confirm('Apakah ada akan menghapus lampiran tersebut?');
    		if(c) {
    			let token = urlParams.get('token');
    			$.getJSON(`${_uri}/frontend/v1/halaman/hapus_lampiran`, {id: token}, function(res) {
    				if(res) {
    					window.location.reload();
    				}
    			})
    		} 
    	
    	})
    	let btnUpload = $("button#btn-upload-lampiran");
		btnUpload.click(function () {
            fileupload.click();
        });

        fileupload.change(function () {
	        var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];
	        $("span.filename").html(fileName);
    	});
		
		$(document).on("submit", "form#f_edit_halaman", function(e){
			e.preventDefault();
			let _this = $(this);
			let $url = _this.attr('action');
			let $method = _this.attr('method');
			let $data = new FormData(_this[0]);

			$.ajax({
				url: $url,
				method: $method,
				data: $data,
				contentType: false,
    			processData: false,
				beforeSend: berforeLoad,
				success: suksesEdit,
			});
		});

		function berforeLoad()
		{
			$("button[type='submit']#saveHalaman").html(`<img class='mx-auto d-block py-1 px-4' src='${_uri}/bower_components/SVG-Loaders/svg-loaders/oval-white.svg'>`).prop("disabled", true);
		}

		function suksesEdit(result)
		{
			notif({
				msg: "<i class='fas fa-check-circle'></i> Halaman Updated",
				bgcolor: "#000",
				color: "#fff",
				position: "bottom",
				timeout: 2500,
				callback: callback_success(result)
			});	
		}
		function callback_success(result) {
			if(result != '') {
				var str = result;
				window.history.pushState({},"",`?token=${Number(str)}`);
				/*$("input[name='etoken']").prop('checked', false);*/
				window.location.reload();
			}
			/*console.log(str);*/
			$("button[type='submit']#saveHalaman").html(`<i class="fas fa-save mr-2"></i> Update`).prop("disabled", false);
		}
	});