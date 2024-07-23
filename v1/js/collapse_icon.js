$('.collapsible-link').click(function() {
    $(this).find('i').toggleClass('fas fa-folder fas fa-folder-open');
    $(this).find('i').toggleClass('text-white text-warning');
});