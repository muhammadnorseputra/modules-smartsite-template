$(function() {

var h=(new Date()).getHours();
var m=(new Date()).getMinutes();
var s=(new Date()).getSeconds();
if (h > 3 && h <  12) $("span#halojs").text("Selamat Pagi,");
if (h > 11 && h <  16) $("span#halojs").text("Selamat Siang,");
if (h > 15 && h <  18) $("span#halojs").text("Selamat Sore,");
if (h > 17 && h <  24) $("span#halojs").text("Selamat Malam,");
if (h > 23 || h <  4 ) $("span#halojs").text('Sekarang Jam  '+h+':'+m);

});