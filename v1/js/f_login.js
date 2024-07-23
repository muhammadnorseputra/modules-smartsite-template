// $(document).ready(function() {
// function suksesLogin(response) {
//     $('#content2').notifyModal({
//         duration : 3500,
//         placement : 'centerTop',
//         overlay : true,
//         type : 'simple',
//         icon: false,
//         onLoad : function(el) {
//             el.find(".content_inner").html(response.pesan);
//         },
//         onClose : function(el) {
//             if(response.valid == true) {
//                 window.location.href = response.redirect;
//             } 
//             $form.get(0).reset();
//         }
//     });
//   }

// function errorLogin(error) {
// $('#content2').notifyModal({
//     duration : 2500,
//     placement : 'center',
//     overlay : true,
//     type : 'dark',
//     icon: false,
//     onLoad : function(el) {
//         el.find(".content_inner").html("Oppss! sepertinya ada kesalaah nih, coba reload browser kamu");
//     },
//     onClose : function(el) {}
// });
// }

// $.validate({
//     form: '#form_login',
//     lang : 'en',
//     showErrorDialogs : true,
//     modules : 'security, html5, sanitize',
//     onError : function($form) {
//         $('#content2').notifyModal({
//             duration : 2500,
//             placement : 'center',
//             overlay : true,
//             type : 'danger', //simple, dark
//             icon: false,
//             onLoad : function(el) {
//                 el.find(".content_inner").html('Validation of form failed!');
//             },
//             onClose : function(el) {
//                 $form.get(0).reset();
//             }
//         });
//     },
//     onSuccess : function($form) {
//       var _action = $form.attr('action');
//       var _method = $form.attr('method');
//       var _data   = $form.serialize();
//       $.ajax({
//         url: _action,
//         method: _method,
//         data: _data,
//         dataType: 'json',
//         success: suksesLogin,
//         error: errorLogin,
//       });
//       return false; // Will stop the submission of the form
//       $form.removeClass('toggle-disabled');
//     }
//   });
// });