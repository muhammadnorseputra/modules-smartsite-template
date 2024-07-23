$(document).ready(function() {
if (!$.cookie("notice-geolocation")) {
        navigator.geolocation.getCurrentPosition(function (position) {
            showLocation(position);
        }, function (e) {
            console.log('Geolocation tidak mendukung pada browser anda saat ini !');
        }, {
            enableHighAccuracy: true
        });
        $.cookie("notice-geolocation", 1, {
            expires: 60 / 1440,
            path: '/'
        });
    }
});

function showLocation(position){
    var uri = _uri;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    $.ajax({
        type:'POST',
        url:`${uri}/frontend/v1/beranda/update_location_visitor`,
        data: {
           latitude: latitude,
           longitude: longitude 
        },
        dataType: 'json',
        success:function(res){
            if(res.status){
               console.log("Location :", res.pesan);
            }else{
                console.log('Not Available');
            }
        }
    });
}