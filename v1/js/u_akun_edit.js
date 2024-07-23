$(document).ready(function() {
    // Image Preview
    function readURL(input, $element) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $($element).attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }

    $("input[name='photo_pic']").change(function() {
        readURL(this, $('img.photo_pic'));
    });
    $("input[name='photo_ktp']").change(function() {
        readURL(this, $('img.photo_ktp'));
    });

    // Image Upload
    $(document).ready(function() {
        // Upload photo profile
        $(`input[name="photo_pic"]`).on('change', function() {
            var name = this.files[0].name;
            var form_data = new FormData();
            var ext = name.split('.').pop().toLowerCase();
            if (jQuery.inArray(ext, ['jpg', 'jpeg', 'png', 'webp']) == -1) {
                alert("Invalid Image File");
            }
            var oFReader = new FileReader();
            oFReader.readAsDataURL(this.files[0]);
            var f = this.files[0];
            var fsize = f.size || f.fileSize;
            if (fsize > 2000000) {
                alert("Ukuran File Gambar Terlalu Besar Maksimal 2MB");
            } else {
                form_data.append("file", this.files[0]);
                $.ajax({
                    url: `${_uri}/frontend/v1/users/upload_photo?jenis=pic&id=${_uriSegment[5]}`,
                    method: "POST",
                    data: form_data,
                    contentType: false,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    beforeSend: function() {
                        $('small.msg-pic').html(`Sedang Memperbaharui Gambar <img src="${_uri}/template/v1/images/loading.gif">`);
                    },
                    success: function(data) {
                        $('small.msg-pic').html(data);
                        console.log(_uriSegment[5]);
                    }
                });
            }
        });
        // Upload photo KTP
        $(`input[name="photo_ktp"]`).on('change', function() {
            var name = this.files[0].name;
            var form_data = new FormData();
            var ext = name.split('.').pop().toLowerCase();
            if (jQuery.inArray(ext, ['jpg', 'jpeg', 'png', 'webp']) == -1) {
                notif({
                    msg: "Invalid Image File",
                    type: "error",
                    position: "center",
                });
            }
            var oFReader = new FileReader();
            oFReader.readAsDataURL(this.files[0]);
            var f = this.files[0];
            var fsize = f.size || f.fileSize;
            if (fsize > 2000000) {
                notif({
                    msg: "Ukuran File Gambar Terlalu Besar Maksimal 2MB",
                    type: "warning",
                    position: "center",
                });
            } else {
                form_data.append("file", this.files[0]);
                $.ajax({
                    url: `${_uri}/frontend/v1/users/upload_photo?jenis=ktp&id=${_uriSegment[5]}`,
                    method: "POST",
                    data: form_data,
                    contentType: false,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    beforeSend: function() {
                        $('small.msg-ktp').html(`Sedang Memperbaharui Gambar <img src="${_uri}/template/v1/images/loading.gif">`);
                    },
                    success: function(data) {
                        $('small.msg-ktp').html(data);
                    }
                });
            }
        });

        //Update profile 
        $.validate({
            form: '#form_edit',
            modules: 'date, security, html5, sanitize',
            showErrorDialogs: true,
            onError: function($form) {
                notif({
                    msg: 'Validation of form ' + $form.attr('id') + ' failed!',
                    type: 'error',
                    offset: -10,
                    position: "center",
                });
            },
            onSuccess: function($form) {
                var _action = $form.attr('action');
                var _method = $form.attr('method');
                var _data = $form.serialize();
                $.ajax({
                    url: _action,
                    method: _method,
                    data: _data,
                    cache: false,
                    dataType: 'json',
                    beforeSend: function() {
                        $('button#save').html(`<img width="30" height="30" class="d-block mx-auto" src="${_uri}/template/v1/images/loading.gif">`).prop("disabled", true);
                    },
                    success: function(response) {
                        if (response.valid == true) {
                            $('button#save').html('<i class="fas fa-save"></i> Simpan Perubahan').prop("disabled", false);
                        }
                        notif({
                            msg: response.msg,
                            type: response.type,
                            offset: -10,
                            bgcolor: '#000',
                            color: '#fff',
                            timeout: 3000,
                            position: "bottom",
                        });
                    },
                    error: function(error) {
                        $('button#save').html('<i class="fas fa-save"></i> Simpan Perubahan').prop("disabled", false);
                        notif({
                            msg: "<b>Error:</b> Terjadi kesalahan pada server",
                            type: "error",
                            position: "center",
                            offset: -10,
                        });
                    }
                });
                return false; // Will stop the submission of the form
            },
            onModulesLoaded: function() {
                $('#alamat').restrictLength($('#maxlength'));
            }
        });
    });
});