$(function () {
    'use strict';
    const init = () => {
        smoothScroll();
        anchorScroll();
    };

    //smoothScroll
    const smoothScroll = () => {
        $(window).on('load', function () {
            $('a[href^="#"]').click(function () {
                const getID = $(this).attr('href');
                const wWidth = $(window).width();
                if (getID.length > 1) {
                    if ($($(this).attr('href')).length) {
                        const p = $($(this).attr('href')).offset();
                        $('.menu_icon').removeClass('active');
                        if (wWidth < 768) {
                            $('html,body').animate(
                                { scrollTop: p.top - 70 },
                                800
                            );
                            $('#h_menu').stop().slideUp();
                        } else {
                            $('#h_menu').removeAttr('style');
                            $('html,body').animate(
                                { scrollTop: p.top - 120 },
                                800
                            );
                        }
                    }
                }
                return false;
            });
        });
        $('#to_top').click(function () {
            $('html,body').animate(
                {
                    scrollTop: 0,
                },
                800
            );
            return false;
        });
    };
    // Anchor scroll
    const anchorScroll = () => {
        $(window).on('load', function () {
            const hash1 = location.hash;
            const root = 'html, body';
            if (hash1 !== '') {
                const top = $(hash1).offset().top;
                if ($(window).width() > 767) {
                    $(root).animate({ scrollTop: top - 120 }, 800);
                } else {
                    $(root).animate({ scrollTop: top - 70 }, 800);
                }
            }
        });
    };

    init();
});
