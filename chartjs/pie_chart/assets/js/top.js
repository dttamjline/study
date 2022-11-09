$(function () {
    //「BUSINESS」背景 slick制御
    $('.p-top-business .bg ul[data-type="ltr"]').slick({
        variableWidth: true,
        centerMode: true,
        speed: 10000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        swipe: false,
        arrows: false,
        pauseOnFocus: false,
        pauseOnHover: false,
    });
    $('.p-top-business .bg ul[data-type="rtl"]').slick({
        variableWidth: true,
        centerMode: true,
        speed: 10000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        swipe: false,
        arrows: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        rtl: true,
    });

    $('.p-top-mainVisual video').get(0).play();
});
