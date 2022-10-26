$(document).ready(function () {
    $('.slider01__txt__total').html($('.slider01__item').length)
    $(".slider01__inner").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        appendArrows: ".slider01__txt",
    });

    $('.slider01__inner').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.slider01__txt__num').html(nextSlide + 1)
    });
    $(".slider02").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        dots: true,
    });
})
