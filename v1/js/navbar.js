$(document).ready(function () {
  $(document).scroll(function () {
    if ($(document).scrollTop() > 120) {
      $("nav#navbar")
        .addClass("navbar-blur fixed-top");
      // $(".filterhome").removeClass('rounded');
    } else {
      // $(".filterhome").addClass('rounded');
      /*$("button#caripost").toggleClass('');*/
      $("nav#navbar").removeClass("navbar-blur fixed-top");
    }
  });

  // var prevScrollpos = window.pageYOffset;
  // window.onscroll = function() {
  //     var currentScrollPos = window.pageYOffset;
  //     if (prevScrollpos > currentScrollPos) {
  //         document.getElementById("navbar").style.top = "0";
  //     } else {
  //         document.getElementById("navbar").style.top = "-80px";
  //     }
  //     prevScrollpos = currentScrollPos;

  // }
});
