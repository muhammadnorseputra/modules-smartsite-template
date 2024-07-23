function like_toggle(x) {
	x.classList.toggle("btn-like");
	let count_like = $(x).find('span.count_like').text();

	let like = parseInt(count_like) + 1;
	let dislike = parseInt(count_like) - 1;

	let id_user = $(x).attr('data-id-user');
	let id_berita = $(x).attr('data-id-berita');
	if (id_user != 0) {
		if (x.classList.contains('btn-like')) {
			$(x).find('i').removeClass('far').addClass('fas text-danger');
			$.post(_uri +
				'/frontend/v1/beranda/likes?type=like', {
					id_a: id_user,
					id_b: id_berita,
					likes: like
				},
				function (response) {
					if (response == true) {
						notif({
							msg: `Postingan Disukai <i class="fas fa-thumbs-up ml-2"></i>`,
							type: "success",
							offset: 0,
							position: "bottom",
							bgcolor: "#333",
							color: "#eee",
							timeout: 1000,
							width: 300
						});
						// count_like.text(like);
						$(x).find('span.count_like').text(like);
					}
				}, 'json');
		} else {
			$(x).find('i').removeClass('fas text-danger').addClass('far');
			$.post(_uri +
				'/frontend/v1/beranda/likes?type=dislike', {
					id_a: id_user,
					id_b: id_berita,
					likes: dislike
				},
				function (response) {
					if (response == true) {
						notif({
							msg: `Postingan Tidak Disukai <i class="fas fa-thumbs-down ml-2"></i>`,
							type: "error",
							offset: 0,
							position: "bottom",
							bgcolor: "#333",
							color: "#eee",
							timeout: 1000,
							width: 300
						});
						// count_like.text(dislike);
						$(x).find('span.count_like').text(dislike);
					}
				}, 'json');
		}
	} else {
		// window.location.href = _uri + "/frontend/v1/users/login?msg=logindulu";
		$("#noticeSigin").modal('show').modal('handleUpdate');
	}
}

function bookmark_toggle(x) {
	x.classList.toggle("btn-bookmark");
	let id_user = $(x).attr('data-id-user');
	let id_berita = $(x).attr('data-id-berita');
	if (id_user != 0) {
		if (x.classList.contains('btn-bookmark')) {
			$(x).find('i').removeClass('far').addClass('fas text-primary');
			$.post(_uri +
				'/frontend/v1/beranda/bookmark?type=on', {
					id_a: id_user,
					id_b: id_berita,
					post: 'on'
				},
				function (response) {
					if (response == true) {
						notif({
							msg: `Postingan Disimpan  <i class="fas fa-check-circle ml-2"></i>`,
							type: "success",
							offset: 0,
							position: "bottom",
							bgcolor: "#333",
							color: "#eee",
							timeout: 1000,
							width: 300
						});
					}
				}, 'json');
		} else {
			$(x).find('i').removeClass('fas text-primary').addClass('far');
			$.post(_uri +
				'/frontend/v1/beranda/bookmark?type=off', {
					id_a: id_user,
					id_b: id_berita,
					post: 'off'
				},
				function (response) {
					if (response == true) {
						notif({
							msg: `Postingan Tidak Disimpan`,
							type: "warning",
							offset: 0,
							position: "bottom",
							bgcolor: "#333",
							color: "#eee",
							timeout: 1000,
							width: 300
						});
					}
				}, 'json');
		}
	} else {
		// window.location.href = _uri + "/frontend/v1/users/login?msg=logindulu";
		$("#noticeSigin").modal('show').modal('handleUpdate');
		
	}
}

function modeBaca(x) {
	x.classList.toggle('btn-dark');
	if (x.classList.contains('btn-dark')) {
		Focusable.setFocus($(".card-post"), {
			fadeDuration: 700,
			hideOnClick: false,
			hideOnESC: false,
			findOnResize: true,
		});
	} else {
		Focusable.hide();
	}
}
