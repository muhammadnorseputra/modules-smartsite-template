// $(document).ready(function() {

//     $.typeahead({
//         input: '.js-nipnama',
//         minLength: 16,
//         maxLength: 18,
//         order: "asc",
//         maxItem: 1,
//         cache: true,
//         offset: false,
//         hint: true,
//         searchOnFocus: true,
//         dynamic: true,
//         delay: 300,
//         backdrop: {
//             "background-color": "#000"
//         },
//         emptyTemplate: "Data PNS \"<b>{{query}}</b>\" tidak ditemukan ",
//         debug: true,
//         template: function(item) {
//             return `<div class='d-flex justify-content-start align-items-center'>
//                     <img class='rounded' src='{{photo}}' width='35' alt='{{nama}}'>
//                     <div class="small text-muted ml-3">
//                         {{nama}} <br> {{nip}}
//                     </div>
//                     </div> 
//                     `;
//             // return `{{nip}} - {{nama}}`;
//         },
//         href: `${_uri}/frontend/v1/pegawai/detail?filter[query]={{nip}}`,
//         source: {
//             pegawai: {
//                 display: ["nip"],
//                 ajax: function(query) {
//                     return {
//                         type: "POST",
//                         url: `${_uri}/frontend/v1/pegawai/search`,
//                         dataType: "json",
//                         data: {
//                             q: "{{query}}",
//                         }
//                     }
//                 }
//             }
//         },
//         callback: {
//             onClickAfter: function(node, a, item, event) {
//                 event.preventDefault();
//                 window.open(item.href, '_self');
//             },
//         }
//     });
// })