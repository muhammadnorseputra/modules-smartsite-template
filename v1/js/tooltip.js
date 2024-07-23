$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip({
    offset: '0,10px',
    padding: 10
  });
  $("a#item-populer-post").tooltip({
    offset: '0,10px',
    padding: 10,
	placement: "top",
	title: listdetail,
	html: true,
	container: 'body'
  });
});

// Get user details for tooltip
function listdetail() {
  var id = this.getAttribute('idp');
  var $url = this.getAttribute('urlpost');

  var tooltipText = "";
  $.ajax({
   url: $url,
   type: 'post',
   async: false,
   delay: 800,
   data: {id:id},
   beforeSend: function() {
   	tooltipText = `<img class="mx-auto text-center d-block p-5" src="${_uri}/bower_components/SVG-Loaders/svg-loaders/oval-white.svg">`;
   },
   success: function(response){
   	 tooltipText = response;
   },
   error: function(xhr){
   	 tooltipText = xhr.responseText;
   }
  });

  return tooltipText; 

}