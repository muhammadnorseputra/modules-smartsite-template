// Mengijinkan cors origin dari https ke http
// if (window.location.protocol.indexOf('https') == 0) {
//     var el = document.createElement('meta')
//     el.setAttribute('http-equiv', 'Content-Security-Policy')
//     el.setAttribute('content', 'upgrade-insecure-requests')
//     document.head.append(el)
// }
// Uri Segement
var $host = window.location.origin == 'http://localhost';
if ($host) {
    var _uri = `${window.location.origin}/smartsite`;
    var _silka = `http://192.168.1.4`;
} else {
    var _silka = `http://silka.bkppd-balangankab.info`;
    var _uri = `${window.location.origin}`;
}
var _uriSegment = window.location.pathname.split('/');
console.log('Location Origin', _uri);
console.log(_uriSegment);
    
// Params
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
console.log('Params', queryString);