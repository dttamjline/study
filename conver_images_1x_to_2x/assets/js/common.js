$(document).ready(function () {
    AOS.init({
        duration: 1000,
        once: true,
    });
    $('a[href^="#"]').click(function () {
        if ($($(this).attr("href")).length) {
            const p = $($(this).attr("href")).offset();
            if ($(window).width() > 768) {
                $("html,body").animate({
                    scrollTop: p.top - 80,
                },
                    600
                );
            } else {
                $("html,body").animate({
                    scrollTop: p.top - 85,
                },
                    600
                );
            }
        }
        return false;
    });

    //Anchor scroll
    const hash1 = location.hash;
    const $root = $("html, body");
    if (hash1 !== "") {
        const top01 = $(hash1).offset().top;
        if ($(window).width() > 768) {
            $root.animate({ scrollTop: top01 - 130 }, 600);
        } else {
            $root.animate({ scrollTop: top01 - 85 }, 600);
        }
    }

    //Anchor scroll
    $('.toggle').click(function () {
        if ($(this).hasClass('active')) {
            $('.toggle').removeClass('active');
            $('.gnavi').stop().fadeToggle();
        } else {
            $(this).toggleClass('active');
            $('.gnavi').stop().fadeToggle('fast');
        }
    });

    // scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".totop,.header__btn").css("transform", "translateY(0)");
            $(".header__btn .note,.header__btn .btnmail01").css("transform", "translateX(0)");
            $(".header").addClass('active');
        } else {
            $(".totop,.header__btn").removeAttr("style");
            $(".header__btn .note,.header__btn .btnmail01").removeAttr("style");
            $(".header").removeClass('active');
        }
    });
    $(window).bind("load resize", function () {
        if ($(window).width() > 1023) {
            $(".gnavi").removeAttr("style");
            $(".toggle").removeClass('active');
        }
    });
});