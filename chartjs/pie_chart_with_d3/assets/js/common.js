$(function () {
    'use strict';
    const obj = {
        init: function () {
            this.smoothScroll();
            this.anchorScroll();
            this.h_menu();
            this.toTop();
        },
        //Totop
        toTop: function () {
            $('#totop').hide();
            $(window).on('load scroll', function () {
                if ($(this).scrollTop() > 100) {
                    $('#totop').fadeIn();
                } else {
                    $('#totop').fadeOut();
                }
            });
        },

        //smoothScroll
        smoothScroll: function () {
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

                // $("a[href^='#']").on("click", function (e) {
                //     let id = $(this).attr("href");
                //     const $target = $(id);

                //     if ($target.length > 0) { // item with that id exists
                //         e.preventDefault();

                //         $('html, body').animate({
                //             scrollTop: $target.offset().top // Scroll to this location.
                //         }, {
                //             duration: 800,
                //             step: ( now, fx ) => {
                //                 //  location will change as images etc. are lazy loaded
                //                 //  Where is the target now located on the page?
                //                 let realPos = $target.offset().top;
                //                 if (fx.end !== realPos) {
                //                     fx.end = realPos;
                //                 }
                //             },
                //         });

                //         // if supported, update the URL
                //         if (window.history && window.history.pushState) {
                //             history.pushState("", document.title, id);
                //         }
                //     }
                // });
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
        },
        // Anchor scroll
        anchorScroll: function () {
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
        },
        //h_menu
        h_menu: function () {
            $('.has_sub').mouseenter(function () {
                if ($(this).hasClass('flag')) {
                    return false;
                } else {
                    $(this).find('.h_sub_menu').stop().fadeIn();
                }
            });
            $('.has_sub').mouseleave(function () {
                if ($(this).hasClass('flag')) {
                    return false;
                } else {
                    $(this).find('.h_sub_menu').stop().fadeOut();
                }
            });
            $('.has_sub .link').click(function () {
                const parent = $(this).parent();
                if (parent.hasClass('flag')) {
                    if (parent.hasClass('active')) {
                        parent.removeClass('active');
                        parent.find('.h_sub_menu').stop().slideUp();
                    } else {
                        parent.removeClass('active');
                        parent.find('.h_sub_menu').stop().slideToggle();
                        parent.stop().toggleClass('active');
                    }
                }
            });

            // $('.menu_icon').click(function () {
            //     if ($(this).hasClass('active')) {
            //         $('body').removeClass('overflow');
            //         $('.menu_icon').removeClass('active');
            //         $('#h_menu').stop().slideUp();
            //         $('.h_sub_menu').stop().slideUp();
            //         $('.has_sub').removeClass('active');
            //     } else {
            //         $('body').toggleClass('overflow');
            //         $(this).toggleClass('active');
            //         $('#h_menu').stop().slideToggle(300);
            //     }
            // });
            $('.menu_icon').click(function () {
                if ($(this).hasClass('active')) {
                    $('#header').removeClass('active');
                    $('.menu_icon').removeClass('active');
                    $('#h_menu').stop().fadeOut(300);
                } else {
                    $(this).stop().toggleClass('active');
                    $('#header').stop().toggleClass('active');
                    $('#h_menu').stop().fadeToggle(300);
                }
            });
            $(window).on('resize load scroll', function () {
                const pTop = $(window).scrollTop();
                if (pTop > 0) {
                    $('#header').addClass('fixed');
                } else {
                    $('#header').removeClass('fixed');
                }
            });

            $(window).bind('load resize', function () {
                var vW = $(window).width();
                if (vW > 767) {
                    // $('.menu_icon').removeClass('active');
                    $('.has_sub').removeClass('flag');
                    $('.has_sub').removeClass('active');
                    $('.h_sub_menu').removeAttr('style');
                } else {
                    $('.has_sub').addClass('flag');
                }
            });
            $(window).on('scroll', function () {
                let _y = window.scrollY,
                    _h = window.innerHeight;

                $('.js_menu_item').map((b, a) => {
                    let _target = $(a).attr('href');

                    if (_target === '#' || !_target) return false;
                    let _top = $(_target).offset().top,
                        _bot = _top + $(_target).innerHeight();

                    if (_top <= _y + _h * 0.5 && _bot > _y + _h * 0.5) {
                        $(a).addClass('actived');
                    } else {
                        $(a).removeClass('actived');
                    }
                });
            });
        },
    };
    obj.init();
});

/*Stop scroll content on ios mobile when click open menu */
$(document).ready(function () {
    (function () {
        let _overlay = document.getElementById('h_menu');
        let _clientY = null;
        _overlay.addEventListener(
            'touchstart',
            function (event) {
                if (event.targetTouches.length === 1) {
                    _clientY = event.targetTouches[0].clientY;
                }
            },
            false
        );

        _overlay.addEventListener(
            'touchmove',
            function (event) {
                if (event.targetTouches.length === 1) {
                    disableRubberBand(event);
                }
            },
            false
        );
        function disableRubberBand(event) {
            let clientY = event.targetTouches[0].clientY - _clientY;
            if (_overlay.scrollTop === 0 && clientY > 0) {
                event.preventDefault();
            }
            if (isOverlayTotallyScrolled() && clientY < 0) {
                event.preventDefault();
            }
        }

        function isOverlayTotallyScrolled() {
            return (
                _overlay.scrollHeight - _overlay.scrollTop <=
                _overlay.clientHeight
            );
        }
    })();
});
