(function () {
    var _aas = $('.faq-ttl');
    // _aas.addClass("active");
    _aas.on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).next().slideUp(300);
        } else {
            $(this).addClass('active');
            $(this).next().slideDown(300);
        }
    });
})();
