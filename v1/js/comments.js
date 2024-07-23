$(document).ready(function() {

    var $el = $("#exampleFormControlTextarea1").emojioneArea({
        // pickerPosition: "top",
        // tonesStyle: "bullet",
        placeholder: "Masukan komentar kamu disini.",
        // search: true,
        // filtersPosition: "top",
        // recentEmojis: true,
    });
    let $id = $("#tracking").attr('data-postid');
    let $online = _uriSegment[1] == 'blog';
    let $local = _uriSegment[2] == 'blog';
    let $url = $host ? $local : $online;

    if ($url) {
        displayComments();
    } else {
        console.log('Komentar tidak ditampilkan dikarnakan anda belum login atau bukan halaman detail berita');
    }
    $(".tracking-list").html(` 
            <div class="d-flex justify-content-center align-items-center p-3 text-light">
            <h3>Memuat Komentar ...</h3>
        </div>
    `);
    function displayComments() {
        $.getJSON(`${_uri}/frontend/v1/post/displayKomentar/${$id}`, function(response) {
            $(".tracking-list").html(response);
        });
    }

    // Reply komentar
    $(document).on('click', '#btn-reply-comment', function() {
        var id_parent = $(this).attr('data-id-parent');
        var id_berita = $(this).attr('data-id-berita');
        var id_user_comment = $(this).attr('data-id-user-comment');
        var id_user_username = $(this).attr('data-username');
        var id_comment = $(this).attr('data-id-comment');
        $(".reply_username").attr('id', `${
            id_comment
        }`).attr('username', `@${id_user_username.trim().toLowerCase()}`).html(`Reply <span class="text-info">@${id_user_username.trim().toLowerCase()}</span> <button onclick="batal()" class="btn btn-sm text-danger btn-default">x</button>`);
        $(".emojionearea-editor").html(`@${id_user_username.trim().toLowerCase()}`).focus();
    });

    // Button hapus komentar
    $(document).on('click', '#btn-delete-comment', function() {
        var id = $(this).attr('data-id');
        $.getJSON(_uri + '/frontend/v1/post/deleteComment', {
            id: id
        }, function(response) {
            if (response == true) {
                displayComments();
                notif({
                    msg: `Komentar dihapus <i class="fas fa-trash ml-3"></input>`,
                    type: "info",
                    position: "bottom",
                });
            }
        });
    });

    // Form submit komentar
    $(document).on('submit', 'form#f_komentar', function(e) {
        e.preventDefault();
        let form = $(this);
        let method = form.attr('method');
        let action = form.attr('action');
        let id_berita = form.attr('class');
        let id_user_comment = $(".reply_username").attr('id');
        let id_user_username = $(".reply_username").attr('username');
        // let isi_komentar = $("textarea").val();
        let isi_komentar = $el[0].emojioneArea.getText();
        let xssToken = form.find('input[name="xtoken"]').val();
        if (isi_komentar != '') {
            $.post(action, {
                id_b: id_berita,
                id_c: id_user_comment,
                isi: isi_komentar,
                xtoken : xssToken
            }, function(response) {
                if (response == true) {
                    batal();
                    displayComments();
                }
            }, 'json');
        } else {
            $(".emojionearea-editor").addClass('is-invalid');
        }
    });

});

function batal() {
    $(".emojionearea-editor").html('');
    $(".emojionearea-editor").removeClass('is-invalid').addClass('is-valid');
    $(".reply_username").attr('id', '').html('');
}