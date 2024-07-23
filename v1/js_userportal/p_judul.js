$("input[name='judul']").focus();
$(document).ready(function () {
  $.validate({
    form: "#f_buatjudul",
    lang: "en",
    showErrorDialogs: true,
    modules: "security, html5, sanitize",
    disabledFormFilter: "form.toggle-disabled",
    onModulesLoaded: function () {
      $("#judul").restrictLength($("#maxlength"));
    },
    onError: function ($form) {
      notif({
        msg: "Form Error, silahkan lengkapi formulir",
        type: "error",
        position: "bottom",
        offset: -10,
      });
    },
    onSuccess: function ($form) {
      var _this = $form;
      var method = _this.attr("action");
      var act = _this.attr("action");
      var data = _this.serialize();
      $.post(
        act,
        data,
        function (response) {
          if (response.valid == true) {
            notif({
              msg: response.pesan,
              type: "success",
              position: "bottom",
              offset: -10,
            });
            if (response.type == "BERITA" || response.type == "SLIDE") {
              window.location.href =
                _uri + "/frontend/v1/post/postDetail/" + response.id;
            } else if (response.type == "YOUTUBE") {
              window.location.href =
                _uri + "/frontend/v1/post/postDetailYoutube/" + response.id;
            } else if (response.type == "LINK") {
              window.location.href =
                _uri + "/frontend/v1/post/postDetailLink/" + response.id;
            }
          } else {
            notif({
              msg: response.pesan,
              type: "error",
              position: "bottom",
              offset: -10,
            });
          }
        },
        "json"
      );
      $form.removeClass("toggle-disabled");
      $form.get(0).reset();
      return false; /*Will stop the submission of the form*/
    },
  });
});
function slug() {
  var x = document.getElementById("judul");
  var y = document.getElementById("judul_slug");
  y.innerHTML = x.value.toLowerCase().replace(/\s/g, "-");
}
