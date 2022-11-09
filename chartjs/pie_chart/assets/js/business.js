$(function () {
    $('.js_slide_for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        fade: true,
        asNavFor: '.js_slide_nav',
        infinite: true,
    });
    $('.js_slide_nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.js_slide_for',
        arrows: false,
        dots: false,
        focusOnSelect: true,
        infinite: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
        ],
    });

    $('.p-bus-result-tab__item').click(function () {
        const tabId = $(this).data('tab');
        $('.p-bus-result-tab__item, .p-bus-result-slide').removeClass('active');
        $(this).addClass('active');
        $(`#p-bus-result-slide--${tabId}`).addClass('active');
        $('.js_slide_for, .js_slide_nav').slick('setPosition');
    });
});

(function (d) {
    var config = {
            kitId: 'aoj2mlg',
            scriptTimeout: 3000,
            async: true,
        },
        h = d.documentElement,
        t = setTimeout(function () {
            h.className =
                h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive';
        }, config.scriptTimeout),
        tk = d.createElement('script'),
        f = false,
        s = d.getElementsByTagName('script')[0],
        a;
    h.className += ' wf-loading';
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
    tk.async = true;
    tk.onload = tk.onreadystatechange = function () {
        a = this.readyState;
        if (f || (a && a != 'complete' && a != 'loaded')) return;
        f = true;
        clearTimeout(t);
        try {
            Typekit.load(config);
        } catch (e) {}
    };
    s.parentNode.insertBefore(tk, s);
})(document);
