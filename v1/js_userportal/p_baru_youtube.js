/*select tags*/
var label = $("select#tags").select2({
  placeholder: "Pilih tags",
  tags: true,
  tokenSeparators: [",", " "],
  width: "resolve",
});
function loading(isTrue) {
  return `
		<div class ="content-placeholder" style="width:100%; height: 300px; border-radius:10px;margin-bottom:10px"> &nbsp; </div>
        <div class ="content-placeholder" style="width:60%; height: 24px; border-radius:20px; margin-bottom: 10px"> &nbsp; </div>
        <div class ="content-placeholder" style="width:80%; height: 24px; border-radius:50px; margin-bottom: 10px"> &nbsp; </div>
        <div class ="content-placeholder" style="width:80%; height: 24px; border-radius:50px;"> &nbsp; </div>
	`;
}
preview_yt($('input[name="content"]').val());
function preview_yt(id) {
  var $container = $("#preview");
  $container.html(loading(true));
  $.getJSON(
    `${_uri}/frontend/v1/post/preview_url_youtube/${id}`,
    function (res) {
      console.log(res);
      if (res.message == true) {
        $container.html(`
				<img src="${
          res.data.items[0].snippet.thumbnails.high.url
        }" class="img-fluid w-100 rounded mb-3">
				<p class="text-primary">${res.data.items[0].snippet.channelTitle}</p>
				<b>${res.data.items[0].snippet.title}</b>
				<p class="text-muted small">${res.data.items[0].snippet.description.substr(
          0,
          70
        )}</p>
			`);
      } else {
        $container.html(`<div class="d-flex flex-column justify-content-center align-items-center h-100">
					<span class="text-center text-light font-weight-bold">
						<svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" fill="currentColor" class="bi bi-file-earmark-play-fill" viewBox="0 0 16 16">
						  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z"/>
						</svg> 
						<br>
						<span class="my-3 text-danger d-block">ID Video Invalid</span>
					</span>
				</div>`);
      }
      $("input[name='judul']").val(res.data.items[0].snippet.title);
    }
  );
}
function message(x, y) {
  notif({
    msg: `<i class='fas fa-check-circle mr-2'></i> ${x}`,
    type: y,
    position: "bottom",
    offset: "-10",
  });
}
$(function () {
  $("#navbar").removeClass("d-md-block").addClass("d-md-none");
  $("form#f_post").on("submit", function (e) {
    e.preventDefault();
    let _this = $(this);
    $.post(
      _this.attr("action"),
      _this.serialize(),
      function (res) {
        message("Postingan berhasil diupdate", "success");
      },
      "json"
    );
  });
  $("input[name='content']").on("change", function () {
    let id = $(this).val();
    if (id != "") {
      preview_yt(id);
    } else {
      $("input[name='judul']").val($("#title").html());
      $("#preview").html(``);
    }
  });
});
