// $(document).ready(function () {
	
// // Instagram
// function nFormatter(num) {
// 	if (num >= 1000000000) {
// 		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
// 	}
// 	if (num >= 1000000) {
// 		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
// 	}
// 	if (num >= 1000) {
// 		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
// 	}
// 	return num;
// }
// // var instagram_user = $("a.btn-instagram").attr("data-username");
// var instagram_user = 'bkpsdm.blg';
// $.ajax({
// 	url: "https://www.instagram.com/" + instagram_user + "/?__a=1",
// 	type: "get",
//     headers: {
//         'Access-Control-Allow-Credentials' : true,
//         'Access-Control-Allow-Origin':'*',
//         'Access-Control-Allow-Methods':'GET',
//         'Access-Control-Allow-Headers':'application/json',
//       },
//     dataType: 'jsonp',
// 	success: function (response) {
// 		console.log(response);
// 		// var username = response.graphql.user.username;
// 		// var profile_pic = response.graphql.user.profile_pic_url;
// 		// var followers = response.graphql.user.edge_followed_by.count;
// 		// var follow = response.graphql.user.edge_follow.count;

// 		// $("p.instagram-biograpy").html(response.graphql.user.biography);
// 		// $("a.btn-follow").attr("href", `https://www.instagram.com/${username}/`);
// 		// $("p.instagram-user").html(`<b>@${username}</b>`);
// 		// $("img.profile-pic").attr("data-src", profile_pic);
// 		// $("span.count_ig").html(followers);
// 		// $("span.count_ig_follow").html(follow);
// 	},
// });
// });