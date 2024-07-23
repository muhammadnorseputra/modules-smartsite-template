/*select tags*/
	var label = $("select#tags").select2({
		placeholder: 'Pilih tags',
		tags: true,
		tokenSeparators: [',', ' '],
		width: 'resolve',
	});
	$(document).ready(function() {
		$("#navbar").removeClass('d-md-block').addClass('d-md-none');
		/*Message*/
		function message(x,y) {
			notif({
				msg: `<i class='fas fa-info-circle mr-2'></i> ${x}`,
				type: y,
				position: "bottom",
			});
		}

		/*Image Preview*/
		function readURL(input, $element) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function(e) {
					$($element).attr('src', e.target.result);
				}

				reader.readAsDataURL(input.files[0]); /*convert to base64 string*/
			}
		}
		/*inisialisasi tinymce content editor*/
		var tiny = tinymce.init({
			selector: "#content",
			theme: "silver",
			height: 1180,
			inline_boundaries: false,
			toolbar_sticky: true,
			fixed_toolbar_container: '#content',
			placeholder: 'Ketik disini ...',
			skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
			// menubar: false,
			plugins: [
				"advlist autolink link image lists charmap print preview hr anchor pagebreak tabfocus searchreplace codesample help",
				"searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
				"table contextmenu directionality emoticons paste textcolor code fullscreen bacajuga"
			],
			content_css: [
				`${_uri}/bower_components/bootstrap/dist/css/bootstrap.min.css?${new Date().getTime()}`,	
				'document'			
			],
			content_css_cors: true,
			relative_urls: false,
			remove_script_host: false,
			convert_urls: true,
			toolbar: [
				{
			      name: 'history', items: [ 'undo', 'redo' ]
			    },
			    {
			      name: 'formatting', items: [ 'bold', 'italic', 'underline']
			    },
			    {
			      name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ]
			    },
			    {
			      name: 'indentation', items: [ 'bullist', 'numlist', 'outdent', 'indent' ]
			    },
			    {
			      name: 'colors', items: [ 'forecolor', 'backcolor' ]
			    },
			    {
			     name: 'plugin+', items: ['bacajuga']
			    }
			],
			toolbar_mode: 'sliding',
			toolbar_location: 'top',
  			toolbar_persist: true,
			//filemanager_crossdomain: true,
			image_advtab: true,
			external_filemanager_path: `${_uri}/files/filemanager-v2/filemanager/`,
			filemanager_title: "Filemanager",
			filemanager_access_key: 'putrabungsu6123',
			external_plugins: {
				"filemanager": `${_uri}/files/filemanager-v2/filemanager/plugin.min.js`
			}
		});
				
		/* upload single photo berita */
		var fileupload = $("#FileUpload");
		var filePath = $("p#FilePath");
		var button = $("#upload-img");
		button.click(function() {
			fileupload.click();
		});

		fileupload.change(function() {
			var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];
			filePath.html("<b>Filename: </b>" + fileName);
			readURL(this, $('img#single-photo'));

			var form_data = new FormData();
			form_data.append("file", this.files[0]);

			var oFReader = new FileReader();
			oFReader.readAsDataURL(this.files[0]);

			let $online = _uriSegment[5];
		    let $local = _uriSegment[6];
		    let $id = $host ? $local : $online;
			
			$.ajax({
				url: _uri + "/frontend/v1/post/upload_single_photo/" + $id,
				method: "POST",
				data: form_data,
				contentType: false,
				cache: false,
				dataType: 'json',
				processData: false,
				beforeSend: function() {
					button.html("<img class='mx-auto d-block py-1' src='" + _uri + "/template/v1/images/loading.gif'>");
					$('img#single-photo').css({
						opacity: 0.3
					})
				},
				success: function(data) {
					if (data == true) {
						notif({
							msg: "<i class='fas fa-check-circle'></i> Photo terpengaruh.",
							type: "warning",
							position: "bottom",
							offset: -10,
						});
						$('img#single-photo').css({
							opacity: 1
						})
					}
					button.html('<i class="fas fa-upload mr-2"></i> Ganti gambar');
				}
			});
		});

		$(document).on("click", "button#batal", function() {
			window.close();
		});

		/* draf */
		$(document).on("click", "button#draf", function() {

			var id = $(this).attr('data-id');
			let judul = $("input[name='judul']").val();
			let isi = tinymce.get("content").getContent();
			let tags = $('select[name="tags[]"]').val();
			let key = $('textarea[name="keywords"]').val();
			let desc = $('textarea[name="description"]').val();

			/*console.log(img_blob)*/;
			$.post(`${_uri}/frontend/v1/post/update_post/0`, {
					id: id,
					judul: judul,
					content: isi,
					tags: tags,
					description: desc,
					keywords: key
				},
				function(response) {
					if (response.valid == true) {
						notif({
							msg: "<i class='fas fa-check-circle'></i> Postingan disimpan sementara!",
							type: "info",
							position: "bottom",
							offset: -10,
						});
					}
				}, 'json'
			);
		});

		/* publish */
		$(document).on("submit", "form#f_post", function(e) {
			e.preventDefault();

			let Url = $(this).attr('action');
			let Method = $(this).attr('method');

			let id = $(this).attr('data-id');
			let judul = $("input[name='judul']").val();
			let key = $('textarea[name="keywords"]').val();
			let desc = $('textarea[name="description"]').val();
			let isi = tinymce.get("content").getContent();
			let tags = $('select[name="tags[]"]').val();

			notif_confirm({
				'textaccept': 'Publish',
				'textcancel': 'Batal',
				'fullscreen': true,
				'message': 'Apakah anda yakin akan mempublish postingan tersebut?',
				'callback': function(choice) {
					if (choice) {
						$.ajax({
							url: Url,
							method: Method,
							data: {
								id: id,
								judul: judul,
								content: isi,
								tags: tags,
								description: desc,
								keywords: key
							},
							dataType: 'json',
							success: function(res) {
								if (res.valid == true) {
									notif({
										msg: "<i class='fas fa-check-circle'></i> Postingan Published",
										position: "bottom",
										offset: -10,
										bgcolor: "#000",
										color: "#fff",
										timeout: 1500,
									});
								}
							}
						});
					}
				}
			});
		});
	});

	/*Photo Terkait*/
	list_photo_terkait();
	function list_photo_terkait()
	{
		$("#list_photo_terkait").html(`<div class="d-flex justify-content-center align-items-center w-100 h-100">
				<div class="loader_small" style="width:30px; height:30px;"></div>
			</div>`);
		let $online = _uriSegment[5];
    let $local = _uriSegment[6];
    let $id = $host ? $local : $online;
		let id_berita = $id;
		$.getJSON(`${_uri}/frontend/v1/post/list_photo_terkait`, {id: id_berita}, function(result) {
			$("#list_photo_terkait").html(result);
		});
	}

	$(document).on("click", "a#delete_photo_terkait", function(e) {
		e.preventDefault();
		let $this = $(this);
		let $Url = $this.attr('href');
		$.post(`${$Url}`, function(res) {
			list_photo_terkait();
			notif({
				msg: res,
				type: "info",
				position: "bottom",
				/*offset: -10,*/
			});
		}, 'json');
	})
	
	Dropzone.autoDiscover = false;
	$(".dropzone").dropzone({  
			paramName: "file", /*The name that will be used to transfer the file*/
  		maxFilesize: 1, /*MB*/
  		resizeWidth: 300,
  		resizeHeight: 300,
  		resizeMethod: 'crop', 
  		resizeQuality: 0.8,
  		acceptedFiles: '.jpeg,.jpg,.png',
  		addRemoveLinks: true,
  		init: function() {
		    this.on("complete", function(file) { list_photo_terkait(); });
		  }
	});